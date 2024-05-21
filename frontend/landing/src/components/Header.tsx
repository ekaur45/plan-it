import { Link, NavLink, useNavigate } from "react-router-dom";
import CONFIG from "../utils/config.util";
import StorageUtil from "../utils/storage.util";
import { Fragment, useEffect } from "react";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";

import { setIsLoggedInFalse, updateUser } from "../stores/reducers/global-reducer";
import './header.css';
export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const dispatch = useGlobalDispatch();
    const user = useGlobalSelector(state => state.globalReducer.user);
    const handleLogout = () => {
        StorageUtil.clearStorage();
        dispatch(updateUser(StorageUtil.getUser()));
        dispatch(setIsLoggedInFalse());
        navigate("/");
    }
    useEffect(() => {
        dispatch(updateUser(StorageUtil.getUser()));
    }, []);
    return (<>
        <header className="header" data-header>
            <div className="container">

                <div className="overlay" data-overlay></div>

                <Link to="/" className="logo">
                    <img src="assets/plan_it.png" alt="LOGO" width="120" height="60"/>
                </Link>

                <nav className="navbar" data-navbar>
                    <ul className="navbar-list">

                        <li>
                            <NavLink to={"/"} className={({ isActive }) => isActive == true? "navbar-link active":"navbar-link"} data-nav-link>Home</NavLink>
                        </li>

                        <li>
                            <NavLink to={"/cars"} className={({ isActive }) => isActive == true? "navbar-link active":"navbar-link"} data-nav-link>Explore cars</NavLink>
                        </li>

                        <li>
                            <NavLink to={"/venue"} className={({ isActive }) => isActive == true? "navbar-link active":"navbar-link"} data-nav-link>Venues</NavLink>
                        </li>

                        <li>
                            <NavLink to={"/event"} className={({ isActive }) => isActive == true? "navbar-link active":"navbar-link"} data-nav-link>Decorator</NavLink>
                        </li>
                        {isLoggedIn && <li >    
                            <NavLink className={({ isActive }) => isActive == true? "navbar-link active":"navbar-link"} to={"/bookings/car"}>My Bookings</NavLink>
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
                                <Link to={"/bookings/car"} className="dropdown-item text-black c-p">
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
                                <Link className="page-scroll" to={"/auth/login"}>Login / Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="page-scroll" to={CONFIG.AdminUrl + "auth/signin"}>Login / Signup as provider</Link>
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