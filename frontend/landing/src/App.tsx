import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DefaultLayout from './components/DefaultLayout';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import BookingListPage from './pages/bookings/BookingListPage';
import DecoratorsPage from './pages/DecoratorsPage';
// import VenuesPage from './pages/VenuesPage';
import VenuesPage from './pages/Venues';
import ProfilePage from './pages/ProfilePage';
import CarsPage from './pages/Cars';
import CarBookingList from './pages/bookings/CarBookingList';
import VenueBookingList from './pages/bookings/VenueBookingList';
import VenueBookingComment from './pages/bookings/VenueBookingComment';
import DecoratorBookingList from './pages/bookings/DecoratorBookingList';
import CarBookings from './pages/CarBooking';
import ForgotPassword from './pages/ForgotPasswordPage';
import EventBookingComments from './pages/bookings/EventBookingComment';
import CarBookingComments from './pages/bookings/CarBookingComment';

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/cars"} element={<CarsPage />} />
        <Route path={"/booking/:carid"} element={<CarBookings />} />
        <Route path={"/event"} element={<DecoratorsPage />} />
        <Route path={"/venue"} element={<VenuesPage />} />
        <Route path={"/bookings"} element={<BookingListPage />}>
          <Route path={"car"} element={<CarBookingList/>}>
            <Route path={":id/comments"} element={<CarBookingComments/>}/>
          </Route>
          <Route path={"venue"} element={<VenueBookingList/>}>
            <Route path={":id/comments"} element={<VenueBookingComment/>}/>
          </Route>
          <Route path={"decor"} element={<DecoratorBookingList/>}>
            <Route path={":id/comments"} element={<EventBookingComments/>}/>
          </Route>
        </Route>
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={'/auth/login'} element={<LoginPage />} />
        <Route path={'/auth/signup'} element={<SignupPage />} />
        <Route path={'/auth/forgot'} element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
