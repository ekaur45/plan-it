import { Link } from "react-router-dom";
import CONFIG from "../utils/config.util";
import StorageUtil from "../utils/storage.util";
import { Fragment, useEffect } from "react";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";

import { setIsLoggedInFalse, updateUser } from "../stores/reducers/global-reducer";
import './header.css';
export default function Header() {
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const dispatch = useGlobalDispatch();
    const user = useGlobalSelector(state => state.globalReducer.user);
    const handleLogout = () => {
        StorageUtil.clearStorage();
        dispatch(updateUser(StorageUtil.getUser()));
        dispatch(setIsLoggedInFalse())
    }
    useEffect(() => {
        dispatch(updateUser(StorageUtil.getUser()));
    }, []);
    return (<>
        <header className="header" data-header>
            <div className="container">

                <div className="overlay" data-overlay></div>

                <Link to="/" className="logo">
                    Plant-IT
                </Link>

                <nav className="navbar" data-navbar>
                    <ul className="navbar-list">

                        <li>
                            <Link to={"/"} className="navbar-link" data-nav-link>Home</Link>
                        </li>

                        <li>
                            <Link to={"/cars"} className="navbar-link" data-nav-link>Explore cars</Link>
                        </li>

                        <li>
                            <Link to={""} className="navbar-link" data-nav-link>Venues</Link>
                        </li>

                        <li>
                            <Link to={""} className="navbar-link" data-nav-link>Decorator</Link>
                        </li>
                        {isLoggedIn && <li >    
                            <Link className="navbar-link" to={"/bookings"}>My Bookings</Link>
                        </li>
                        }
                    </ul>
                </nav>

                <div className="header-actions">
                    {isLoggedIn && <Fragment>
                        <div className="dropdown">
                            <button className="btn user-btn" aria-label="Profile" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={CONFIG.BaseUrl + user.profileImage ?? "/assets/images/author-1.jpg"}
                                        style={{ borderRadius: "50%", height: "35px", width: "35px" }}
                                        alt="" />
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link to={"/profile"} className="dropdown-item text-black c-p">
                                    <em className="fa fa-user mr-2"></em>
                                    {user.firstName} {user.lastName}</Link>
                                <Link to={"/bookings"} className="dropdown-item text-black c-p">
                                    <em className="fa fa-list mr-2"></em>
                                    Bookings</Link>
                                <span className="dropdown-item text-black c-p" onClick={handleLogout}>
                                    <em className="fa fa-sign-out mr-2"></em>
                                    Logout
                                </span>
                            </div>
                        </div>

                    </Fragment>
                    }
                    {
                        !isLoggedIn && <Fragment>
                            <li className="nav-item">
                                <Link className="page-scroll" to={CONFIG.AdminUrl + "auth/signin"}>Login / Signup</Link>
                            </li>
                        </Fragment>
                    }
                    <button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
                        <span className="one"></span>
                        <span className="two"></span>
                        <span className="three"></span>
                    </button>
                </div>
            </div>
        </header>
 
    </>
    )
}