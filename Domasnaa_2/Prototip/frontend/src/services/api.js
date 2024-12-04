import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchStockData = async (ticker, startDate, endDate) => {
    const response = await axios.get(`${API_BASE_URL}/stocks`, {
        params: { ticker, startDate, endDate },
    });
    return response.data;
};

export const fetchNews = async () => {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
};

export const fetchDashboardReport = async () => {
    const response = await axios.get(`${API_BASE_URL}/dashboard`);
    return response.data;
};
