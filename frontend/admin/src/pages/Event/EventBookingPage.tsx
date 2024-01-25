import { Fragment, useEffect, useState } from "react";
import EventBookingModel from "../../models/event/event-booking.model";
import { getRequest } from "../../utils/api.util";
import Loader from "../../common/Loader";

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
            {!isLoading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                {
                    eventBookings&&eventBookings.map((eb:EventBookingModel)=><Fragment key={eb._id}>{eb._id}</Fragment>)
                }
            </div>}
        </Fragment>
    )
}