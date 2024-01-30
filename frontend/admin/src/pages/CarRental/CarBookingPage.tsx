import { Fragment, useEffect, useState } from "react";
import CarBookingModel from "../../models/car/car-booking.model";
import { getRequest } from "../../utils/api.util";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

// Export a default function called CarBookingPage
export default function CarBookingPage() {
    // Create a state variable called bookings and set it to an empty array of type CarBookingModel
    const [bookings, setBookings] = useState<CarBookingModel[]>([]);
    // Create a state variable called isLoading and set it to false
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Create an async function called initialData
    const initialData = async () => {
        // Set isLoading to true
        setIsLoading(true);
        // Make a request to the server to get the bookings data
        const result = await getRequest<CarBookingModel[]>("car-rental/bookings");
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
    // Return a fragment containing either a loader or a table of bookings data
    return <Fragment>
        {isLoading && <Loader />}
        {!isLoading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <Link to={"/car-rental/add-booking"}>Add</Link>
            <table>
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
                    {bookings.map((booking: CarBookingModel,ndx:number) => <Fragment key={booking._id}>
                        <tr>
                            <td>
                                {ndx+1}
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
                                {booking.startDate.toDateString()}
                            </td>
                            <td>
                                {booking.endDate.toDateString()}
                            </td>
                            <td>
                                Actions
                            </td>
                        </tr>
                    </Fragment>)}
                </tbody>
            </table>
        </div>}
    </Fragment>
}