import { useEffect, useState } from "react"

export default function HomePage(){
    const [carRentals,setCarRentals] = useState([]);
    const [venueProviders,setVenueProviders] = useState([]);
    const [eventDecorators,setEventDecorators] = useState([]);
    const fetchData = async ()=>{
        const resp = await fetch("http://localhost:8000/api/home/home-data");
        const result = await resp.json();
        if(result.status == 200){
            const {carRentals,venueProviders,eventDecorators} = result.data;
            setCarRentals(carRentals)
            setVenueProviders(venueProviders);
            setEventDecorators(eventDecorators);
            console.log({carRentals,venueProviders,eventDecorators});
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
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



    <section id="event" className="event_area pt-120 pb-130">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section_title text-center pb-30">
                        <h3 className="title">Event Decorators</h3>
                        <img src="assets/images/section_shape.png" alt="Shape"/>
                    </div> 
                </div>
            </div> 
            <div className="row justify-content-center">
                {
                    eventDecorators&&eventDecorators.length>0&&eventDecorators.map((ed:any)=><div key={ed._id} className="col-lg-4 col-md-7">
                    <div className="single_event mt-30 wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.2s">
                        <div className="event_image">
                            <img src="assets/images/event-1.jpg" alt="event"/>
                        </div>
                        <div className="event_content">
                            {/* <span className="date">02 Feb 2023</span> */}
                            <h3 className="event_title"><a href="#">{ed.firstName} {ed.lastName}</a></h3>
                            {/* <p>Typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley</p> */}
                            <a className="more" href="#">View Services...</a>
                        </div>
                    </div> 
                </div>)
                }
                {
                    (!eventDecorators || eventDecorators.length == 0) &&<div>
                        Event Decorators coming soon...
                    </div>
                }
            </div> 
        </div> 
    </section>
    <section id="event" className="event_area pt-120 pb-130">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section_title text-center pb-30">
                        <h3 className="title">Car Rental</h3>
                        <img src="assets/images/section_shape.png" alt="Shape"/>
                    </div> 
                </div>
            </div> 
            <div className="row justify-content-center">
                {
                    carRentals&&carRentals.length>0&&carRentals.map((ed:any)=><div key={ed._id} className="col-lg-4 col-md-7">
                    <div className="single_event mt-30 wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.2s">
                        <div className="event_image">
                            <img src="assets/images/event-1.jpg" alt="event"/>
                        </div>
                        <div className="event_content">
                            {/* <span className="date">02 Feb 2023</span> */}
                            <h3 className="event_title"><a href="#">{ed.firstName} {ed.lastName}</a></h3>
                            {/* <p>Typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley</p> */}
                            <a className="more" href="#">View Services...</a>
                        </div>
                    </div> 
                </div>)
                }
                {
                    (!carRentals || carRentals.length == 0) &&<div>
                        Car Rental coming soon...
                    </div>
                }
            </div> 
        </div> 
    </section>
    <section id="event" className="event_area pt-120 pb-130">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section_title text-center pb-30">
                        <h3 className="title">Venue Providers</h3>
                        <img src="assets/images/section_shape.png" alt="Shape"/>
                    </div> 
                </div>
            </div> 
            <div className="row justify-content-center">
                {
                    venueProviders&&venueProviders.length>0&&venueProviders.map((ed:any)=><div key={ed._id} className="col-lg-4 col-md-7">
                    <div className="single_event mt-30 wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.2s">
                        <div className="event_image">
                            <img src="assets/images/event-1.jpg" alt="event"/>
                        </div>
                        <div className="event_content">
                            {/* <span className="date">02 Feb 2023</span> */}
                            <h3 className="event_title"><a href="#">{ed.firstName} {ed.lastName}</a></h3>
                            {/* <p>Typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when unknown printer took a galley</p> */}
                            <a className="more" href="#">View Services...</a>
                        </div>
                    </div> 
                </div>)
                }
                 {
                    (!venueProviders || venueProviders.length == 0) ?<div>
                        Venues Provider coming soon...
                    </div>:<></>
                }
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