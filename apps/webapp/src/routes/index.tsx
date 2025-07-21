import { VITE_API_BASE_URL, initHttpClient } from '@rhino/apis';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Dashboard, PeriodicAlarm } from '../pages';
import NotAllowed from '../pages/NotAllowed';
import { locations } from './locations';

const MainRoute = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initHttpClient(VITE_API_BASE_URL);
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
        <Route
          path={locations.periodicAlarm.base}
          element={<PeriodicAlarm />}
        />
        <Route path={locations.notAllowed} element={<NotAllowed />} />
      </Routes>
    </Router>
  );
};

export default MainRoute;
