#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import ta
import traceback

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load data
DATA_FILE = 'stocks.csv'
data = pd.read_csv(DATA_FILE, dtype={
    'open_price': 'str', 'high_price': 'str', 'low_price': 'str', 'close_price': 'str'
}, low_memory=False)

# Format prices as float
for col in ['open_price', 'high_price', 'low_price', 'close_price']:
    data[col] = data[col].str.replace('.', '', regex=False).str.replace(',', '.', regex=False).astype(float) / 100

def calculate_indicators(df):
    try:
        indicators = pd.DataFrame(index=df.index)

        # RSI
        indicators['RSI'] = ta.momentum.RSIIndicator(close=df['close_price'], window=14).rsi().round(2)

        # MACD
        macd = ta.trend.MACD(close=df['close_price'], window_slow=26, window_fast=12, window_sign=9)
        indicators['MACD'] = macd.macd().round(2)
        indicators['MACD_Signal'] = macd.macd_signal().round(2)

        # Проверка дали MACD и MACD_Signal се правилно пресметани
        if indicators['MACD'].isnull().all() or indicators['MACD_Signal'].isnull().all():
            print("MACD or MACD_Signal calculation failed.")


        # Moving Averages
        indicators['SMA_20'] = df['close_price'].rolling(window=20).mean().round(2)
        indicators['EMA_20'] = df['close_price'].ewm(span=20, adjust=False).mean().round(2)
        indicators['WMA_20'] = ta.trend.WMAIndicator(close=df['close_price'], window=20).wma().round(2)
        indicators['SMA_50'] = df['close_price'].rolling(window=50).mean().round(2)
        indicators['EMA_50'] = df['close_price'].ewm(span=50, adjust=False).mean().round(2)

        # Stochastic Oscillator
        stoch = ta.momentum.StochasticOscillator(
            high=df['high_price'], low=df['low_price'], close=df['close_price'], window=14, smooth_window=3
        )
        indicators['Stoch_K'] = stoch.stoch().round(2)
        indicators['Stoch_D'] = stoch.stoch_signal().round(2)

        # CCI
        if 'high_price' in df.columns and 'low_price' in df.columns:
            cci = ta.trend.CCIIndicator(
                high=df['high_price'], low=df['low_price'], close=df['close_price'], window=20
            )
            indicators['CCI'] = cci.cci().round(2)

        # Williams %R
        williams_r = ta.momentum.WilliamsRIndicator(
            high=df['high_price'], low=df['low_price'], close=df['close_price'], lbp=14
        )
        indicators['Williams_%R'] = williams_r.williams_r().round(2)

        return indicators
    except Exception as e:
        print(f"Error while calculating indicators: {e}")
        traceback.print_exc()
        return pd.DataFrame()

# Calculate indicators
indicators = calculate_indicators(data)

# Merge indicators into data
if not indicators.empty:
    data = pd.concat([data, indicators], axis=1)
else:
    print("Indicators not calculated properly. Please check the input data.")

def generate_signals(df):
    signals = pd.DataFrame(index=df.index)

    # RSI Signal
    signals['RSI_Signal'] = df['RSI'].apply(
        lambda x: 'Buy' if x < 30 else ('Sell' if x > 70 else 'Hold')
    )

    # Stochastic Oscillator Signal
    signals['Stoch_Signal'] = df['Stoch_K'].apply(
        lambda x: 'Buy' if x < 20 else ('Sell' if x > 80 else 'Hold')
    )

    signals['MACD_Signal'] = df.apply(
    lambda row: 'Buy' if pd.notnull(row['MACD']) and pd.notnull(row['MACD_Signal']) and row['MACD'] > row['MACD_Signal']
    else ('Sell' if pd.notnull(row['MACD']) and pd.notnull(row['MACD_Signal']) and row['MACD'] < row['MACD_Signal']
    else 'Hold'),
    axis=1
    )

    # CCI Signal
    signals['CCI_Signal'] = df['CCI'].apply(
        lambda x: 'Buy' if x < -100 else ('Sell' if x > 100 else 'Hold')
    )

    # Williams %R Signal
    signals['Williams_Signal'] = df['Williams_%R'].apply(
        lambda x: 'Buy' if x < -80 else ('Sell' if x > -20 else 'Hold')
    )

    # Moving Averages Signal
    for ma in ['SMA_20', 'EMA_20', 'WMA_20', 'SMA_50', 'EMA_50']:
        signals[f'{ma}_Signal'] = df.apply(
            lambda row: 'Buy' if row[ma] > row['close_price'] else ('Sell' if row[ma] < row['close_price'] else 'Hold'),
            axis=1
        )

    # Summary Signals
    def calculate_dominant_action(columns):
        buy_signals = signals[columns].apply(lambda row: (row == 'Buy').sum(), axis=1)
        sell_signals = signals[columns].apply(lambda row: (row == 'Sell').sum(), axis=1)
        return buy_signals.gt(sell_signals).map({True: 'Buy', False: 'Sell'}).where(buy_signals.ne(sell_signals), 'Hold')

    signals['Oscillators_Summary'] = calculate_dominant_action(['RSI_Signal', 'Stoch_Signal', 'MACD_Signal', 'CCI_Signal', 'Williams_Signal'])
    signals['MovingAverages_Summary'] = calculate_dominant_action([f'{ma}_Signal' for ma in ['SMA_20', 'EMA_20', 'WMA_20', 'SMA_50', 'EMA_50']])

    return signals

# Generate signals
try:
    signals = generate_signals(data)
    if signals.empty:
        print("Error: Signals generation failed. Check input data.")
    else:
        data = pd.concat([data, signals], axis=1)
except KeyError as e:
    print(f"Error generating signals: {e}")

data = data.loc[:, ~data.columns.duplicated()]

@app.route('/api/technical-analysis', methods=['GET'])
def technical_analysis():
    ticker = request.args.get('ticker', default=None, type=str)
    timeframe = request.args.get('timeframe', default='daily', type=str)
    limit = request.args.get('limit', default=None, type=int)

    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400

    filtered_data = data[data['company_id'] == ticker]
    if filtered_data.empty:
        return jsonify({"error": "No data found for the given ticker"}), 404

    filtered_data = data[data['company_id'] == ticker].copy()  
    filtered_data['date'] = pd.to_datetime(filtered_data['date'])
    filtered_data = filtered_data.set_index('date')

    if timeframe == 'weekly':
        df = filtered_data.resample('W').agg({
            'open_price': 'first',
            'high_price': 'max',
            'low_price': 'min',
            'close_price': 'last',
            'volume': 'sum'
        })
    elif timeframe == 'monthly':
        df = filtered_data.resample('M').agg({
            'open_price': 'first',
            'high_price': 'max',
            'low_price': 'min',
            'close_price': 'last',
            'volume': 'sum'
        })
    else:
        df = filtered_data

    if limit:
        df = df.tail(limit)

    df = df.fillna('N/A')
    result = df.to_dict(orient='records')

    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001, use_reloader=False)


# In[ ]:





# In[ ]:





# In[ ]:




