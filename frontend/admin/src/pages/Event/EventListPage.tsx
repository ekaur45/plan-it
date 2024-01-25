import { Fragment, useEffect, useState } from "react";
import EventsModel from "../../models/event/events.model";
import { getRequest } from "../../utils/api.util";

export default function EventListPage() {
    const [events,setEvents] = useState<EventsModel[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const initialData = async ()=>{
        setIsLoading(true);
        const result = await getRequest<EventsModel[]>("event/events");        
        setIsLoading(false);
        if(result.status == 200){
            setEvents(result.data);
        }

    }
    useEffect(()=>{
        initialData();
    },[]);
    return(
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            {isLoading&&<>Loading...</>}
            {!isLoading && events.map((event:EventsModel)=><Fragment key={event._id}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5">
                            {event.name} {event.files&&event.files.length}
                        </div>
                    </div>
            </Fragment>)}
        </div>
    )
}