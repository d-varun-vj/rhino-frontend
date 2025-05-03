import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { BASE_URL } from '../api/endpoints';
import Balance from './Balance';
import Dashboard from './Dashboard';
import { initHttpClient } from '../api/httpClient';
import { useEffect } from 'react';

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
