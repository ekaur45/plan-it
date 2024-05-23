import { Fragment, useEffect, useState } from "react";
import CarBookingModel from "../../models/car/car-booking.model";
import { getRequest } from "../../utils/api.util";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";
import moment from "moment";
import norecordImage from '../../images/no-record.svg';
import { FaBan } from "react-icons/fa";
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
        {!isLoading && <>

            {/* <div className="flex justify-end">
                <Link className="bg-primary border border-primary cursor-pointer hover:bg-opacity-90 px-4 py-2 rounded-lg text-white transition mb-2" to={"/car-rental/add-booking"}>Rent New Car</Link>
            </div> */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-graydark dark:text-gray-400 text-white text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr#
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Car
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                No. of days
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking: CarBookingModel, ndx: number) => <Fragment key={booking._id}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">
                                    {ndx + 1}
                                </td>
                                <td className="px-6 py-4">
                                    <span>{booking.car.name} {booking.car.model}</span>
                                    PKR - {booking.car.rent} /-
                                </td>
                                <td className="px-6 py-4 flex flex-col">
                                    <span>{booking.user.firstName} {booking.user.lastName}</span>
                                </td>
                                    <td>
                                    {booking.user.phoneNumber ?? "N/A"}
                                    </td>
                                <td className="px-6 py-4">
                                    {moment(booking.startDate).format("YYYY-MM-DD")}
                                </td>
                                {/* <td className="px-6 py-4">
                                    {moment(booking.endDate).format("YYYY-MM-DD")}
                                </td> */}
                                {/* <td className="px-6 py-4 flex gap-3 justify-center">
                                    Actions
                                </td> */}
                            </tr>
                        </Fragment>)}
                        {bookings.length == 0 && <tr>
                            <td colSpan={6} className="p-3">
                                <div className="flex flex-col items-center p-3 text-center w-full">

                                <span style={{fontSize:"64px"}}>
                                <FaBan/>
                                </span>
                                <span>No Record Found</span>
                                </div>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </>}
    </Fragment>
}