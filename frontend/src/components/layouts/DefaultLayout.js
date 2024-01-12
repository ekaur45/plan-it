import { Outlet } from 'react-router-dom';
import Header from "../headers/light.js";
import Footer from "../footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
export default function DefaultLayout() {
    return <AnimationRevealPage>
        <Header />
        <Outlet />
        <Footer />
    </AnimationRevealPage>
}