import VenueModel from "../../models/venue/venue.model";
import { getRequest } from "../../utils/api.util";
import { useEffect, useState } from "react";
export default function VenueListPage() {
    const [venues, setVenues] = useState<VenueModel[]>([]);
    const handleFetchInitialData = async () => {
        // need to implement backend
        const result = await getRequest<VenueModel[]>('venue/venues');
        if (result && result.data && Array.isArray(result.data)) {
            setVenues(result.data);
        }
    }
    useEffect(() => {
        handleFetchInitialData();
    }, [])
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <table>
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        venues.map((e: VenueModel, i: number) => {
                            return <tr>
                                <td>{i+1}</td>
                                <td>{e.images[0]}</td>
                                <td>{e.name}</td>
                                <td>{e.location}</td>
                                <td>{e.capacity}</td>
                                <td>{e.price}</td>
                                <td>Actions</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}