import React, { useState } from 'react';
import { fetchStockData } from '../services/api';
import './styles/HistoricalData.css';

const HistoricalData = () => {
    const [ticker, setTicker] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [stocks, setStocks] = useState([]);

    const handleSearch = async () => {
        const data = await fetchStockData(ticker, startDate, endDate);
        setStocks(data);
    };

    return (
        <div className="historical-data">
            <h2>Historical Data</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Select ticker"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Select start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Select end date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={handleSearch}>Apply</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Adjusted Close</th>
                    <th>Volume</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map((stock, index) => (
                    <tr key={index}>
                        <td>{stock.ticker}</td>
                        <td>{stock.date}</td>
                        <td>{stock.open}</td>
                        <td>{stock.high}</td>
                        <td>{stock.low}</td>
                        <td>{stock.adjusted_close}</td>
                        <td>{stock.volume}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoricalData;
