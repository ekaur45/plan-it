import { lazy } from 'react';
const CarBookingPage = lazy(()=>import('../pages/CarRental/CarBookingPage'));
const AddCarBookingPage = lazy(()=>import('../pages/CarRental/AddCarBookingPage'));
const AddVenuePage = lazy(()=>import('../pages/Venue/AddVenue'))
const VenueListPage = lazy(()=>import('../pages/Venue/VenueListPage'))
const AddEventPage = lazy(()=>import('../pages/Event/AddEvent'))
const EventListPage = lazy(()=>import('../pages/Event/EventListPage'))
const UserListPage = lazy(()=>import('../pages/Users/UserListPage'))
const ViewUserPage = lazy(()=>import('../pages/Users/ViewUserPage'))
const AddUserPage = lazy(()=>import('../pages/Users/AddUserPage'))

const CarListPage = lazy(() => import('../pages/CarRental/CarListPage'));
const AddCar = lazy(() => import('../pages/CarRental/AddCar'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Verfication = lazy(() => import('../pages/Verification/VerificationPage'));
const coreRoutes = [

  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/car-rental/cars',
    title: 'Cars',
    component: CarListPage,
    protected:true
  },
  {
    path: '/car-rental/rents',
    title: 'Cars',
    component: CarBookingPage,
    protected:true
  },
  {
    path: '/car-rental/add-booking',
    title: 'Cars',
    component: AddCarBookingPage,
  },
  {
    path: '/car-rental/add-car',
    title: 'Add Car',
    component: AddCar,
    protected:true
  },
  {
    path: '/event/events',
    title: 'Events',
    component: EventListPage,
    protected:true
  },
  {
    path: '/event/add-event',
    title: 'Add Event',
    component: AddEventPage,
    protected:true
  },
  {
    path: '/venue/venues',
    title: 'Venues',
    component: VenueListPage,
    protected:true
  },
  {
    path: '/venue/add-venue',
    title: 'Add Venue',
    component: AddVenuePage,
    protected:true
  },
  {
    path: '/users/list',
    title: 'All Users',
    component: UserListPage,
    protected:true,
    roles:["admin"]
  },
  {
    path: '/users/add',
    title: 'Add User',
    component: AddUserPage,
    protected:true
  },
  {
    path: '/users/:id/view',
    title: 'View User',
    component: ViewUserPage,
    protected:true
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  }
  
];

const routes = [...coreRoutes];
export default routes;
