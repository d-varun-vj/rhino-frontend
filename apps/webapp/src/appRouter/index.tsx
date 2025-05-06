import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { BASE_URL } from '../api/endpoints';
import Balance from './Balance';
import Dashboard from './Dashboard';
import { initHttpClient } from '../api/httpClient';
import { useEffect, useState } from 'react';

const MainRoute = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = useState(true); // Start with true to trigger loading state

  useEffect(() => {
    const initialize = async () => {
      await initHttpClient(BASE_URL);
      setIsFullScreenLoading(false);
    };
    initialize().catch((error) =>
      console.error('Initialization failed:', error)
    );
  }, []);

  if (isFullScreenLoading) {
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
