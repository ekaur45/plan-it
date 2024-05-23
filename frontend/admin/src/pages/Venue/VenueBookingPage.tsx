import { Fragment, useEffect, useState } from "react";
import VenueBookingModel from "../../models/venue/venue-booking.model";
import Loader from "../../common/Loader";
import { getRequest } from "../../utils/api.util";
import moment from "moment";

export default function VenueBookingPage({ }) {
    const [venueBooking, setVenueBookings] = useState<VenueBookingModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        setIsLoading(true);
        const result = await getRequest<VenueBookingModel[]>("venue/my-bookings");
        setIsLoading(false);
        if(result.status == 200){
            setVenueBookings(result.data);
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
                                Venue
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
                    venueBooking && venueBooking.map((obj: VenueBookingModel,ndx:number) => <Fragment key={obj._id}>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">
                                {ndx+1}
                            </td>
                            <td className="px-6 py-4">
                                <span>{obj.venue.name} | {obj.venue.capacity}</span>
                                <br /> <b>{obj.venue.price} PKR/-</b> 
                            </td>
                            <td className="px-6 py-4">
                                <span>{obj.user.firstName} {obj.user.lastName}</span>
                            </td>
                            <td className="px-6 py-4">
                                {obj.user.phoneNumber}
                            </td>
                            <td className="px-6 py-4">
                                <span>{moment(obj.bookingDate).format("MM/DD/YYYY")}</span>
                            </td>   
                        </tr>
                    </Fragment>)
                }
                </tbody>
                </table>
            </div>}
        </Fragment>
    )
}