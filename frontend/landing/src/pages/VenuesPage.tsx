import { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CONFIG from "../utils/config.util";
import VenueModel from "../models/venue/venue.model";
import { getRequest, postRequest } from "../utils/api.util";
export default function VenuesPage() {
    const [venues, setVenues] = useState<VenueModel[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<VenueModel | null>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date());
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const getVenues = async () => {
        const result = await getRequest<VenueModel[]>("home/venues");
        if (result.status === 200) {
            setVenues(result.data);
            setIsModalVisible(true);
        }
    }
    const handBookVenueSubmit = (e: VenueModel) => {
        setSelectedVenue(e);
        setIsModalVisible(true);
    }

    const handleOnAddBooking = async () => {
        const d = {};
        setIsSubmiting(true);
        const result = await postRequest<any>('/', d);
        setIsSubmiting(false);
        if (result.status === 200) {
            setSelectedVenue(null);
        }
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
            <Modal show={isModalVisible}>
                <Modal.Body>
                    {selectedVenue?.name}
                    <div className="form-group">
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" className="form-control" value={selectedStartDate?.toDateString()} onChange={e => setSelectedStartDate(e.target.valueAsDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" className="form-control" value={selectedEndDate?.toDateString()} onChange={e => setSelectedEndDate(e.target.valueAsDate)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleOnAddBooking}>{isSubmiting ? "Saving..." : "Save"}</button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                {
                    venues && venues.length > 0 && venues.map((obj: VenueModel, ndx: number) => {
                        return (
                            <div key={obj._id} className="col-md-3 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <img src={CONFIG.BaseUrl + obj.images[0]} alt="" className="card-image" />
                                        {obj.name}
                                        <br />
                                        {obj.location}
                                        <br />
                                        PKR - {obj.price}
                                    </div>
                                    <div className="">
                                        <button className="btn btn-light btn-sm" onClick={e => handBookVenueSubmit(obj)}>
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    </Fragment>);
}