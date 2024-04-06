import { Fragment, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/api.util"
import CONFIG from "../utils/config.util";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import { showGlobalLogin } from "../stores/reducers/global-reducer";
export default function DecoratorsPage() {
    const isGlobalLoginVisible = useGlobalSelector<any>((state) => state.globalReducer.isGlobalLoginVisible);
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const dispatch = useGlobalDispatch();
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
    const [isBookingModalVisible, setIsBookingModalVisible] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [disabledDates, setDisabledDate] = useState<any[]>([]);

    const getInitData = async () => {
        const result = await getRequest<any[]>("home/decorations");
        if (result.status === 200) {
            setEvents(result.data);
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
        const d = { decoratorId: selectedEvent?._id, bookingDate: selectedStartDate, bookingEndDate: selectedStartDate };
        setIsSubmiting(true);
        const result = await postRequest<any>('event/book-event', d);
        setIsSubmiting(false);
        if (result.status === 200) {
            setIsBookingModalVisible(false);
            setSelectedEvent(null);
            setSelectedStartDate(null);
        }
    }
    const getEventBookingSlots = async (id:any)=>{
        const result = await getRequest<any>("event/booking-slots/"+id);
        if(result.status == 200){
            setDisabledDate(result.data["disabledDates"]);
        }
    }
    const handleEventBookSubmit = (e: any) => {
        setSelectedEvent(e);
        if (!isLoggedIn) {
            return dispatch(showGlobalLogin());
        }
        setIsBookingModalVisible(true);
        getEventBookingSlots(e._id);
        
    }
    const handleOnEventSearch = async (e:any) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget) as any;
        const queryParams = (new URLSearchParams(formData)).toString();
        const result = await getRequest<any[]>("home/decorations?"+queryParams);
        if (result.status === 200) {
            setEvents(result.data);
        }
    }
    useEffect(() => {
        getInitData();
    }, []);
    return (<article>
        <section className="section hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <h2 className="h1 hero-title">The easy way to takeover a lease</h2>
                    <p className="hero-text">
                        Live in Pakistan!
                    </p>
                </div>
                <div className="hero-banner-decoration"></div>
                <form className="hero-form" style={{"gridTemplateColumns":"1fr 1fr 0.8fr"}} onSubmit={handleOnEventSearch}>
                    <div className="input-wrapper">
                        <label htmlFor="input-1" className="input-label">Type</label>
                        <input type="search" name="name" id="input-1" className="input-field"
                            placeholder="What are you looking for?" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="input-2" className="input-label">Payment (min)</label>
                        <input type="search" name="monthlyPay" id="input-2" className="input-field" placeholder="Add an amount in PKR" />
                    </div>

                    {/* <div className="input-wrapper">
                        <label htmlFor="input-3" className="input-label">Payment (max)</label>
                        <input type="text" name="year" id="input-3" className="input-field" placeholder="Add an amount in PKR" />
                    </div> */}
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </div>
        </section>
        <section className="section featured-car" id="featured-car">
            <Modal show={isBookingModalVisible && !isGlobalLoginVisible}>
                <Modal.Header>
                    <div>
                        Book <strong>{selectedEvent?.name}</strong>
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
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={() => setIsBookingModalVisible(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleOnAddBooking}>{!isLoggedIn ? "Login to continue" : isSubmiting ? "Saving..." : "Save"}</button>
                </Modal.Footer>
            </Modal>
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Decorators</h2>
                </div>
                <ul className="featured-car-list">
                    {events && events.length > 0 && events.map((e, i) => <Fragment key={e._id}>
                        <li>
                            <div className="featured-car-card">
                                <figure className="card-banner">
                                    <img onError={handleOnImageError} src={CONFIG.BaseUrl + e.files[0]} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                        className="w-100" />
                                </figure>
                                <div className="card-content">

                                    <div className="card-title-wrapper">
                                        <h3 className="h3 card-title">
                                            {e.name}
                                        </h3>
                                    </div>

                                    <ul className="card-list">


                                    </ul>
                                    <p className="card-list-item multiline-overflow-ellipsis" style={{ display: "-webkit-box" }}>
                                        {e.description}
                                    </p>
                                    <div className="card-price-wrapper">
                                        <p className="card-price">
                                            <strong>{e.price}</strong> PKR / month
                                        </p>
                                        <button className="btn btn-outline-primary" onClick={c => handleEventBookSubmit(e)}>Rent now</button>
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
                </ul>
            </div>
        </section>
    </article>);
}