import { useEffect, useState } from "react";
import MyBookingModel from "../../models/bookings/my-booking.model";
import { getRequest, postRequest } from "../../utils/api.util";
import CONFIG from "../../utils/config.util";
import average from "../../utils/misc.util";
import CarBookingModel from "../../models/car-booking.model";
import { Modal } from "react-bootstrap";
import { useGlobalSelector } from "../../hooks";
import StarRatings from "react-star-ratings";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";

export default function CarBookingList() {
    const user = useGlobalSelector(state => state.globalReducer.user);
    const [selectedCar, setSelectedCar] = useState<any>(null);
    const [comments, setComments] = useState<string>("");
    const [rating, setRating] = useState<string>("");
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
    const handleOnRatingChange = async () => {
        const d = Object.freeze({ userId: user._id, rating: rating, comments,carId: selectedCar.car._id, bookingId: selectedCar._id });
        await postRequest('home/add-car-rating', d);
        setSelectedCar(null);
        initialData();
    }
    const handleOnFeedbackSubmit = async (e:any)=>{
        e.preventDefault();
        handleOnRatingChange();
    }
    useEffect(() => {
        initialData();
    }, []);
    return (<>
    <Outlet/>
        <Modal show={selectedCar ? true : false}>
            <Modal.Header>
                <div className="d-flex justify-content-between w-100">
                    <span>Add feedback</span>
                    <span>
                        <em className="fa fa-remove" onClick={() => setSelectedCar(null)}></em>
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleOnFeedbackSubmit}>
                    <div className="mb-3">
                    <StarRatings
                     numberOfStars={5}
                     starRatedColor="#ffb800"
                     
                     starDimension="25px"
                     rating={Number(rating)}
                     changeRating={e=>setRating(e+"")}
                    />
                    </div>
                    {/* <select value={rating}
                    className="form-control mb-3"
                    onChange={e=>setRating(e.target.value)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> */}
                    <input type="text"
                    className="form-control mb-3"
                    placeholder="Comments"
                    onChange={e=>setComments(e.target.value)} 
                    value={comments}
                    />
                    <button onClick={handleOnFeedbackSubmit} className="btn btn-primary">Add</button>
                </form>
            </Modal.Body>
        </Modal>
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
                                <li className="card-list-item">Booking Date</li>
                                <li className="card-list-item">{moment(booking.rentDate).format("MM-DD-YYYY")}</li>
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
                                    <strong>{booking.car.rent}</strong> / day
                                </p>
                                <button className="align-items-center btn d-flex fav-btn justify-content-center" style={{gap:'5px'}} aria-label="Add to favourite list">
                                    {booking.car.rating.length > 0 && <><Link to={"/bookings/car/" + booking.car._id + "/comments"}> {average(booking.car.rating.map(cc=>cc.rating))}({booking.car.rating.length})</Link></>}
                                    {booking.car.rating.length <= 0 && <>0(0)</>} <em onClick={() => booking.car.rating.length==0 && setSelectedCar(booking)} className="fa fa-star text-warning"></em>
                                </button>
                                {/* <Link to={"/bookings/car/" + booking.car._id + "/comments"}>Comments</Link> */}
                                {/* <button className="btn">Rent now</button> */}
                            </div>
                        </div>
                    </div>
                </li>
                )}
            {
                !isLoading && bookings?.carBookings.length === 0 && <>No Car booking</>
            }

        </ul>
    </>);
}