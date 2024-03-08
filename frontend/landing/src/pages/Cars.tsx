import { useEffect, useState } from "react";
import { getRequest } from "../utils/api.util";
import CarModel from "../models/cars.model";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import CONFIG from "../utils/config.util";

export default function CarsPage() {
    const isGlobalLoginVisible = useGlobalSelector((state) => state.globalReducer.isGlobalLoginVisible);
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const dispatch = useGlobalDispatch();
    const [cars, setCars] = useState<CarModel[]>([]);
    const getCars = async () => {
        const result = await getRequest<CarModel[]>("home/car-rentals");
        if (result.status === 200) {
            setCars(result.data);

        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        getCars();
    }, []);
    return (<>
        <article>
            <section className="section hero" id="home">
                <div className="container">
                    <div className="hero-content">
                        <h2 className="h1 hero-title">The easy way to takeover a lease</h2>
                        <p className="hero-text">
                            Live in Pakistan!
                        </p>
                    </div>
                    <div className="hero-banner"></div>
                    <form action="" className="hero-form">
                        <div className="input-wrapper">
                            <label htmlFor="input-1" className="input-label">Car, model, or brand</label>
                            <input type="text" name="car-model" id="input-1" className="input-field"
                                placeholder="What car are you looking?" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="input-2" className="input-label">Max. monthly payment</label>
                            <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in $" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="input-3" className="input-label">Make Year</label>
                            <input type="text" name="year" id="input-3" className="input-field" placeholder="Add a minimal make year" />
                        </div>
                        <button type="submit" className="btn">Search</button>
                    </form>
                </div>
            </section>
            <section className="section featured-car" id="featured-car">
                <div className="container">
                    <div className="title-wrapper">
                        <h2 className="h2 section-title">Featured cars</h2>
                        <a href="/" className="featured-car-link">
                            <span>View more</span>
                            <em className="fa fa-arrow-right"></em>
                        </a>
                    </div>
                    <ul className="featured-car-list">
                        {
                            cars && cars.length > 0 && cars.map((car: CarModel, ndx: number) => <li key={ndx}>
                                <div className="featured-car-card">

                                    <figure className="card-banner">
                                        <img onError={handleOnImageError} src={CONFIG.BaseUrl + car.images[0].file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                            className="w-100" />
                                    </figure>

                                    <div className="card-content">

                                        <div className="card-title-wrapper">
                                            <h3 className="h3 card-title">
                                                <a href="/">{car.name}</a>
                                            </h3>

                                            <data className="year" value="2021">{car.model}</data>
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
                                            <li className="card-list-item">
                                                {car.description}
                                            </li>
                                        </ul>
                                        <div className="card-price-wrapper">
                                            <p className="card-price">
                                                <strong>{car.rent}</strong> / month
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
        </article>
    </>
    )
}