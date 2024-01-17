import { getRequest } from "../../utils/api.util";
import { useEffect, useState } from "react";
export default function VenueListPage() {
    const [venues,setVenues] = useState([]);
    const handleFetchInitialData = async ()=>{
        const result = await getRequest<any>('venue/venues');
        if(result&&result.data && Array.isArray(result.data)){
            setVenues(result.data);
        }
    }
    useEffect(()=>{
        handleFetchInitialData();
    },[])
    return(
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        {
            venues.map((e: any, i: number) => {
                return <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5">
                        {e.name} {e.location} {e.capacity}
                    </div>
                </div>
            })
        }
    </div>
    )
}