import { Fragment, useState } from "react"
import CarBookingModel from "../../models/car-booking.model"
import moment from "moment";
import StarRatings from "react-star-ratings";
import { useGlobalSelector } from "../../hooks";
import CarModel from "../../models/cars.model";
import { postRequest } from "../../utils/api.util";

type CarBookingComponentType = {
    bookings: CarBookingModel[]
    ratingChanged:()=>void
}
export default function CarBookingComponent(props: CarBookingComponentType) {
    const user = useGlobalSelector(state=>state.globalReducer.user);
    const [carBookings, setCarBookings] = useState(props.bookings);
    const handleOnRatingChange = async (e:number,booking:CarBookingModel)=>{
        const d = Object.freeze({userId:user._id,rating:e,carId:booking.car._id,bookingId:booking._id});
        await postRequest('home/add-car-rating',d);
        props.ratingChanged()
    }
    return (<Fragment>{carBookings.map((booking: CarBookingModel, ndx: number) => <Fragment key={booking._id}>
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
                {!(booking.rating && booking.rating.length>0) && <StarRatings
                    numberOfStars={5}
                    starRatedColor="#ffb800"
                    starDimension="25px"
                    changeRating={e => {handleOnRatingChange(e,booking); setCarBookings(d => [...carBookings]) }}
                    rating={Object.hasOwn(booking.car.rating,"rating")?0:0}
                    starHoverColor="#ffb800"
                />}
                {booking.rating&&Object.hasOwn(booking.rating,"length") && booking.rating.length>0 && <StarRatings
                    numberOfStars={5}
                    starRatedColor="#ffb800"
                    starDimension="25px"
                    starHoverColor="#ffb800"
                    rating={booking.rating.map(e=>e.rating).reduce((old,newV)=>old+newV,0) / booking.rating.length}
                />}
                Actions
            </td>
        </tr>
    </Fragment>)}
    </Fragment>
    )
}