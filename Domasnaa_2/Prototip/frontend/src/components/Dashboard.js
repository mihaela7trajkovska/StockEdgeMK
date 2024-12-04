import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import '.styles/Dashboard.css';

const Dashboard = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Функција за повлекување податоци од API
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/stocks'); // Замени со реалниот URL
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Форматирање на податоците за графикон
                const labels = data.map((item) => item.stock);
                const prices = data.map((item) => item.price);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Price (USD)',
                            data: prices,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                            ],
                        },
                    ],
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: { color: '#2c3e50' },
            },
            y: {
                ticks: { color: '#2c3e50', beginAtZero: true },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#2c3e50' },
            },
        },
    };

    // Прикажи порака за вчитување или грешка
    if (loading) return <p>Loading chart data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="dashboard">
            {/* Секција за извештаи */}
            <div className="reports">
                <h2>Market Overview</h2>
                <div className="chart">
                    {/* Графикон за цените */}
                    <Bar data={chartData} options={barChartOptions} />
                </div>
            </div>

            {/* Секција за вести */}
            <div className="news">
                <h2>Latest News</h2>
                <p>
                    Stay updated with the latest market news and trends. Explore
                    opportunities in the stock market today.
                </p>
                <img
                    src="https://via.placeholder.com/400x200"
                    alt="News"
                />
            </div>
        </div>
    );
};

export default Dashboard;
