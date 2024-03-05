import VenueModel from "../../models/venue/venue.model";
import { getRequest } from "../../utils/api.util";
import { useEffect, useState } from "react";
import CONFIG from "../../utils/config.util";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
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
    const deleteVenue = async (_id:string)=>{
        const result = await getRequest<any>('venue/delete-venue?id='+_id);
        toast(result.message,{type:result.status == 200 ?"success":"error"});
        if (result.status == 200) {
            handleFetchInitialData()
        }
    }
    useEffect(() => {
        handleFetchInitialData();
    }, [])
    return (
        <>
            <div className="p-3 bg-white dark:bg-boxdark">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Your venues</h4>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                    {venues.length == 0 &&<>No data</>}
                    {venues.map((e: VenueModel, i: number) => <div key={i} className="relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                    <div className="actions absolute right-3 top-3">
                                    <span className="text-danger cursor-pointer" onClick={()=>deleteVenue(e._id)}>
                                        <FaTrashAlt/>
                                    </span>
                                </div>
                        <div className="flex flex-col sm:grid-cols-2">
                            <img src={CONFIG.BaseUrl + e.images[0].file} alt="" onError={handleOnImageError} className="mb-3" style={{maxHeight:"200px"}} />
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