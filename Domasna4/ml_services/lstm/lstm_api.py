#!/usr/bin/env python
# coding: utf-8

# In[5]:


from flask import Flask, jsonify
import numpy as np
import pandas as pd
from keras.models import load_model
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Учитај го зачуваниот модел и скалирачот
model = load_model("lstm_model.h5")
scaler = joblib.load("scaler.pkl")

# Учитај ги предвидувањата и тест податоците
predictions = np.load("predictions.npy")
test_data = pd.read_csv("test_data.csv")

@app.route('/api/predictions', methods=['GET'])
def get_predictions():
    data = {
        "actual": test_data["close_price"].tolist(),
        "predicted": predictions.flatten().tolist()
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=8010, debug=False)


# In[ ]:


from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/predictions', methods=['GET'])
def get_predictions():
    try:
        # Учитај ги предвидувањата и тест податоците
        predictions = np.load("predictions.npy")  # NumPy array со предвидувања
        test_data = pd.read_csv("test_data.csv")
        test_data['date'] = pd.to_datetime(test_data['date'])

        # Примање на параметрите за стартен и краен датум
        start_date = request.args.get('startDate')
        end_date = request.args.get('endDate')

        if start_date and end_date:
            # Конверзија на датумите во pandas.Timestamp за споредба
            start_date = pd.to_datetime(start_date)
            end_date = pd.to_datetime(end_date)

            # Филтрирање на тест податоците врз основа на датумите
            filtered_data = test_data[(test_data['date'] >= start_date) & (test_data['date'] <= end_date)]
        else:
            # Ако нема параметри за датум, користи ги сите тест податоци
            filtered_data = test_data

        # Проверка дали има податоци по филтрирањето
        if filtered_data.empty:
            return jsonify({"error": "No data found for the given date range"}), 404

        # Извлекување на соодветните листи за дати, вистински вредности и предвидувања
        dates = filtered_data['date'].dt.strftime('%Y-%m-%d').tolist()
        actual = filtered_data['close_price'].tolist()
        predicted = predictions[:len(actual)].flatten().tolist()  # Рамнење на NumPy array во листа

        # Проверка за усогласеност на должините на листите
        if len(dates) != len(actual) or len(dates) != len(predicted):
            return jsonify({"error": "Data length mismatch"}), 400

        # Составување на одговорот
        response = {
            "dates": dates,
            "actual": actual,
            "predicted": predicted
        }

        return jsonify(response)

    except FileNotFoundError as fnf_error:
        app.logger.error(f"File not found: {fnf_error}")
        return jsonify({"error": "Required file not found"}), 500
    except Exception as e:
        # Логирање на грешката и враќање на порака за грешка
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8010)


# In[ ]:




