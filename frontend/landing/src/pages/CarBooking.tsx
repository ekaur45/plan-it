import { useParams, useSearchParams } from "react-router-dom";
import { getRequest, postRequest } from "../utils/api.util";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalSelector } from "../hooks";
export default function CarBookings() {
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [carDetails,setCarDetails] = useState<any>();
    const [disabledDates,setDisabledDate] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<any>();
    const [searchParams, setSearchParams] = useSearchParams();
    const {carid} = useParams();
    const getCarBookingSlots = async ()=>{
        const result = await getRequest<any>("car-rental/booking-slots?id="+carid );
        if(result.status == 200){
            setCarDetails(result.data);
            setDisabledDate(result.data.disabledDates);
        }
    }
    const handleOnAddBooking = async () => {
        if (!isLoggedIn) {
            return;
            //return redirect("/auth/login");
        }
        const d = { carId: carid, rentDate: startDate, returnDate: startDate };
        setIsSubmiting(true);
        const result = await postRequest<any>('/car-rental/rent-car', d);
        setIsSubmiting(false);
        if (result.status === 200) {
            getCarBookingSlots();
            setStartDate(null);
        }
    }
    useEffect(()=>{
        getCarBookingSlots();
    },[carid]);
    return (<>
        <article>
            <section className="section hero" id="home">
                <div className="container">
                    <div className="hero-content">
                        <h2 className="h1 hero-title"> TRANSFORMING YOUR VISION INTO STUNNING REALITY</h2>
                        <p className="hero-text">
                            Your Vision, Our Expertise !
                        </p>
                    </div>
                    <div className="hero-banner"></div>
                   
                </div>
            </section>
            <section className="section container">
                <DatePicker className="w-100"
                 selected={startDate} 
                 onChange={(date) => setStartDate(date)}
                 inline
                 startDate={new Date()}
                 minDate={new Date()}
                 excludeDates={disabledDates}
                 />
                 <button className="btn btn-primary" onClick={handleOnAddBooking}>{isSubmiting ? "Saving..." : "Save"}</button>
            </section>
        </article>
    </>);
}