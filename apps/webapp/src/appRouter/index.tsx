import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { BASE_URL } from '../api/endpoints';
import Balance from './Balance';
import Dashboard from './Dashboard';
import { initHttpClient } from '../api/httpClient';
import { useEffect, useState } from 'react';

const MainRoute = () => {
  const [fullScreenLoading, setFullScreenLoading] = useState(true); // Start with true to trigger loading state

  useEffect(() => {
    const initialize = () => {
      initHttpClient(BASE_URL);
      setFullScreenLoading(false);
    };
    initialize();
  }, []);

  if (fullScreenLoading) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <h1>Loading...</h1>
      </div>
    );
  }

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
