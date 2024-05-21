import { FaUserAlt } from "react-icons/fa";
import CountCard from "./CountCard";

export default function AdminDashboard(props:any) {
    return (
        <>
            Admin
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CountCard
                    count={props.data?.total}
                    text={"Total users"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={props.data?.rents}
                    text = {"Car Rentals"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={props.data?.decors}
                    text={"Decors"}
                    image={<FaUserAlt/>} />
                <CountCard
                    count={props.data?.venue}
                    text={"Venues"}
                    image={<FaUserAlt className="text-blue"/>} />
            </div>
        </>)
}