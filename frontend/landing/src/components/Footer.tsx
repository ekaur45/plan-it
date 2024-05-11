export default function Footer(){
    return (
        <footer className="footer">
        <div className="container">

            <div className="footer-top">

                <div className="footer-brand">
                    <a href="/" className="logo">
                        Plant-IT
                    </a>

                    <p className="footer-text">
                        Search for cheap rental cars in New York. With a diverse fleet of 19,000 vehicles, Waydex offers its
                        consumers an
                        attractive and fun selection.
                    </p>
                </div>

                <ul className="footer-list">

                    <li>
                        <p className="footer-list-title">Company</p>
                    </li>

                    <li>
                        <a href="/" className="footer-link">About us</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Pricing plans</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Our blog</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Contacts</a>
                    </li>

                </ul>

                <ul className="footer-list">

                    <li>
                        <p className="footer-list-title">Support</p>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Help center</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Ask a question</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Privacy policy</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Terms & conditions</a>
                    </li>

                </ul>

                <ul className="footer-list">

                    <li>
                        <p className="footer-list-title">Neighborhoods in New York</p>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Manhattan</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Central New York City</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Upper East Side</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Queens</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Theater District</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Midtown</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">SoHo</a>
                    </li>

                    <li>
                        <a href="/" className="footer-link">Chelsea</a>
                    </li>

                </ul>

            </div>

            <div className="footer-bottom">

                <ul className="social-list">

                    {/* <li>
                        <a href="/" className="social-link">
                            <LogoFacebook cssClasses={"ion-icon"} />
                        </a>
                    </li>

                    <li>
                        <a href="/" className="social-link">
                            <LogoInstagram cssClasses={"ion-icon"} />
                        </a>
                    </li>

                    <li>
                        <a href="/" className="social-link">
                            <LogoTwitter cssClasses={"ion-icon"} />
                        </a>
                    </li>

                    <li>
                        <a href="/" className="social-link">
                            <LogoLinkedin cssClasses={"ion-icon"} />
                        </a>
                    </li>

                    <li>
                        <a href="/" className="social-link">
                            <LogoSkype cssClasses={"ion-icon"} />
                        </a>
                    </li>

                    <li>
                        <a href="/" className="social-link">
                            <MailOutline cssClasses={"ion-icon"} />
                        </a>
                    </li> */}

                </ul>

                <p className="copyright">
                    &copy; 2022 <a href="/">codewithsadee</a>. All Rights Reserved
                </p>

            </div>

        </div>
    </footer>
    )
}