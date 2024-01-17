import { lazy } from 'react';
const AddVenuePage = lazy(()=>import('../pages/Venue/AddVenue'))
const VenueListPage = lazy(()=>import('../pages/Venue/VenueListPage'))
const AddEventPage = lazy(()=>import('../pages/Event/AddEvent'))
const EventListPage = lazy(()=>import('../pages/Event/EventListPage'))
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const CarListPage = lazy(() => import('../pages/CarRental/CarListPage'));
const AddCar = lazy(() => import('../pages/CarRental/AddCar'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/car-rental/cars',
    title: 'Cars',
    component: CarListPage,
  },
  {
    path: '/car-rental/add-car',
    title: 'Add Car',
    component: AddCar,
  },
  {
    path: '/event/events',
    title: 'Events',
    component: EventListPage,
  },
  {
    path: '/event/add-event',
    title: 'Add Event',
    component: AddEventPage,
  },
  {
    path: '/venue/venues',
    title: 'Venues',
    component: VenueListPage,
  },
  {
    path: '/venue/add-venue',
    title: 'Add Venue',
    component: AddVenuePage,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
