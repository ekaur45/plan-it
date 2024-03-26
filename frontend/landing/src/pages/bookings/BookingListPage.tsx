import { Fragment, useEffect, useState } from "react";
import { getRequest } from "../../utils/api.util";
import { Link, NavLink, Outlet } from "react-router-dom";
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
        //initialData();
    }, []);
    return (<> <section className="section featured-car" id="featured-car">
        <div className="container">
            <ul className="nav nav-tabs">
                <li className="nav-item"  role="tablist">
                    <NavLink to={"/bookings/car"} className={({ isActive }) => isActive == true? "nav-link active":"nav-link"}>Car</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/bookings/venue"} className={({ isActive }) => isActive == true? "nav-link active":"nav-link"}>Venue</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/bookings/decor"} className={({ isActive }) => isActive == true? "nav-link active":"nav-link"}>Decorator</NavLink>
                </li>
            </ul>
            <Outlet/>
        </div>
    </section></>)
}