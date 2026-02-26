import { VITE_API_BASE_URL, initHttpClient } from '@rhino/apis';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loader } from '@mantine/core';
import message from '../components/notifier';
import { ROUTES } from './routes';

const MainRoute = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initHttpClient(VITE_API_BASE_URL);
      setIsFullScreenLoading(false);
    };
    initialize().catch((error) =>
      message.error('Initialization failed' + error)
    );
  }, []);

  if (isFullScreenLoading) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <Loader color="var(--color-rhino-energy-green)" />
      </div>
    );
  }

  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default MainRoute;
