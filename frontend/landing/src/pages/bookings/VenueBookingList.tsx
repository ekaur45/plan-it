import { useEffect, useState } from "react";
import { useGlobalSelector } from "../../hooks";
import MyBookingModel from "../../models/bookings/my-booking.model";
import { getRequest, postRequest } from "../../utils/api.util";
import { Modal } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import VenueBookingModel from "../../models/venue/venue-booking.model";
import CONFIG from "../../utils/config.util";
import average from "../../utils/misc.util";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";

export default function VenueBookingList() {
    const user = useGlobalSelector(state => state.globalReducer.user);
    const [selectedVenue, setSelectedVenue] = useState<any>(null);
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
        const d = Object.freeze({ userId: user._id, rating: rating, comments, venue: selectedVenue.venue._id, bookingId: selectedVenue._id });
        await postRequest('home/add-car-rating', d);
        setSelectedVenue(null);
        initialData();
    }
    const handleOnFeedbackSubmit = async (e: any) => {
        e.preventDefault();
        handleOnRatingChange();
    }
    useEffect(() => {
        initialData();
    }, []);
    return (
        <>
            <Outlet />

            <Modal show={selectedVenue ? true : false}>
                <Modal.Header>
                    <div className="d-flex justify-content-between w-100">
                        <span>Add feedback</span>
                        <span>
                            <em className="fa fa-remove" onClick={() => setSelectedVenue(null)}></em>
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
                                changeRating={e => setRating(e + "")}
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
                            onChange={e => setComments(e.target.value)}
                            value={comments}
                        />
                        <button onClick={handleOnFeedbackSubmit} className="btn btn-primary">Add</button>
                    </form>
                </Modal.Body>
            </Modal>
            <div className="title-wrapper">
                <h2 className="h2 section-title">Venue Bookings</h2>
            </div>
            <ul className="featured-car-list">

                {
                    bookings && bookings.venueBookings.length > 0 && bookings.venueBookings.map((booking: VenueBookingModel, ndx: number) => <li key={ndx}>
                        <div className="featured-car-card">

                            <figure className="card-banner">
                                <img onError={handleOnImageError} src={CONFIG.BaseUrl + booking.venue.images[0].file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                    className="w-100" />
                            </figure>

                            <div className="card-content">

                                <div className="card-title-wrapper">
                                    <h3 className="h3 card-title">
                                        <a>{booking.venue.name}</a>
                                    </h3>
                                </div>

                                <ul className="card-list">
                                <li className="card-list-item">Booking Date</li>
                                <li className="card-list-item">{moment(booking.bookingDate).format("MM-DD-YYYY")}</li>
                                    <li className="card-list-item">
                                        <em className="fa fa-users"></em>
                                        <span className="card-item-text">{booking.venue.capacity} People</span>
                                    </li>

                                    <li className="card-list-item">
                                        {/* <ion-icon name="flash-outline"></ion-icon> */}
                                        <em className="fa fa-location"></em>
                                        <span className="card-item-text">{booking.venue.location}</span>
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
                                    {booking.venue.description}
                                </div>
                                <div className="card-price-wrapper">
                                    <p className="card-price">
                                        <strong>{booking.venue.price}</strong> PKR / Person
                                    </p>
                                    <button className="btn fav-btn d-flex align-items-baseline" style={{gap:"10px"}} aria-label="Add to favourite list">
                                        {booking.venue.rating.length > 0 && <Link to={"/bookings/venue/" + booking.venue._id + "/comments"}>{average(booking.venue.rating.map(cc => cc.rating))}({booking.venue.rating.length})</Link>}
                                        {booking.venue.rating.length <= 0 && <>0(0)</>} <em onClick={() => booking.rating.length == 0 && setSelectedVenue(booking)} className="fa fa-star text-warning"></em>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                    )}
                {
                    !isLoading && bookings?.venueBookings.length === 0 && <>No Venue booking</>
                }
            </ul>
        </>
    )
}