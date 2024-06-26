import { useEffect, useState } from "react";
import VenueModel from "../models/venue/venue.model";
import { getRequest, postRequest } from "../utils/api.util";
import CONFIG from "../utils/config.util";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import { showGlobalLogin } from "../stores/reducers/global-reducer";

export default function Venues() {
    const isGlobalLoginVisible = useGlobalSelector<any>((state) => state.globalReducer.isGlobalLoginVisible);
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const dispatch = useGlobalDispatch();
    const [venues, setVenues] = useState<VenueModel[]>([]);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date());
    const [disabledDates, setDisabledDate] = useState<any[]>([]);
    const [isBookingModalVisible, setIsBookingModalVisible] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [selectedVenue, setSelectedVenue] = useState<any>(null);
    const [venueDetails, setVenueDetails] = useState<any>(null);
    const getVenues = async () => {
        const result = await getRequest<VenueModel[]>("home/venues");
        if (result.status === 200) {
            setVenues(result.data);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    const handleOnAddBooking = async (e: any) => {
        if (!isLoggedIn) {
            return;
            //return redirect("/auth/login");
        }
        const d = { venueId: selectedVenue?._id, bookingDate: selectedStartDate, bookingEndDate: selectedEndDate };
        setIsSubmiting(true);
        const result = await postRequest<any>('/venue/book-venue', d);
        setIsSubmiting(false);
        if (result.status === 200) {
            setIsBookingModalVisible(false);
            setSelectedVenue(null);
            setSelectedStartDate(new Date());
        }
    }
    const getVenueBookingSlots = async (id:any)=>{
        const result = await getRequest<any>("venue/booking-slots/"+id );
        if(result.status == 200){
            setVenueDetails(result.data);
            setDisabledDate(result.data.disabledDates);
        }
    }
    const handleVenueBookSubmit = (e: any) => {
        if (!isLoggedIn) {
            return dispatch(showGlobalLogin());
        }
        setIsBookingModalVisible(true);
        setSelectedVenue(e);
        getVenueBookingSlots(e._id);
    }
    const handleOnVenueSearch = async (e:any)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget) as any;
        const queryParams = (new URLSearchParams(formData)).toString();
        const result = await getRequest<VenueModel[]>("home/venues?"+queryParams);
        if (result.status === 200) {
            setVenues(result.data);
        }
    }
    useEffect(() => {
        getVenues()
    }, [])
    return (<article>
        <section className="section hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <h2 className="h1 hero-title"> TRANSFORMING YOUR VISION INTO STUNNING REALITY</h2>
                    <p className="hero-text">
                        Your Vision, Our Expertise !
                    </p>
                </div>
                <div className="hero-banner-venue"></div>
                <form noValidate onSubmit={handleOnVenueSearch} className="hero-form">
                    <div className="input-wrapper">
                        <label htmlFor="input-1" className="input-label">Venue, location</label>
                        <input type="search" name="name" id="input-1" className="input-field"
                            placeholder="What venue are you looking?" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="input-2" className="input-label">Per head(min)</label>
                        <input type="search" name="monthlyPay" id="input-2" className="input-field" placeholder="Add an amount in PKR" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="input-3" className="input-label">Capacity</label>
                        <input type="search" name="capacity" id="input-3" className="input-field" placeholder="Add no. of Guests" />
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>
        </section>
        <section className="section featured-car" id="featured-car">
            <Modal show={isBookingModalVisible && !isGlobalLoginVisible}>
                <Modal.Header>
                    <div>
                        Book <strong>{selectedVenue?.name}</strong>
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label htmlFor="">From date</label>
                        {/* <input type="text" name="" id="" className="form-control" value={selectedStartDate?.toDateString()} onChange={e => setSelectedStartDate(e.target.valueAsDate)} /> */}
                        <ReactDatePicker className="w-100"
                            selected={selectedStartDate}
                            onChange={(date: Date) => setSelectedStartDate(date)}
                            startDate={new Date()}
                            minDate={new Date()}
                            excludeDates={disabledDates}
                        />
                    </div>
                    {/* <div className="form-group">
    <label htmlFor="">To date</label>
    <input type="text" name="" id="" className="form-control" value={selectedEndDate?.toDateString()} onChange={e => setSelectedEndDate(e.target.valueAsDate)} />
</div> */}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={() => setIsBookingModalVisible(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleOnAddBooking}>{!isLoggedIn ? "Login to continue" : isSubmiting ? "Saving..." : "Save"}</button>
                </Modal.Footer>
            </Modal>
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Venues</h2>
                </div>
                <ul className="featured-car-list">
                    {venues && venues.length === 0 &&<>No Venues Found</>}
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
                                            <a>{venue.name}</a>
                                        </h3>
                                    </div>

                                    <ul className="card-list">

                                        <li className="card-list-item">
                                            <em className="fa fa-users"></em>
                                            <span className="card-item-text">{venue.capacity} People</span>
                                        </li>

                                        <li className="card-list-item">
                                            {/* <ion-icon name="flash-outline"></ion-icon> */}
                                            <em className="fa fa-location"></em>
                                            <span className="card-item-text">{venue.location}</span>
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
                                        {venue.description}
                                    </div>
                                    <div className="card-price-wrapper">
                                        <p className="card-price">
                                            <strong>{venue.price}</strong> PKR / Person
                                        </p>

                                        <button className="btn btn-outline-primary" onClick={() => handleVenueBookSubmit(venue)}>Rent now</button>
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