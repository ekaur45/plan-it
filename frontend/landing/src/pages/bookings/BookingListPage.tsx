import { Fragment, useEffect, useState } from "react";
import { getRequest } from "../../utils/api.util";
import CarBookingModel from "../../models/car-booking.model";
import { Link } from "react-router-dom";
import MyBookingModel from "../../models/bookings/my-booking.model";
import moment from "moment";
import VenueBookingModel from "../../models/venue/venue-booking.model";

export default function BookingListPage() {
    const [bookings, setBookings] = useState<MyBookingModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        // Set isLoading to true
        setIsLoading(true);
        // Make a request to the server to get the bookings data
        const result = await getRequest<MyBookingModel>("home/bookings");
        // Set isLoading to false
        setIsLoading(false);
        // If the request returns a status of 200
        if (result.status == 200) {
            // Set the bookings state variable to the data returned from the request
            setBookings(result.data);
        }
    }
    // Use the useEffect hook to call the initialData function when the component is first mounted
    useEffect(() => {
        initialData();
    }, []);
    return (<Fragment>
        <section className="single_slider" style={{ height: "78px" }}>

        </section>
        <div className="container">
        {isLoading && <>Loading...</>}
        {!isLoading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <Link to={"/cars"}>Add</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Sr#
                        </th>
                        <th>
                            Car
                        </th>
                        <th>
                            User
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            No. of days
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Car Booking
                        </td>
                    </tr>
                    {bookings?.carBookings.map((booking: CarBookingModel, ndx: number) => <Fragment key={booking._id}>
                        <tr>
                            <td>
                                {ndx + 1}
                            </td>
                            <td>
                                <span>{booking.car.name} {booking.car.model}</span>
                                PKR - {booking.car.rent} /-
                            </td>
                            <td>
                                <span>{booking.user.firstName} {booking.user.lastName}</span>
                                {booking.user.phoneNumber}
                            </td>
                            <td>
                                {moment(booking.rentDate).format("YYYY-MM-DD")}
                            </td>
                            <td>
                                {moment(booking.returnDate).format("YYYY-MM-DD")}
                            </td>
                            <td>
                                Actions
                            </td>
                        </tr>
                    </Fragment>)}
                    <tr>
                        <td>
                            Venue Booking
                        </td>
                    </tr>
                    {(bookings?.venueBookings || bookings?.venueBookings.length == 0) && <>No Venue booking</>}
                    {bookings?.venueBookings.map((booking: VenueBookingModel, ndx: number) => <Fragment key={booking._id}>
                        <tr>
                            <td>
                                {ndx + 1}
                            </td>
                            <td>
                                <span>{booking.venue.name} {booking.venue.location}</span>
                                PKR - {booking.venue.price} /-
                            </td>
                            <td>
                                <span>{booking.user.firstName} {booking.user.lastName}</span>
                                {booking.user.phoneNumber}
                            </td>
                            <td>
                                {moment(booking.bookingDate).format("YYYY-MM-DD")}
                            </td>
                            <td>
                                {moment(booking.bookingEndDate).format("YYYY-MM-DD")}
                            </td>
                            <td>
                                Actions
                            </td>
                        </tr>
                    </Fragment>)}
                </tbody>
            </table>
        </div>}
        </div>
    </Fragment>)
}