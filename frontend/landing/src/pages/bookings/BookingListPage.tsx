import { Fragment, useEffect, useState } from "react";
import { getRequest } from "../../utils/api.util";
import { Link } from "react-router-dom";
import MyBookingModel from "../../models/bookings/my-booking.model";
import moment from "moment";
import VenueBookingModel from "../../models/venue/venue-booking.model";
import CarBookingComponent from "../../components/bookings/CarBookingComponent";
import CarBookingModel from "../../models/car-booking.model";
import CONFIG from "../../utils/config.util";
export default function BookingListPage() {
    const [bookings, setBookings] = useState<MyBookingModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        setIsLoading(true);
        const result = await getRequest<MyBookingModel>("home/bookings");
        setIsLoading(false);
        if (result.status == 200) {
            setBookings(result.data);
        }
    }
    
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        initialData();
    }, []);
    return (<> <section className="section featured-car" id="featured-car">
        <div className="container">
            <div className="title-wrapper">
                <h2 className="h2 section-title">Car Bookings</h2>
            </div>
            <ul className="featured-car-list">
                {
                    bookings && bookings.carBookings && bookings.carBookings.length > 0 && bookings.carBookings.map((booking: CarBookingModel, ndx: number) => <li key={ndx}>
                        <div className="featured-car-card">

                            <figure className="card-banner">
                                <img onError={handleOnImageError} src={CONFIG.BaseUrl + booking.car.images[0].file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                    className="w-100" />
                            </figure>

                            <div className="card-content">

                                <div className="card-title-wrapper">
                                    <h3 className="h3 card-title">
                                        <a href="/">{booking.car.name}</a>
                                    </h3>

                                    <data className="year" value="2021">{booking.car.model}</data>
                                </div>

                                <ul className="card-list">

                                    <li className="card-list-item">
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
                                        {booking.car.description}
                                    </li>
                                </ul>
                                <div className="card-price-wrapper">
                                    <p className="card-price">
                                        <strong>{booking.car.rent}</strong> / month
                                    </p>
                                    <button className="btn fav-btn" aria-label="Add to favourite list">
                                        3.5(12) <em className="fa fa-heart text-danger"></em>
                                    </button>
                                    {/* <button className="btn">Rent now</button> */}
                                </div>
                            </div>
                        </div>
                    </li>
                    )}

            </ul>

            <div className="title-wrapper">
                <h2 className="h2 section-title">Venue Bookings</h2>
            </div>
            <ul className="featured-car-list"></ul>

            <div className="title-wrapper">
                <h2 className="h2 section-title">Decorators Bookings</h2>
            </div>
            <ul className="featured-car-list"></ul>
        </div>
    </section></>)
}