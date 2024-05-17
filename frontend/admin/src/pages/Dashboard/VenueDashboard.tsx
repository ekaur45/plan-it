import { FaUserAlt } from "react-icons/fa";
import CountCard from "./CountCard";

export default function VenueDashboard(props:any){
    const {total,bookings,pastBookings,pendingBookings,earning} = props.data;
    return (
        <>
        Venue
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CountCard
                    count={total}
                    text = {"Total Venues"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={bookings}
                    text = {"Total bookings"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={pastBookings}
                    text = {"Done"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={pendingBookings}
                    text = {"Pending"}
                    image={<FaUserAlt/>} />
            </div>
      </>)
}