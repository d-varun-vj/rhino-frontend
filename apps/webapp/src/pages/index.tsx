import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { BASE_URL } from '@rhino/apis';
import Dashboard from './Dashboard';
import { initHttpClient } from '@rhino/apis';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MainRoute = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initHttpClient(BASE_URL);
      setIsFullScreenLoading(false);
    };
    initialize().catch((error) => toast.error('Initialization failed' + error));
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
      </Routes>
    </Router>
  );
};

export default MainRoute;
