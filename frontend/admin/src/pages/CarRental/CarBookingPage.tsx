import { Fragment, useEffect, useState } from "react";
import CarBookingModel from "../../models/car/car-booking.model";
import { getRequest } from "../../utils/api.util";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

export default function CarBookingPage() {
    const [bookings, setBookings] = useState<CarBookingModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        setIsLoading(true);
        const result = await getRequest<CarBookingModel[]>("car/bookings");
        setIsLoading(false);
        if (result.status == 200) {
            setBookings(result.data);
        }
    }
    useEffect(() => {
        initialData();
    }, []);
    return <Fragment>
        {isLoading && <Loader />}
        {!isLoading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <Link to={"/car-rental/add-booking"}>Add</Link>
            {bookings.map((booking: CarBookingModel) => <Fragment key={booking._id}>
                {booking._id}
            </Fragment>)}
        </div>}
    </Fragment>
}