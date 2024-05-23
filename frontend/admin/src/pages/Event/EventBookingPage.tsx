import { Fragment, useEffect, useState } from "react";
import EventBookingModel from "../../models/event/event-booking.model";
import { getRequest } from "../../utils/api.util";
import Loader from "../../common/Loader";
import moment from "moment";

export default function EventBookingPage({ }) {
    const [eventBookings, setEventBookings] = useState<EventBookingModel[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        
        setIsLoading(true);
        const result = await getRequest<EventBookingModel[]>("event/event-bookings");
        setIsLoading(false);
        if (result.status == 200) {
            setEventBookings(result.data);
        }
    }
    useEffect(() => {
        initialData();
    }, []);
    return (
        <Fragment>
            {isLoading && <Loader />}
            {!isLoading && <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-graydark dark:text-gray-400 text-white text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr#
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Booking date
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            eventBookings && eventBookings.map((eb: EventBookingModel, ndx: number) => <tr key={eb._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">
                                    {ndx + 1}
                                </td>
                                <td className="px-6 py-4 flex flex-col">
                                    <span>
                                    {eb.event?.name} 
                                    </span>
                                    <b>
                                        {eb.event.price} PKR/-
                                        </b>
                                </td>
                                <td className="px-6 py-4">
                                    {eb.user.firstName} {eb.user.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {eb.user.phoneNumber ?? "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(eb.bookingDate).format("MM/DD/YYYY")}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            }
        </Fragment>
    )
}