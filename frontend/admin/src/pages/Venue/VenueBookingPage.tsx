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
                {
                    venueBooking && venueBooking.map((obj: VenueBookingModel) => <Fragment key={obj._id}>
                        {obj._id}
                    </Fragment>)
                }
            </div>}
        </Fragment>
    )
}