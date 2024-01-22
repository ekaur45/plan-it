import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import DefaultLayout from './components/DefaultLayout';

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/cars"} element={<CarsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
