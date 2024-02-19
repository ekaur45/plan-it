import { Link } from "react-router-dom";
import CONFIG from "../utils/config.util";
import StorageUtil from "../utils/storage.util";
import { Fragment, useEffect, useState } from "react";
import { useGlobalSelector } from "../hooks";
import { useDispatch } from "react-redux";
import { setIsLoggedInFalse } from "../stores/reducers/global-reducer";
import './header.css';
export default function Header() {
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const dispatch = useDispatch();
    const [user, setUser] = useState(StorageUtil.getUser());
    const handleLogout = () => {
        StorageUtil.clearStorage();
        setUser(StorageUtil.getUser());
        dispatch(setIsLoggedInFalse())
    }
    useEffect(() => {
        setUser(StorageUtil.getUser());
    }, []);
    return (
        <section className="header_area">
            <div className="header_navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <Link className="navbar-brand text-white" to="/">
                                    {/* <img src={require("../assets/images/logo.png")} alt="Logo" /> */}
                                    Plan-IT
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                    <ul id="nav" className="navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <Link className="page-scroll" to={"/"}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="page-scroll" to="/cars">Rent a Car</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="page-scroll" to="/event">Event Decorators</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="page-scroll" to="/venue">Venue Providers</Link>
                                        </li>
                                        {isLoggedIn && <Fragment>
                                            <li className="nav-item">
                                                <Link to={"/bookings"}>My Bookings</Link>
                                            </li>
                                            <li className="nav-item">
                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <img src={StorageUtil.getUser().profileImage??"/assets/images/author-1.jpg"} 
                                                        style={{borderRadius:"50%",height:"35px",width:"35px"}}
                                                        alt="" />
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <Link to={"/profile"} className="dropdown-item text-black c-p">
                                                            <em className="fa fa-user mr-2"></em>
                                                            {StorageUtil.getUser().firstName} {StorageUtil.getUser().lastName}</Link>                                                        
                                                        <span className="dropdown-item text-black c-p">
                                                            <em className="fa fa-list mr-2"></em>
                                                            Bookings</span>
                                                        <span className="dropdown-item text-black c-p" onClick={handleLogout}>
                                                            <em className="fa fa-sign-out mr-2"></em>
                                                            Logout
                                                            </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </Fragment>
                                        }
                                        {
                                            !isLoggedIn && <Fragment>
                                                <li className="nav-item">
                                                    <Link className="page-scroll" to={CONFIG.AdminUrl + "auth/signin"}>Login / Signup</Link>
                                                </li>
                                            </Fragment>
                                        }
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}