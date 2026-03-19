import NotAllowed from '../pages/common/NotAllowed';
import NotFound from '../pages/common/NotFound';
import ServerError from '../pages/common/ServerError';
import Consumption from '../pages/Consumption';
import AssetDashboard from '../pages/dashboards/AssetDashboard';
import Dashboard from '../pages/dashboards/Dashboard';
import PeriodicAlarm from '../pages/PeriodicAlarm';
import CreatePeriodicAlarm from '../pages/PeriodicAlarm/Create';
import UpdatePeriodicAlarm from '../pages/PeriodicAlarm/Update';
import { paths } from './paths';

export const ROUTES: { path: string; element: JSX.Element }[] = [
  // Common
  { path: paths.notAllowed, element: <NotAllowed /> },
  { path: paths.notFound, element: <NotFound /> },
  { path: paths.serverError, element: <ServerError /> },

  // Pages
  { path: paths.dashboards.dashboard, element: <Dashboard /> },
  { path: paths.dashboards.asset, element: <AssetDashboard /> },
  { path: paths.consumption, element: <Consumption /> },
  { path: paths.alarm.periodic.base, element: <PeriodicAlarm /> },
  { path: paths.alarm.periodic.create, element: <CreatePeriodicAlarm /> },
  { path: paths.alarm.periodic.update, element: <UpdatePeriodicAlarm /> },
];
