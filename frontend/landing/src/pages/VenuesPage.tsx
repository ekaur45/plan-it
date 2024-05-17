import { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CONFIG from "../utils/config.util";
import VenueModel from "../models/venue/venue.model";
import { getRequest, postRequest } from "../utils/api.util";
import StorageUtil from "../utils/storage.util";
import { useHref, useNavigate } from "react-router-dom";
export default function VenuesPage() {
    const href = useHref({});
    const redirect = useNavigate();
    const [venues, setVenues] = useState<VenueModel[]>([]);
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
    const [selectedVenue, setSelectedVenue] = useState<VenueModel | null>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date());
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const getVenues = async () => {
        const result = await getRequest<VenueModel[]>("home/venues");
        if (result.status === 200) {
            setVenues(result.data);
        }
    }
    const checkIsLoggedIn =()=>{
        setIsLoggedIn(StorageUtil.isLoggedIn());
    }
    const handBookVenueSubmit = (e: VenueModel) => {
        setSelectedVenue(e);
        setIsModalVisible(true);
        checkIsLoggedIn();
    }

    const handleOnAddBooking = async () => {
        
        
        if(!isLoggedIn) return redirect("/auth/login?fallback="+href);
        const d = {};
        setIsSubmiting(true);
        const result = await postRequest<any>('/', d);
        setIsSubmiting(false);
        if (result.status === 200) {
            setSelectedVenue(null);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        getVenues()
    }, [])
    return (<Fragment>
        <section className="single_slider" style={{ height: "78px" }}>

        </section>
        <section>
            <div className="filter container pt-20">
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-light">Search</button>
                    </div>
                </div>
            </div>
        </section>
        <section className="container">
         <h3>Coming soon...</h3>
        </section>

        {/* <section className="container">
            <Modal show={isModalVisible}>
                <Modal.Header>
                    <b>{selectedVenue?.name}</b>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="">From</label>
                        <input type="text" name="" id="" className="form-control" value={selectedStartDate?.toDateString()} onChange={e => setSelectedStartDate(e.target.valueAsDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">To</label>
                        <input type="text" name="" id="" className="form-control" value={selectedEndDate?.toDateString()} onChange={e => setSelectedEndDate(e.target.valueAsDate)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-light" onClick={() => setIsModalVisible(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleOnAddBooking}>{!isLoggedIn?"Login to continue": isSubmiting ? "Saving..." : "Save"}</button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                {
                    venues && venues.length > 0 && venues.map((obj: VenueModel, ndx: number) => {
                        return (
                            <div key={obj._id} className="col-md-3 mb-3">
                                <div className="card">
                                <img onError={handleOnImageError} src={CONFIG.BaseUrl + obj.images[0].file} alt="" className="card-image" />
                                    <div className="card-body">
                                    <div className="d-flex w-100 justify-content-between">
                                        <b>Name:</b> <span>{obj.name}</span>
                                        
                                    </div>
                                    <div className="d-flex w-100 justify-content-between">
                                    <b>Location:</b> <span>{obj.location}</span>                                        
                                    </div>
                                    <div className="d-flex w-100 justify-content-between">
                                    <b>Price Per Head:</b> <span>{obj.price}</span>
                                        
                                    </div>
                                    <div className="d-flex w-100 justify-content-between">
                                    <b>Capacity:</b> <span>{obj.capacity}</span>
                                    </div>
                                    </div>
                                    <div className="mt-3">
                                        <button className="btn btn-primary btn-sm btn-block" onClick={e => handBookVenueSubmit(obj)}>
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    !(venues && venues.length > 0) &&<Fragment>
                        No Data
                    </Fragment>
                }
            </div>
        </section> */}
    </Fragment>);
}