import Consumption from '../pages/Consumption';
import Dashboard from '../pages/Dashboard';
import NotAllowed from '../pages/NotAllowed';
import NotFound from '../pages/NotFound';
import PeriodicAlarm from '../pages/PeriodicAlarm';
import CreatePeriodicAlarm from '../pages/PeriodicAlarm/Create';
import UpdatePeriodicAlarm from '../pages/PeriodicAlarm/Update';
import { locations } from './locations';

export const ROUTES: { path: string; element: JSX.Element }[] = [
  // Common
  { path: locations.notAllowed, element: <NotAllowed /> },
  { path: locations.notFound, element: <NotFound /> },

  // Pages
  { path: locations.dashboard, element: <Dashboard /> },
  { path: locations.consumption, element: <Consumption /> },
  { path: locations.alarm.periodic.base, element: <PeriodicAlarm /> },
  { path: locations.alarm.periodic.create, element: <CreatePeriodicAlarm /> },
  { path: locations.alarm.periodic.update, element: <UpdatePeriodicAlarm /> },
];
