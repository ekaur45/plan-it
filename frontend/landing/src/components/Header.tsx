import { Link } from "react-router-dom";
import CONFIG from "../utils/config.util";

export default function Header() {
    return (
        <section className="header_area">
            <div className="header_navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <a className="navbar-brand" href="index.html">
                                    <img src={require("../assets/images/logo.png")} alt="Logo" />
                                </a>
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
                                            <Link className="page-scroll" to="/cars">Venue Providers</Link>
                                        </li>                                        
                                        <li className="nav-item">
                                            <Link className="page-scroll" to={CONFIG.AdminUrl+"auth/signin"}>Login / Signup</Link>
                                        </li>                                        
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