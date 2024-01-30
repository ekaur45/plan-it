import { Fragment, useEffect, useState } from "react";
import VenueBookingModel from "../../models/venue/venue-booking.model";
import Loader from "../../common/Loader";
import { getRequest } from "../../utils/api.util";

export default function VenueBookingPage({ }) {
    const [venueBooking, setVenueBookings] = useState<VenueBookingModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        setIsLoading(true);
        const result = await getRequest<VenueBookingModel[]>("venues/venue-bookings");
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
            {!isLoading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Sr#
                            </th>
                            <th>
                                Venue
                            </th>
                            <th>
                                User
                            </th>
                            <th>
                                From
                            </th>
                            <th>
                                To
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    
                {
                    venueBooking && venueBooking.map((obj: VenueBookingModel,ndx:number) => <Fragment key={obj._id}>
                        <tr>
                            <td>
                                {ndx+1}
                            </td>
                            <td>
                                <span>{obj.venue.name} | {obj.venue.capacity}</span>
                                {obj.venue.price}
                            </td>
                            <td>
                                <span>{obj.user.firstName} {obj.user.lastName}</span>
                                {obj.user.email}
                            </td>
                            <td>
                                <span>{obj.bookingDate}</span>
                            </td>
                            <td>
                                <span>{obj.bookingEndDate}</span>
                            </td>
                            <td>
                                Actions
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