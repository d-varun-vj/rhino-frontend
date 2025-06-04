import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { BASE_URL, initHttpClient } from '@rhino/apis';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { locations } from './locations';
import { Dashboard } from '../pages';

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
    <Router basename={locations.base}>
      <Routes>
        <Route path={locations.dashboard} element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default MainRoute;
