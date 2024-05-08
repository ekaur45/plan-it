import React from 'react';
import logo from './assets/images/logo.svg';
import './App.css';
import { ArrowForwardOutline, CarOutline, CardOutline, ChatbubbleEllipsesOutline, FlashOutline, HardwareChipOutline, HeartOutline, LogoFacebook, LogoInstagram, LogoLinkedin, LogoSkype, LogoTwitter, MailOutline, PeopleOutline, PersonAddOutline, PersonOutline, SpeedometerOutline, TimeOutline } from 'react-ionicons';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';

function App() {
  return (
    <>
    <Routes>
      <Route element={<MainLayout />}>
      <Route index element={<HomePage />} />
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/car"} element={<CarsPage/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
