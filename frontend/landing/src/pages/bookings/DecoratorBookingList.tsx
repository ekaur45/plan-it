import { Fragment, useEffect, useState } from "react";
import { useGlobalSelector } from "../../hooks";
import MyBookingModel from "../../models/bookings/my-booking.model";
import { getRequest, postRequest } from "../../utils/api.util";
import CONFIG from "../../utils/config.util";
import EventBookingModel from "../../models/event-booking.model";
import { Link, Outlet } from "react-router-dom";
import average from "../../utils/misc.util";
import { Modal } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import moment from "moment";

export default function DecoratorBookingList() {
    const user = useGlobalSelector(state => state.globalReducer.user);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [comments, setComments] = useState<string>("");
    const [rating, setRating] = useState<string>("");
    const [bookings, setBookings] = useState<EventBookingModel[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        setIsLoading(true);
        const result = await getRequest<MyBookingModel>("home/bookings");
        setIsLoading(false);
        if (result.status === 200) {
            setBookings(result.data.eventBookings);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    const handleOnRatingChange = async () => {
        const d = Object.freeze({ userId: user._id, rating: rating, comments, event: selectedEvent.event._id, bookingId: selectedEvent._id });
        await postRequest('home/add-car-rating', d);
        setSelectedEvent(null);
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

            <Modal show={selectedEvent ? true : false}>
                <Modal.Header>
                    <div className="d-flex justify-content-between w-100">
                        <span>Add feedback</span>
                        <span>
                            <em className="fa fa-remove" onClick={() => setSelectedEvent(null)}></em>
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
                <h2 className="h2 section-title">Decorators Bookings</h2>
            </div>
            <ul className="featured-car-list">
                {bookings && bookings.length > 0 && bookings.map((e, i) => <Fragment key={e._id}>
                    <li>
                        <div className="featured-car-card">
                            <figure className="card-banner">
                                <img onError={handleOnImageError} src={CONFIG.BaseUrl + e.event.files[0]} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                    className="w-100" />
                            </figure>
                            <div className="card-content">

                                <div className="card-title-wrapper">
                                    <h3 className="h3 card-title">
                                        {e.event.name}
                                    </h3>
                                </div>

                                <ul className="card-list">
                                <li className="card-list-item">Booking Date</li>
                                <li className="card-list-item">{moment(e.bookingDate).format("MM-DD-YYYY")}</li>

                                </ul>
                                <p className="card-list-item multiline-overflow-ellipsis" style={{ display: "-webkit-box" }}>
                                    {e.event.description}
                                </p>
                                <div className="card-price-wrapper">
                                    <p className="card-price">
                                        <strong>{e.event.price}</strong> PKR / day
                                    </p>

                                    <button className="align-items-center btn d-flex fav-btn justify-content-center" style={{gap:'5px'}} aria-label="Add to favourite list">
                                        {e.event.rating.length > 0 && <Link to={"/bookings/decor/" + e.event._id + "/comments"}>{average(e.event.rating.map((cc: any) => cc.rating))}({e.event.rating.length})</Link>}
                                        {e.event.rating.length <= 0 && <>0(0)</>} <em onClick={() => e.event.rating.length === 0 && setSelectedEvent(e)} className="fa fa-star text-warning"></em>
                                    </button>
                                </div>
                            </div>

                            {/* {e.name}
                        {e.description}
                        {e.user?.firstName}
                        {e.user?.lastName}
                        {e.user?.lastName} */}
                        </div>
                    </li>
                </Fragment>)}
                {
                !isLoading && bookings?.length === 0 && <>No Event booking</>
            }
            </ul>
        </>
    )
}