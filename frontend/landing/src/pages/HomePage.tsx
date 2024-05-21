import { useEffect, useState } from "react"
import { getRequest } from "../utils/api.util";
import CONFIG from "../utils/config.util";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [carRentals, setCarRentals] = useState([]);
    const [venueProviders, setVenueProviders] = useState([]);
    const [eventDecorators, setEventDecorators] = useState([]);
    const fetchData = async () => {
        const result = await getRequest<any>("home/home-data");
        if (result.status == 200) {
            const { carRentals, venueProviders, eventDecorators } = result.data;
            setCarRentals(carRentals)
            setVenueProviders(venueProviders);
            setEventDecorators(eventDecorators);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        fetchData();
    }, []);
    return <>
        <section className="section hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <h2 className="h1 hero-title"> TRANSFORMING YOUR VISION INTO STUNNING REALITY</h2>
                    <p className="hero-text">
                        Your Vision, Our Expertise !
                    </p>
                </div>
                <div className="hero-banner"></div>
            </div>
        </section>
        <section className="section featured-car pt-3 pb-3" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured cars</h2>
                    <Link to={"/cars"} className="featured-car-link">
                        <span>View more</span>
                        <em className="fa fa-arrow-right"></em>
                    </Link>
                </div>
                <ul className="featured-car-list">
                {carRentals && carRentals.length === 0 && <>No Cars Found</>}
                    {carRentals && carRentals.length > 0 && carRentals.map((ed: any) => <li key={ed._id}>
                        <div className="featured-car-card">

                            <figure className="card-banner">
                                <img onError={handleOnImageError} src={CONFIG.BaseUrl + ed.images[0].file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                    className="w-100" />
                            </figure>
                            <div className="card-content">

                                <div className="card-title-wrapper">
                                    <h3 className="h3 card-title">
                                        {ed.name}
                                    </h3>

                                    <data className="year" value="2021">{ed.model}</data>
                                </div>

                                <ul className="card-list">

                                    <li className="card-list-item">
                                        <em className="fa fa-users"></em>
                                        <span className="card-item-text">{ed.capacity} People</span>
                                    </li>

                                    <li className="card-list-item">
                                        <em className="fa fa-bolt"></em>
                                        <span className="card-item-text">{ed.fuelType}</span>
                                    </li>

                                    <li className="card-list-item">
                                        <em className="fa fa-tachometer"></em>
                                        <span className="card-item-text">{ed.fuelAverage}km / 1-litre</span>
                                    </li>

                                    <li className="card-list-item">
                                        <em className="fa fa-microchip"></em>
                                        <span className="card-item-text">{ed.transmission}</span>
                                    </li>
                                    <li className="card-list-item">
                                        <em className="fa fa-phone-alt"></em>
                                        <a href={"tel:"+ed.user.phoneNumber} className="card-item-text">{ed.user?.phoneNumber ?? "N/A"}</a>
                                    </li>
                                </ul>
                                <p className="multiline-overflow-ellipsis">
                                    {ed.description}
                                </p>
                                <div className="card-price-wrapper">
                                    <p className="card-price">
                                        <strong>{ed.rent}</strong> / day
                                    </p>
                                    <Link className="btn btn-outline-primary" to={"/cars"}>Rent now</Link>
                                </div>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        </section>
        <section className="section featured-car pt-3 pb-3" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Venues</h2>
                    <Link to={"/venue"} className="featured-car-link">
                        <span>View more</span>
                        <em className="fa fa-arrow-right"></em>
                    </Link>
                </div>
                <ul className="featured-car-list">
                    {venueProviders && venueProviders.length === 0&&<>No Venues Found</>}
                    {
                        venueProviders && venueProviders.length > 0 && venueProviders.map((ed: any, i) => <li key={ed._id}>
                            <div className="featured-car-card">

                                <figure className="card-banner">
                                    <img onError={handleOnImageError} src={CONFIG.BaseUrl + ed.images[0]?.file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                        className="w-100" />
                                </figure>


                                <div className="card-content">

                                    <div className="card-title-wrapper">
                                        <h3 className="h3 card-title">
                                            <a>{ed.name}</a>
                                        </h3>
                                    </div>

                                    <ul className="card-list">

                                        <li className="card-list-item">
                                            <em className="fa fa-users"></em>
                                            <span className="card-item-text">{ed.capacity} People</span>
                                        </li>

                                        <li className="card-list-item">
                                            {/* <ion-icon name="flash-outline"></ion-icon> */}
                                            <em className="fa fa-location"></em>
                                            <span className="card-item-text">{ed.location}</span>
                                        </li>
                                        <li className="card-list-item">
                                            <em className="fa fa-phone-alt"></em>
                                            <span className="card-item-text">{ed.user?.phoneNumber}</span>
                                        </li>
                                        {/* 
                                        <li className="card-list-item">
                                            <em className="fa fa-tachometer"></em>
                                            <span className="card-item-text">{venue.location}</span>
                                        </li>

                                        <li className="card-list-item">
                                            <em className="fa fa-microchip"></em>
                                            <span className="card-item-text">{venue.capacity}</span>
                                        </li> */}
                                    </ul>
                                    <div className="multiline-overflow-ellipsis">
                                        {ed.description}
                                    </div>
                                    <div className="card-price-wrapper mt-3">
                                        <p className="card-price">
                                            <strong>{ed.price}</strong> PKR / Person
                                        </p>
                                        <Link to={"/venue"} className="btn btn-outline-primary">Rent now</Link>
                                    </div>
                                </div>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        </section>
        <section className="section featured-car pt-3 pb-3" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Decorators</h2>
                    <Link to="/event" className="featured-car-link">
                        <span>View more</span>
                        <em className="fa fa-arrow-right"></em>
                    </Link>
                </div>
                <ul className="featured-car-list">
                    {eventDecorators && eventDecorators.length === 0 && <>No Decorators Found</>}
                    {
                        eventDecorators && eventDecorators.length > 0 && eventDecorators.map((ed: any) => <li key={ed._id}>
                            <div className="featured-car-card">

                                <figure className="card-banner">
                                    <img onError={handleOnImageError} src={CONFIG.BaseUrl + ed.files[0]} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                        className="w-100" />
                                </figure>

                                <div className="card-content">

                                    <div className="card-title-wrapper">
                                        <h3 className="h3 card-title">
                                            {ed.name}
                                        </h3>
                                    </div>

                                    <ul className="card-list">
                                    <li className="card-list-item">
                                            <em className="fa fa-phone-alt"></em>
                                            <span className="card-item-text">{ed.user?.phoneNumber}</span>
                                        </li>
                                    </ul>
                                    <p className="card-list-item multiline-overflow-ellipsis" style={{ display: "-webkit-box" }}>
                                        {ed.description}
                                    </p>
                                    <div className="card-price-wrapper">
                                        <p className="card-price">
                                            <strong>{ed.price}</strong> PKR / month
                                        </p>
                                        <button className="btn btn-outline-primary" onClick={e => alert("Hi")}>Rent now</button>
                                    </div>
                                </div>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        </section>
    </>
}