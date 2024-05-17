import { FaUserAlt } from "react-icons/fa";
import CountCard from "./CountCard";

export default function CarRentalDashboard(props:any){
    const {total,bookings,pastBookings,futureBookings,earning} = props.data;
    return (
        <>
        Cars
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CountCard
                    count={total}
                    text = {"Total Cars"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={bookings}
                    text = {"Total bookings"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={futureBookings}
                    text = {"Active bookings"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={earning+" PKR"}
                    text = {"Earning"}
                    image={<FaUserAlt/>} />
            </div>
      </>)
}