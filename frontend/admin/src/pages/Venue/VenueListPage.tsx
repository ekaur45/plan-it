import VenueModel from "../../models/venue/venue.model";
import { getRequest } from "../../utils/api.util";
import { Fragment, useEffect, useState } from "react";
import CONFIG from "../../utils/config.util";
import { toast } from "react-toastify";
import { FaBan, FaTrashAlt } from "react-icons/fa";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from "react-router-dom";
function VenueImage(venue: any) {
    if (venue && venue.images && venue.images.length > 0) {
        return <><img src={CONFIG.BaseUrl + venue.images[0]} /></>
    }
    return <>No Image</>
}
export default function VenueListPage() {
    const [venues, setVenues] = useState<VenueModel[]>([]);
    const handleFetchInitialData = async () => {
        // need to implement backend
        const result = await getRequest<VenueModel[]>('venue/venues');
        if (result && result.data && Array.isArray(result.data)) {
            setVenues(result.data);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    const deleteVenue = async (_id: string) => {
        const result = await getRequest<any>('venue/delete-venue?id=' + _id);
        toast(result.message, { type: result.status == 200 ? "success" : "error" });
        if (result.status == 200) {
            handleFetchInitialData()
        }
    }
    useEffect(() => {
        handleFetchInitialData();
    }, [])
    if (venues && venues.length == 0) {
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
                    <Link className="text-primary hover:underline" to={"/venue/add-venue"}>Add</Link> new record.
                    </span>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="p-3 bg-white dark:bg-boxdark">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Your venues</h4>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                    
                    {venues.map((e: VenueModel, i: number) => <div key={i} className="relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                        <div className="actions absolute right-3 top-3 z-10">
                            <span className="text-danger cursor-pointer" onClick={() => deleteVenue(e._id)}>
                                <FaTrashAlt />
                            </span>
                        </div>
                        <div className="flex flex-col sm:grid-cols-2">
                            <Carousel showArrows={true} showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={5000} className="h-165 c-carosel">

                                {e.images.map((img, ndx) => <Fragment key={e._id + ndx}>
                                    <img src={CONFIG.BaseUrl + img.file} onError={handleOnImageError} alt="Image 1" />
                                </Fragment>)}
                            </Carousel>
                            {/* <img src={CONFIG.BaseUrl + e.images[0].file} alt="" onError={handleOnImageError} className="mb-3" style={{maxHeight:"200px"}} /> */}
                            <div className="flex justify-between px-3">
                                <b>
                                    Name:
                                </b>
                                {e.name}
                            </div>
                            <div className="flex justify-between px-3">
                                <b><em className="fa fa-location"></em>Location:</b>
                                {e.location}
                            </div>
                            <div className="flex justify-between px-3">
                                <b>Capacity:</b>
                                {e.capacity}
                            </div>
                            <div className="flex justify-between px-3">
                                <b>Price per head</b>
                                {e.price ?? "-"}
                            </div>

                            <p className="mb-3  px-3">
                                {e.description}
                            </p>
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    )
}