import { Fragment, useEffect, useState } from "react";
import EventsModel from "../../models/event/events.model";
import { deleteRequest, getRequest } from "../../utils/api.util";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";
import { FaBan, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import CONFIG from "../../utils/config.util";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function EventListPage() {
    const [events, setEvents] = useState<EventsModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        setIsLoading(true);
        const result = await getRequest<EventsModel[]>("event/events");
        setIsLoading(false);
        if (result.status == 200) {
            setEvents(result.data);
        }

    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    const handleOnDeleteEvent = async (_id: any) => {
        if (confirm("Are you sure you want to delete?")) {
            const result = await deleteRequest<any>('event/event-delete?id=' + _id);
            toast(result.message, { type: result.status == 200 ? "success" : "error" });
            if (result.status == 200) {
                initialData()
            }
        }
    }
    useEffect(() => {
        initialData();
    }, []);
    if (isLoading) return <Loader />
    if (events && events.length == 0) {
        return (
            <div className="rounded w-full border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col items-center w-full">
                    <span className="text-gray" style={{ fontSize: "8rem" }}>
                        <FaBan />
                    </span>
                    <span className="text-2xl font-medium">
                        No data
                    </span>
                    <span className="text-2xl">
                        <Link className="text-primary hover:underline" to={"/event/add-event"}>Add</Link> new record.
                    </span>
                </div>
            </div>
        );
    }
    return (

        <><div className="bg-white dark:bg-boxdark">
            <div className="flex items-center justify-between py-4 px-4 border-b border-[#eee]">
                <h4 className="text-xl font-semibold text-black dark:text-white">Your events</h4>
                <Link to={"/event/add-event"} className="hover:text-primary">Add</Link>
            </div>
            {isLoading && <Loader />}
            {
                !isLoading && <div className="grid grid-cols-1 gap-5 p-3 sm:grid-cols-4">
                    {
                        events && events.map((e: EventsModel) => {
                            return <div key={e._id} className="relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                                <div className="actions absolute right-3 top-3 z-10">
                                    <span className="text-danger cursor-pointer" onClick={() =>handleOnDeleteEvent(e._id)}>
                                        <FaTrashAlt />
                                    </span>
                                </div>
                                <div className="flex flex-col sm:grid-cols-2">
                                    <Carousel showArrows={true} showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={5000} className="h-165 c-carosel">

                                        {e.files.map((img, ndx) => <Fragment key={e._id + ndx}>
                                            <img src={CONFIG.BaseUrl + img} onError={handleOnImageError} alt="Image 1" />
                                        </Fragment>)}
                                    </Carousel>
                                    {/* <img src={CONFIG.BaseUrl + e.files[0]} alt="" className="mb-3" /> */}
                                    <div className="flex justify-between px-3">
                                        <b>
                                            Name:
                                        </b>
                                        <span>
                                            {e.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between px-3">
                                        <b>
                                            Price:
                                        </b>
                                        <span>
                                            {e.price}
                                        </span>
                                    </div>
                                    <div className="flex justify-between px-3">
                                        <p>
                                            {e.description}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        })
                    }
                </div>
            }
        </div>
        </> 
    )
}