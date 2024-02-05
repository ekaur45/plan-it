import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function DefaultLayout() {
    return (<>
    
       <ToastContainer />
        <div className="preloader">
            <div className="loader">
                <div className="ytp-spinner">
                    <div className="ytp-spinner-container">
                        <div className="ytp-spinner-rotator">
                            <div className="ytp-spinner-left">
                                <div className="ytp-spinner-circle"></div>
                            </div>
                            <div className="ytp-spinner-right">
                                <div className="ytp-spinner-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Header />
        <Outlet/>
        <Footer />
        <a href="#" className="back-to-top"><i className="lni lni-chevron-up"></i></a>
    </>
    )
}