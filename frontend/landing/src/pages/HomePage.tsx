export default function HomePage(){
    return<>
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
    <section className="header_area">
        <div className="header_navbar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand" href="index.html">
                                <img src={require("../assets/images/logo.png")} alt="Logo"/>
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="toggler-icon"></span>
                                <span className="toggler-icon"></span>
                                <span className="toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul id="nav" className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <a className="page-scroll" href="#home">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#couple">Couple</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#our_love">Story</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#gallery">Gallery</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#event">Event</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#contact">RSVP</a>
                                    </li>
                                </ul>
                            </div> 
                        </nav> 
                    </div>
                </div> 
            </div> 
        </div> 

        <div id="home" className="header_slider slider-active">
            <div className="single_slider bg_cover d-flex align-items-center" style={{backgroundImage: "url(assets/images/slider-1.jpg)"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="slider_content text-center">
                                <h5 className="slider_sub_title" data-animation="fadeInUp" data-delay="0.2s">WE ARE GETTING MARRIED</h5>
                                <h2 className="slider_title" data-animation="fadeInUp" data-delay="0.7s">Michael <span>&</span> Jessica</h2>
                                <span className="location" data-animation="fadeInUp" data-delay="1s">The Big Church, New York, USA</span>
                                <p data-animation="fadeInUp" data-delay="1.4s"><img src="assets/images/header-shape-1.png" alt="Shape"/>20 December 2023<img src="assets/images/header-shape-2.png" alt="Shape"/></p>
                            </div> 
                        </div>
                    </div> 
                </div> 
            </div> 
        </div> 
    </section>

    

    

    <section id="couple" className="couple_area pt-120 pb-130">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section_title text-center pb-30">
                        <h3 className="title">Lovely Couple</h3>
                        <img src={require("../assets/images/section_shape.png")} alt="Shape"/>
                    </div> 
                </div>
            </div> 
            <div className="row">
                <div className="col-md-6">
                    <div className="single_couple mt-30 wow fadeInUpBig" data-wow-duration="1.3s" data-wow-delay="0.2s">
                        <div className="couple_image">
                            <img src={require("../assets/images/couple-1.jpg")} alt="Couple"/>
                        </div>
                        <div className="couple_content text-center">
                            <img className="shape" src={require("../assets/images/couple-shape.png")} alt="shape"/>
                            <h4 className="couple_name">Michael Smith</h4>
                            <p>Hi I am Michael Smith, dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                            <ul className="social">
                                <li><a href="#"><i className="lni lni-facebook-filled"></i></a></li>
                                <li><a href="#"><i className="lni lni-twitter-original"></i></a></li>
                                <li><a href="#"><i className="lni lni-instagram-original"></i></a></li>
                                <li><a href="#"><i className="lni lni-linkedin-original"></i></a></li>
                            </ul>
                        </div>
                    </div> 
                </div>
                <div className="col-md-6">
                    <div className="single_couple mt-30 wow fadeInUpBig" data-wow-duration="1.3s" data-wow-delay="0.6s">
                        <div className="couple_image">
                            <img src="assets/images/couple-2.jpg" alt="Couple"/>
                        </div>
                        <div className="couple_content text-center">
                            <img className="shape" src="assets/images/couple-shape.png" alt="shape"/>
                            <h4 className="couple_name">Jessica Jones</h4>
                            <p>Hi I am Jessica Jones, dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                            <ul className="social">
                                <li><a href="#"><i className="lni lni-facebook-filled"></i></a></li>
                                <li><a href="#"><i className="lni lni-twitter-original"></i></a></li>
                                <li><a href="#"><i className="lni lni-instagram-original"></i></a></li>
                                <li><a href="#"><i className="lni lni-linkedin-original"></i></a></li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div> 
        </div> 
    </section>

    

    

    <section id="coming_soon" className="coming_soon_area pt-20 pb-70">
        <div className="coming_soon_shape_1">
            <img src="assets/images/shape-1.png" alt="shape"/>
        </div> 

        <div className="container">

        <div className="text-center">
            <h1>You are Using Free Lite Version</h1>
            <p>Please purchase full version to get all elements, sections and permission to remove footer credit</p>
            <a href="https://rebrand.ly/wedding-day-ud" rel="nofollow" className="main-btn">Purchase Now</a>
        </div>

        </div> 

        <div className="coming_soon_shape_2">
            <img src="assets/images/shape-2.png" alt="shape"/>
        </div> 
    </section>

    

    

    <section id="our_love" className="our_love_area pt-120">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section_title text-center pb-30">
                        <h3 className="title">Our Love Story</h3>
                        <img src="assets/images/section_shape.png" alt="Shape"/>
                    </div> 
                </div>
            </div> 
            <div className="love_wrapper">
                <div className="single_love d-flex flex-wrap align-items-center">
                    <div className="love_content order-md-last wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.4s">
                        <h3 className="love_title">We Met For The First Time</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna nose aaliquyam erat, sed diam voluptua. At vero eos et accusam justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea timata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum.</p>
                    </div>
                    <div className="love_date">
                        <p><i className="lni lni-heart-filled"></i> 7 May 21</p>
                    </div>
                    <div className="love_image order-md-first wow fadeInRightBig" data-wow-duration="1.3s" data-wow-delay="0.4s">
                        <img src="assets/images/love-1.jpg" alt="love"/>
                    </div>
                </div> 

                <div className="single_love d-flex flex-wrap align-items-center">
                    <div className="love_content text-lg-right wow fadeInRightBig" data-wow-duration="1.3s" data-wow-delay="0.4s">
                        <h3 className="love_title">We AreFirst Dating</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna nose aaliquyam erat, sed diam voluptua. At vero eos et accusam justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea timata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum.</p>
                    </div>
                    <div className="love_date">
                        <p><i className="lni lni-heart-filled"></i> 15 Jan 22</p>
                    </div>
                    <div className="love_image wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.4s">
                        <img src="assets/images/love-2.jpg" alt="love"/>
                    </div>
                </div> 

                <div className="single_love d-flex flex-wrap align-items-center">
                    <div className="love_content order-md-last wow fadeInLeftBig" data-wow-duration="1.3s" data-wow-delay="0.4s">
                        <h3 className="love_title">We Live Together</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna nose aaliquyam erat, sed diam voluptua. At vero eos et accusam justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea timata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum.</p>
                    </div>
                    <div className="love_date">
                        <p><i className="lni lni-heart-filled"></i> 25 Jul 22</p>
                    </div>
                    <div className="love_image order-md-first wow fadeInRightBig" data-wow-duration="1.3s" data-wow-delay="0.4s">
                        <img src="assets/images/love-3.jpg" alt="love"/>
                    </div>
                </div> 
            </div> 
        </div> 
    </section>

    

    

    <section id="gallery" className="gallery_area pt-120">
        <div className="container">

        <div className="text-center">
            <h1>You are Using Free Lite Version</h1>
            <p>Please purchase full version to get all elements, sections and permission to remove footer credit</p>
            <a href="https://rebrand.ly/wedding-day-ud" rel="nofollow" className="main-btn">Purchase Now</a>
        </div>

        </div> 
    </section>

    

    

    <section id="event" className="event_area pt-120 pb-130">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section_title text-center pb-30">
                        <h3 className="title">Weeding Events</h3>
                        <img src="assets/images/section_shape.png" alt="Shape"/>
                    </div> 
                </div>
            </div> 
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-7">
                    <div className="single_event mt-30 wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.2s">
                        <div className="event_image">
                            <img src="assets/images/event-1.jpg" alt="event"/>
                        </div>
                        <div className="event_content">
                            <span className="date">02 Feb 2023</span>
                            <h3 className="event_title"><a href="#">Bride Shower</a></h3>
                            <p>Typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley</p>
                            <a className="more" href="#">Read More...</a>
                        </div>
                    </div> 
                </div>
                <div className="col-lg-4 col-md-7">
                    <div className="single_event mt-30 wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.5s">
                        <div className="event_image">
                            <img src="assets/images/event-2.jpg" alt="event"/>
                        </div>
                        <div className="event_content">
                            <span className="date">05 Feb 2023</span>
                            <h3 className="event_title"><a href="#">Wedding Reception</a></h3>
                            <p>Typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley</p>
                            <a className="more" href="#">Read More...</a>
                        </div>
                    </div> 
                </div>
                <div className="col-lg-4 col-md-7">
                    <div className="single_event mt-30 wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.8s">
                        <div className="event_image">
                            <img src="assets/images/event-3.jpg" alt="event"/>
                        </div>
                        <div className="event_content">
                            <span className="date">07 Feb 2023</span>
                            <h3 className="event_title"><a href="#">Bachelor Party</a></h3>
                            <p>Typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley</p>
                            <a className="more" href="#">Read More...</a>
                        </div>
                    </div> 
                </div>
            </div> 
        </div> 
    </section>

    



    

    <section id="contact" className="contact_area pt-130 pb-130">
        <div className="container">

        <div className="text-center">
            <h1>You are Using Free Lite Version</h1>
            <p>Please purchase full version to get all elements, sections and permission to remove footer credit</p>
            <a href="https://rebrand.ly/wedding-day-ud" rel="nofollow" className="main-btn">Purchase Now</a>
        </div>

        </div> 
    </section>

    

    

    <footer id="footer" className="footer_area">
        <div className="footer_shape_1">
            <img src="assets/images/shape-1.png" alt="shape"/>
        </div> 
        
        <div className="container">
            <div className="footer_widget pt-80 pb-80 text-center">
                <div className="footer_logo">
                    <a href="#"><img src="assets/images/logo-2.png" alt="logo"/></a>
                </div>
                <div className="footer_title">
                    <h3 className="title">Michael <span>&</span> Jessica</h3>
                </div>
                <ul className="footer_menu">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Couple</a></li>
                    <li><a href="#">Story</a></li>
                    <li><a href="#">Gallery</a></li>
                    <li><a href="#">Event</a></li>
                    <li><a href="#">RSVP</a></li>
                </ul>
            </div> 
            <div className="footer_copyright text-center">
                <p>Designed and Developed by <a href="https://uideck.com" style={{"color": "#D59A57"}} rel="nofollow">UIdeck</a></p>
            </div>
        </div> 
    </footer>

    
    
    

    <a href="#" className="back-to-top"><i className="lni lni-chevron-up"></i></a>

    
    </>
}