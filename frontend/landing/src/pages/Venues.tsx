import { useEffect, useState } from "react";
import VenueModel from "../models/venue/venue.model";
import { getRequest } from "../utils/api.util";
import CONFIG from "../utils/config.util";

export default function Venues(){
    const [venues, setVenues] = useState<VenueModel[]>([]);
    const getVenues = async () => {
        const result = await getRequest<VenueModel[]>("home/venues");
        if (result.status === 200) {
            setVenues(result.data);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        getVenues()
    }, [])
    return( <article>
        <section className="section hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <h2 className="h1 hero-title">The easy way to takeover a lease</h2>
                    <p className="hero-text">
                        Live in Pakistan!
                    </p>
                </div>
                <div className="hero-banner-venue"></div>
                <form action="" className="hero-form">
                    <div className="input-wrapper">
                        <label htmlFor="input-1" className="input-label">Venue, location, or capacity</label>
                        <input type="text" name="car-model" id="input-1" className="input-field"
                            placeholder="What venue are you looking?" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="input-2" className="input-label">Per head payment(min)</label>
                        <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in PKR" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="input-3" className="input-label">Per head payment(max)</label>
                        <input type="text" name="year" id="input-3" className="input-field" placeholder="Add an amount in PKR" />
                    </div>
                    <button type="submit" className="btn">Search</button>
                </form>
            </div>
        </section>
        <section className="section featured-car" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Venues</h2>
                </div>
                <ul className="featured-car-list">
                    {
                        venues && venues.length > 0 && venues.map((venue: VenueModel, ndx: number) => <li key={ndx}>
                            <div className="featured-car-card">

                                <figure className="card-banner">
                                    <img onError={handleOnImageError} src={CONFIG.BaseUrl + venue.images[0].file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                        className="w-100" />
                                </figure>

                                <div className="card-content">

                                    <div className="card-title-wrapper">
                                        <h3 className="h3 card-title">
                                            <a href="/">Toyota RAV4</a>
                                        </h3>
                                        <data className="year" value="2021">2021</data>
                                    </div>

                                    <ul className="card-list">

                                        <li className="card-list-item">
                                            <em></em>
                                            {/* <PeopleOutline cssClasses={"ion-icon"} /> */}
                                            <em className="fa fa-users"></em>
                                            <span className="card-item-text">4 People</span>
                                        </li>

                                        <li className="card-list-item">
                                            {/* <ion-icon name="flash-outline"></ion-icon> */}
                                            <em className="fa fa-bolt"></em>
                                            <span className="card-item-text">Hybrid</span>
                                        </li>

                                        <li className="card-list-item">
                                            {/* <ion-icon name="speedometer-outline"></ion-icon> */}
                                            <em className="fa fa-tachometer"></em>
                                            <span className="card-item-text">6.1km / 1-litre</span>
                                        </li>

                                        <li className="card-list-item">
                                            {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}
                                            <em className="fa fa-microchip"></em>
                                            <span className="card-item-text">Automatic</span>
                                        </li>
                                    </ul>
                                    <div className="card-price-wrapper">
                                        <p className="card-price">
                                            <strong>$440</strong> / month
                                        </p>
                                        <button className="btn fav-btn" aria-label="Add to favourite list">
                                            {/* <ion-icon name="heart-outline"></ion-icon> */}
                                            <em className="fa fa-heart"></em>
                                        </button>
                                        <button className="btn">Rent now</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        )}
                </ul>
            </div>
        </section>
    </article>)
}