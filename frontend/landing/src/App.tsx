import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import DefaultLayout from './components/DefaultLayout';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import BookingListPage from './pages/bookings/BookingListPage';
import DecoratorsPage from './pages/DecoratorsPage';
import VenuesPage from './pages/VenuesPage';

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/cars"} element={<CarsPage />} />
        <Route path={"/event"} element={<DecoratorsPage />} />
        <Route path={"/venue"} element={<VenuesPage />} />
        <Route path={"/bookings"} element={<BookingListPage />} />
        <Route path={'/auth/login'} element={<LoginPage />} />
        <Route path={'/auth/signup'} element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

export default App;
