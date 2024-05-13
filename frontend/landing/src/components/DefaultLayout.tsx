import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import LoginComponent from "./LoginComponent";
import { Modal } from "react-bootstrap";
import { hideGlobalLogin } from "../stores/reducers/global-reducer";
export default function DefaultLayout() {
    const isGlobalLoginVisible = useGlobalSelector((state) => state.globalReducer.isGlobalLoginVisible);
    const dispatch = useGlobalDispatch();
    const handlCloseGlobalLogin = () => {
        dispatch(hideGlobalLogin());
    }
    return (<>
        {isGlobalLoginVisible && <Modal show={true}><Modal.Header><b>Login to continue</b><button className="btn btn-outline-danger" onClick={handlCloseGlobalLogin}>Close</button></Modal.Header> <LoginComponent hideSignup={true}/></Modal>}
        <ToastContainer />
        <Header />
        <Outlet />
        <Footer />
    </>
    )
}