import Consumption from '../pages/Consumption';
import Dashboard from '../pages/Dashboard';
import NotAllowed from '../pages/NotAllowed';
import NotFound from '../pages/NotFound';
import PeriodicAlarm from '../pages/PeriodicAlarm';
import CreatePeriodicAlarm from '../pages/PeriodicAlarm/Create';
import UpdatePeriodicAlarm from '../pages/PeriodicAlarm/Update';
import { paths } from './paths';

export const ROUTES: { path: string; element: JSX.Element }[] = [
  // Common
  { path: paths.notAllowed, element: <NotAllowed /> },
  { path: paths.notFound, element: <NotFound /> },

  // Pages
  { path: paths.dashboard, element: <Dashboard /> },
  { path: paths.consumption, element: <Consumption /> },
  { path: paths.alarm.periodic.base, element: <PeriodicAlarm /> },
  { path: paths.alarm.periodic.create, element: <CreatePeriodicAlarm /> },
  { path: paths.alarm.periodic.update, element: <UpdatePeriodicAlarm /> },
];
