import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { VITE_API_BASE_URL, initHttpClient } from '@rhino/apis';
import { useEffect, useState } from 'react';

import { Dashboard } from '../pages';
import { locations } from './locations';
import { toast } from 'react-toastify';
import NotAllowed from '../pages/NotAllowed';

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
        <Route path={locations.notAllowed} element={<NotAllowed />} />
        <Route path={locations.alarmList} element={<AlarmList />} />
      </Routes>
    </Router>
  );
};

export default MainRoute;
