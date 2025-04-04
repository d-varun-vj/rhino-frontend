import Dashboard from './Dashboard';
import Balance from './Balance';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { initHttpClient } from '../api/httpClient';
import { BASE_URL } from '../api/endpoints';

const MainRoute = () => {
  useEffect(() => {
    initHttpClient(BASE_URL);
  }, []);
  return (
    <Router basename="/v1">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/balance" element={<Balance />} />
        {/* <Route path="/user/:username" element={<UserProfile />} /> */}
        {/* Dynamic routing */}
      </Routes>
    </Router>
  );
};

export default MainRoute;
