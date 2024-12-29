
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../../assets/logo.png';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [ticker, setTicker] = useState('');
    const [tickers, setTickers] = useState<string[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [timeframe, setTimeframe] = useState('daily');
    const [stockData, setStockData] = useState<any[]>([]);
    const [technicalData, setTechnicalData] = useState<any>(null);
    const [selectedMetric, setSelectedMetric] = useState('closePrice');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    ////dodadeno
    const [sentimentData, setSentimentData] = useState<any[]>([]);
    const [sentimentLoading, setSentimentLoading] = useState<boolean>(false);
    const [sentimentError, setSentimentError] = useState<string | null>(null);
    //dodadeno
    const [lstmData, setLstmData] = useState<any[]>([]);
    const [lstmError, setLstmError] = useState<string | null>(null);
    const [lstmLoading, setLstmLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/stocks/tickers');
                if (!response.ok) throw new Error('Failed to fetch tickers');
                const data = await response.json();
                setTickers(data);
            } catch (err) {
                setError('Failed to load tickers');
                console.error(err);
            }
        };
        fetchTickers();

        const fetchSentimentData = async () => {
            setSentimentLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:8000/api/news-data'); // Flask API endpoint
                if (!response.ok) throw new Error('Failed to fetch sentiment data');
                const data = await response.json();
                setSentimentData(data);
            } catch (err: any) {
                setSentimentError(err.message);
            } finally {
                setSentimentLoading(false);
            }
        };
        fetchSentimentData();


        fetchLstmData();

    }, []);

    const fetchLstmData = async () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        setLstmLoading(true);

        // Форматирање на датумите во ISO формат (на пример: 2021-01-01)
        const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
        const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

        try {
            const response = await fetch(
                `http://127.0.0.1:8010/api/predictions?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch LSTM predictions");
            }

            const result = await response.json();
            if (result.dates && result.actual && result.predicted) {
                setLstmData(result);
            } else {
                throw new Error("Invalid data structure from API");
            }
        } catch (err: any) {
            console.error("Error fetching LSTM predictions:", err);
            setLstmError(err.message);
        } finally {
            setLstmLoading(false);
        }
    };
    const fetchStockData = async () => {
        if (!ticker || !startDate || !endDate) {
            alert('Please select a ticker, date range, and timeframe.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert('Start date cannot be after the end date.');
            return;
        }

        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:9090/api/stock-data?ticker=${ticker}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&timeframe=${timeframe}`
            );
            if (!response.ok) throw new Error('Failed to fetch stock data');
            const data = await response.json();
            setStockData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const transformTechnicalData = (data: any) => {
        const macdSignal = (macd: number, macdSignal: number) => {
            if (macd > macdSignal) return 'Buy';
            if (macd < macdSignal) return 'Sell';
            return 'Hold';
        };

        return {
            oscillators: [
                { name: "CCI", value: data.CCI ?? "N/A", signal: data.CCI_Signal },
                { name: "RSI", value: data.RSI ?? "N/A", signal: data.RSI_Signal },
                { name: "Stochastic %K", value: data.Stoch_K ?? "N/A", signal: data.Stoch_Signal },
                { name: "Williams %R", value: data["Williams_%R"] ?? "N/A", signal: data.Williams_Signal },
                {
                    name: "MACD",
                    value: data.MACD ?? "N/A",
                    signal: typeof data.MACD === "number" && typeof data.MACD_Signal === "number"
                        ? macdSignal(data.MACD, data.MACD_Signal)
                        : "N/A"
                },
            ],
            moving_averages: [
                { name: "SMA 20", value: data.SMA_20 ?? "N/A", signal: data.SMA_20_Signal },
                { name: "EMA 20", value: data.EMA_20 ?? "N/A", signal: data.EMA_20_Signal },
                { name: "WMA 20", value: data.WMA_20 ?? "N/A", signal: data.WMA_20_Signal },
                { name: "SMA 50", value: data.SMA_50 ?? "N/A", signal: data.SMA_50_Signal },
                { name: "EMA 50", value: data.EMA_50 ?? "N/A", signal: data.EMA_50_Signal },
            ],
            oscillators_summary: data.Oscillators_Summary ?? "N/A",
            moving_averages_summary: data.MovingAverages_Summary ?? "N/A",
        };
    };

    const fetchTechnicalData = async () => {
        if (!ticker || !timeframe) {
            alert('Please select a ticker and timeframe.');
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:5001/api/technical-analysis?ticker=${ticker}&timeframe=${timeframe}&limit=5000`
            );
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error details:', errorText);
                throw new Error('Failed to fetch technical analysis data');
            }
            const data = await response.json();
            setTechnicalData(transformTechnicalData(data[0])); // Assuming API returns an array
        } catch (err) {
            console.error('Error fetching technical data:', err.message);
            alert('Error fetching technical analysis data.');
        }
    };
    const reduceDataDensity = (data, step = 10) => {
        return data.filter((_, index) => index % step === 0);
    };

    const handleApply = async () => {
        await fetchStockData();
        await fetchTechnicalData();
        await fetchLstmData();

        if (lstmData && lstmData.dates && lstmData.actual && lstmData.predicted) {
            const reducedDates = reduceDataDensity(lstmData.dates, 10);
            const reducedActual = reduceDataDensity(lstmData.actual, 10);
            const reducedPredicted = reduceDataDensity(lstmData.predicted, 10);

            setLstmData({
                dates: reducedDates,
                actual: reducedActual,
                predicted: reducedPredicted,
            });
        }
    };

    const chartData = {
        labels: stockData.map((data) => data.date),
        datasets: [
            {
                label: `${selectedMetric} Values`,
                data: stockData.map((data) => data[selectedMetric] || 0),
                borderColor: 'blue',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="StockEdge MK Logo" className="navbar-logo" />
                </div>
                <ul>
                    <li><Link to="/dashboard">Dashboard home</Link></li>
                    <li className="dropdown" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                        My Account
                        {isDropdownVisible && (
                            <ul className="dropdown-content">
                                <li onClick={() => navigate('/login')}>Logout</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>

            <div className="content">
                <section>
                    <h2>My Reports</h2>
                    <div className="form-container">
                        {error && <p className="error">{error}</p>}
                        <div className="form-group">
                            <label htmlFor="ticker">Ticker:</label>
                            <select
                                id="ticker"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value)}
                            >
                                <option value="" disabled>Select a ticker</option>
                                {tickers.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date:</label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeframe">Timeframe:</label>
                            <select
                                id="timeframe"
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        <button onClick={handleApply} disabled={loading}>
                            {loading ? 'Loading...' : 'Apply'}
                        </button>
                    </div>
                </section>

                <section>
                    <h2>Technical Indicator Chart</h2>
                    {stockData.length > 0 ? (
                        <div className="chart-container">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    ) : (
                        <p>No data available for the selected ticker and date range.</p>
                    )}
                </section>

                {technicalData && (
                    <>
                        <section>
                            <h2>Oscillators</h2>
                            <p className="summary-action"><strong>Summary Action:</strong> {technicalData.oscillators_summary}</p>
                            <table className="oscillator-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {technicalData.oscillators.map((osc) => (
                                    <tr key={osc.name}>
                                        <td>{osc.name}</td>
                                        <td>{osc.value}</td>
                                        <td>{osc.signal}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </section>

                        <section>
                            <h2>Moving Averages</h2>
                            <p className="summary-action"><strong>Summary Action:</strong> {technicalData.moving_averages_summary}</p>
                            <table className="moving-average-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {technicalData.moving_averages.map((ma) => (
                                    <tr key={ma.name}>
                                        <td>{ma.name}</td>
                                        <td>{ma.value}</td>
                                        <td>{ma.signal}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </section>



                        <section>
                            <h2>Sentiment Analysis Results</h2>
                            {sentimentLoading ? (
                                <p>Loading sentiment data...</p>
                            ) : sentimentError ? (
                                <p className="error">{sentimentError}</p>
                            ) : (
                                <div className="sentiment-table-container">
                                    <table className="sentiment-table">
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Title</th>
                                            <th>Sentiment</th>
                                            <th>Recommendation</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sentimentData.slice(0, 10).map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.date}</td>
                                                <td>{item.title}</td>
                                                <td>{item.sentiment}</td>
                                                <td>{item.recommendation}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        <section>
                            <h2>Sentiment Trend</h2>
                            {sentimentData.length > 0 ? (
                                <div className="chart-container">
                                    <Line
                                        data={{
                                            labels: sentimentData.slice(0, 10).map((item) => item.date),
                                            datasets: [
                                                {
                                                    label: 'Sentiment Trend',
                                                    data: sentimentData.slice(0, 10).map((item) =>
                                                        item.sentiment === 'Positive' ? 1 : item.sentiment === 'Negative' ? -1 : 0
                                                    ),
                                                    borderColor: 'blue',
                                                    borderWidth: 2,
                                                    tension: 0.1,
                                                },
                                            ],
                                        }}
                                        options={{
                                            maintainAspectRatio: false,
                                            responsive: true,
                                            plugins: {
                                                legend: { position: 'top' },
                                            },
                                        }}
                                    />
                                </div>
                            ) : (
                                <p>No sentiment trend data available.</p>
                            )}
                        </section>
                        <section>
                            <h2>LSTM Predictions</h2>
                            {lstmLoading ? (
                                <p>Loading LSTM predictions...</p>
                            ) : lstmError ? (
                                <p className="error">{lstmError}</p>
                            ) : (
                                lstmData && lstmData.dates && lstmData.actual && lstmData.predicted && (
                                    <div className="chart-container">
                                        <Line
                                            data={{
                                                labels: lstmData.dates,
                                                datasets: [
                                                    {
                                                        label: 'Actual Prices',
                                                        data: lstmData.actual,
                                                        borderColor: 'blue',
                                                        borderWidth: 2,
                                                        tension: 0.1,
                                                    },
                                                    {
                                                        label: 'Predicted Prices',
                                                        data: lstmData.predicted,
                                                        borderColor: 'red',
                                                        borderWidth: 2,
                                                        tension: 0.1,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                maintainAspectRatio: false,
                                                responsive: true,
                                                plugins: {
                                                    legend: { position: 'top' },
                                                },
                                            }}
                                        />
                                    </div>
                                )
                            )}
                        </section>



                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;









/*
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../../assets/logo.png';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [ticker, setTicker] = useState('');
    const [tickers, setTickers] = useState<string[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [timeframe, setTimeframe] = useState('daily');
    const [stockData, setStockData] = useState<any[]>([]);
    const [technicalData, setTechnicalData] = useState<any>(null);
    const [selectedMetric, setSelectedMetric] = useState('closePrice');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    ////dodadeno
    const [sentimentData, setSentimentData] = useState<any[]>([]);
    const [sentimentLoading, setSentimentLoading] = useState<boolean>(false);
    const [sentimentError, setSentimentError] = useState<string | null>(null);


    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/stocks/tickers');
                if (!response.ok) throw new Error('Failed to fetch tickers');
                const data = await response.json();
                setTickers(data);
            } catch (err) {
                setError('Failed to load tickers');
                console.error(err);
            }
        };
        fetchTickers();

        const fetchSentimentData = async () => {
            setSentimentLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:8000/api/news-data'); // Flask API endpoint
                if (!response.ok) throw new Error('Failed to fetch sentiment data');
                const data = await response.json();
                setSentimentData(data);
            } catch (err: any) {
                setSentimentError(err.message);
            } finally {
                setSentimentLoading(false);
            }
        };
        fetchSentimentData();

    }, []);

    const fetchStockData = async () => {
        if (!ticker || !startDate || !endDate) {
            alert('Please select a ticker, date range, and timeframe.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert('Start date cannot be after the end date.');
            return;
        }

        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:9090/api/stock-data?ticker=${ticker}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&timeframe=${timeframe}`
            );
            if (!response.ok) throw new Error('Failed to fetch stock data');
            const data = await response.json();
            setStockData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const transformTechnicalData = (data: any) => {
        const macdSignal = (macd: number, macdSignal: number) => {
            if (macd > macdSignal) return 'Buy';
            if (macd < macdSignal) return 'Sell';
            return 'Hold';
        };

        return {
            oscillators: [
                { name: "CCI", value: data.CCI ?? "N/A", signal: data.CCI_Signal },
                { name: "RSI", value: data.RSI ?? "N/A", signal: data.RSI_Signal },
                { name: "Stochastic %K", value: data.Stoch_K ?? "N/A", signal: data.Stoch_Signal },
                { name: "Williams %R", value: data["Williams_%R"] ?? "N/A", signal: data.Williams_Signal },
                {
                    name: "MACD",
                    value: data.MACD ?? "N/A",
                    signal: typeof data.MACD === "number" && typeof data.MACD_Signal === "number"
                        ? macdSignal(data.MACD, data.MACD_Signal)
                        : "N/A"
                },
            ],
            moving_averages: [
                { name: "SMA 20", value: data.SMA_20 ?? "N/A", signal: data.SMA_20_Signal },
                { name: "EMA 20", value: data.EMA_20 ?? "N/A", signal: data.EMA_20_Signal },
                { name: "WMA 20", value: data.WMA_20 ?? "N/A", signal: data.WMA_20_Signal },
                { name: "SMA 50", value: data.SMA_50 ?? "N/A", signal: data.SMA_50_Signal },
                { name: "EMA 50", value: data.EMA_50 ?? "N/A", signal: data.EMA_50_Signal },
            ],
            oscillators_summary: data.Oscillators_Summary ?? "N/A",
            moving_averages_summary: data.MovingAverages_Summary ?? "N/A",
        };
    };

    const fetchTechnicalData = async () => {
        if (!ticker || !timeframe) {
            alert('Please select a ticker and timeframe.');
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:5001/api/technical-analysis?ticker=${ticker}&timeframe=${timeframe}&limit=5000`
            );
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error details:', errorText);
                throw new Error('Failed to fetch technical analysis data');
            }
            const data = await response.json();
            setTechnicalData(transformTechnicalData(data[0])); // Assuming API returns an array
        } catch (err) {
            console.error('Error fetching technical data:', err.message);
            alert('Error fetching technical analysis data.');
        }
    };

    const handleApply = async () => {
        await fetchStockData();
        await fetchTechnicalData();
    };

    const chartData = {
        labels: stockData.map((data) => data.date),
        datasets: [
            {
                label: `${selectedMetric} Values`,
                data: stockData.map((data) => data[selectedMetric] || 0),
                borderColor: 'blue',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="StockEdge MK Logo" className="navbar-logo" />
                </div>
                <ul>
                    <li><Link to="/dashboard">Dashboard home</Link></li>
                    <li className="dropdown" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                        My Account
                        {isDropdownVisible && (
                            <ul className="dropdown-content">
                                <li onClick={() => navigate('/login')}>Logout</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>

            <div className="content">
                <section>
                    <h2>My Reports</h2>
                    <div className="form-container">
                        {error && <p className="error">{error}</p>}
                        <div className="form-group">
                            <label htmlFor="ticker">Ticker:</label>
                            <select
                                id="ticker"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value)}
                            >
                                <option value="" disabled>Select a ticker</option>
                                {tickers.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date:</label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeframe">Timeframe:</label>
                            <select
                                id="timeframe"
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        <button onClick={handleApply} disabled={loading}>
                            {loading ? 'Loading...' : 'Apply'}
                        </button>
                    </div>
                </section>

                <section>
                    <h2>Technical Indicator Chart</h2>
                    {stockData.length > 0 ? (
                        <div className="chart-container">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    ) : (
                        <p>No data available for the selected ticker and date range.</p>
                    )}
                </section>

                {technicalData && (
                    <>
                        <section>
                            <h2>Oscillators</h2>
                            <p className="summary-action"><strong>Summary Action:</strong> {technicalData.oscillators_summary}</p>
                            <table className="oscillator-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {technicalData.oscillators.map((osc) => (
                                    <tr key={osc.name}>
                                        <td>{osc.name}</td>
                                        <td>{osc.value}</td>
                                        <td>{osc.signal}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </section>

                        <section>
                            <h2>Moving Averages</h2>
                            <p className="summary-action"><strong>Summary Action:</strong> {technicalData.moving_averages_summary}</p>
                            <table className="moving-average-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {technicalData.moving_averages.map((ma) => (
                                    <tr key={ma.name}>
                                        <td>{ma.name}</td>
                                        <td>{ma.value}</td>
                                        <td>{ma.signal}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </section>

                        <section>
                            <h2>Sentiment Analysis Results</h2>
                            {sentimentLoading ? (
                                <p>Loading sentiment data...</p>
                            ) : sentimentError ? (
                                <p className="error">{sentimentError}</p>
                            ) : (
                                <div className="sentiment-table-container">
                                    <table className="sentiment-table">
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Title</th>
                                            <th>Sentiment</th>
                                            <th>Recommendation</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sentimentData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.date}</td>
                                                <td>{item.title}</td>
                                                <td>{item.sentiment}</td>
                                                <td>{item.recommendation}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                        <section>
                            <h2>Sentiment Trend</h2>
                            {sentimentData.length > 0 ? (
                                <div className="chart-container">
                                    <Line
                                        data={{
                                            labels: sentimentData.map((item) => item.date),
                                            datasets: [
                                                {
                                                    label: 'Sentiment Trend',
                                                    data: sentimentData.map((item) =>
                                                        item.sentiment === 'Positive' ? 1 : item.sentiment === 'Negative' ? -1 : 0
                                                    ),
                                                    borderColor: 'blue',
                                                    borderWidth: 2,
                                                    tension: 0.1,
                                                },
                                            ],
                                        }}
                                        options={{
                                            maintainAspectRatio: false,
                                            responsive: true,
                                            plugins: {
                                                legend: { position: 'top' },
                                            },
                                        }}
                                    />
                                </div>
                            ) : (
                                <p>No sentiment trend data available.</p>
                            )}
                        </section>


                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

*/