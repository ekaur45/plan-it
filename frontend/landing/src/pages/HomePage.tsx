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
            console.log({ carRentals, venueProviders, eventDecorators });
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
                    <h2 className="h1 hero-title">The easy way to takeover a lease</h2>
                    <p className="hero-text">
                        Live in Pakistan!
                    </p>
                </div>
                <div className="hero-banner"></div>
            </div>
        </section>
        <section className="section featured-car" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured cars</h2>
                    <Link to={"/cars"} className="featured-car-link">
                        <span>View more</span>
                        <em className="fa fa-arrow-right"></em>
                    </Link>
                </div>
                <ul className="featured-car-list">
                    {carRentals && carRentals.length > 0 && carRentals.map((ed: any) => <li>
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
                                        <span className="card-item-text">4 People</span>
                                    </li>

                                    <li className="card-list-item">
                                        <em className="fa fa-bolt"></em>
                                        <span className="card-item-text">Hybrid</span>
                                    </li>

                                    <li className="card-list-item">
                                        <em className="fa fa-tachometer"></em>
                                        <span className="card-item-text">6.1km / 1-litre</span>
                                    </li>

                                    <li className="card-list-item">
                                        <em className="fa fa-microchip"></em>
                                        <span className="card-item-text">Automatic</span>
                                    </li>
                                    <li className="card-list-item">
                                        {ed.description}
                                    </li>
                                </ul>
                                <div className="card-price-wrapper">
                                    <p className="card-price">
                                        <strong>{ed.rent}</strong> / month
                                    </p>
                                    <Link className="btn btn-outline-primary" to={"/cars"}>Rent now</Link>
                                </div>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        </section>
        <section className="section featured-car" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Venues</h2>
                    <Link to={"/venue"} className="featured-car-link">
                        <span>View more</span>
                        <em className="fa fa-arrow-right"></em>
                    </Link>
                </div>
                <ul className="featured-car-list">
                    {
                        venueProviders && venueProviders.length > 0 && venueProviders.map((ed: any) => <li>
                            <div className="featured-car-card">

                                <figure className="card-banner">
                                    <img onError={handleOnImageError} src={CONFIG.BaseUrl + ed.images[0].file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                        className="w-100" />
                                </figure>

                                <div className="card-content"></div>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        </section>
        <section className="section featured-car" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Decorators</h2>
                    <a href="/" className="featured-car-link">
                        <span>View more</span>
                        <em className="fa fa-arrow-right"></em>
                    </a>
                </div>
                <ul className="featured-car-list">
                    {
                        eventDecorators && eventDecorators.length > 0 && eventDecorators.map((ed: any) => <li>
                            <div className="featured-car-card">

                                <figure className="card-banner">
                                    <img onError={handleOnImageError} src={CONFIG.BaseUrl + ed.profile} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                        className="w-100" />
                                </figure>

                                <div className="card-content">
                                    
                                </div>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        </section>
    </>
}