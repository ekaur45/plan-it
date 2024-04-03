import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../../utils/api.util";

export default function EventBookingComments() {
    const { id } = useParams();
    const [comments, setComments] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const getComments = async () => {
        const result = await getRequest<any[]>("venue/venue-comments?id=" + id);
        if (result.status == 200) {
            setComments(result.data);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        getComments();
    }, [id])
    return (<>
        <div className="position-fixed top-0 right-0 w-25 z-10 bg-light shadow-lg h-100vh">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <strong>Comments</strong>
                    <Link to={"/bookings/decor"} className="btn btn-default">
                        <em className="fa fa-window-close"></em>
                    </Link>
                </div>
                <div className="card-body">
                    <ul></ul></div>
            </div>
        </div>
    </>
    )
}