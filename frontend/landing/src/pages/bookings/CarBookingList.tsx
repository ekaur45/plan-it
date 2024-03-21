import { useEffect, useState } from "react";
import MyBookingModel from "../../models/bookings/my-booking.model";
import { getRequest } from "../../utils/api.util";
import CONFIG from "../../utils/config.util";
import average from "../../utils/misc.util";
import CarBookingModel from "../../models/car-booking.model";

export default function CarBookingList(){
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
    return(<>
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
                                        <a>{booking.car.name}</a>
                                    </h3>

                                    <data className="year" value="2021">{booking.car.model}</data>
                                </div>

                                <ul className="card-list">

                                    <li className="card-list-item">
                                        {/* <PeopleOutline cssClasses={"ion-icon"} /> */}
                                        <em className="fa fa-users"></em>
                                        <span className="card-item-text">{booking.car.capacity} People</span>
                                    </li>

                                    <li className="card-list-item">
                                        {/* <ion-icon name="flash-outline"></ion-icon> */}
                                        <em className="fa fa-bolt"></em>
                                        <span className="card-item-text text-capitalize">{booking.car.fuelType}</span>
                                    </li>

                                    <li className="card-list-item">
                                        {/* <ion-icon name="speedometer-outline"></ion-icon> */}
                                        <em className="fa fa-tachometer"></em>
                                        <span className="card-item-text">{booking.car.fuelAverage}km / 1-litre</span>
                                    </li>

                                    <li className="card-list-item">
                                        {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}
                                        <em className="fa fa-microchip"></em>
                                        <span className="card-item-text text-capitalize">{booking.car.transmission}</span>
                                    </li>
                                </ul>
                                    <div className="card-list-item multiline-overflow-ellipsis" >
                                        {booking.car.description}
                                    </div>
                                <div className="card-price-wrapper">
                                    <p className="card-price">
                                        <strong>{booking.car.rent}</strong> / month
                                    </p>
                                    <button className="btn fav-btn" aria-label="Add to favourite list">
                                        {booking.rating.length>0&&<>{average(booking.rating)}({booking.rating.length})</>}
                                        {booking.rating.length<=0 && <>0(0)</>} <em className="fa fa-heart text-danger"></em>
                                    </button>
                                    {/* <button className="btn">Rent now</button> */}
                                </div>
                            </div>
                        </div>
                    </li>
                    )}

            </ul>
    </>);
}