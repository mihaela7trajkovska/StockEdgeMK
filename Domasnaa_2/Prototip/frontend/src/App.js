import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import HistoricalData from './components/HistoricalData';

const App = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historical-data" element={<HistoricalData />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
  );
};

export default App;
