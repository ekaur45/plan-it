import { useEffect, useState } from "react"
import { getRequest, postRequest } from "../utils/api.util";
import CarModel from "../models/cars.model";
import CONFIG from "../utils/config.util";
import { Modal } from "react-bootstrap";
import './car-page.css';
import { Link, useNavigate } from "react-router-dom";
import StorageUtil from "../utils/storage.util";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import { showGlobalLogin } from "../stores/reducers/global-reducer";
export default function CarPage() {
    const isGlobalLoginVisible = useGlobalSelector((state) => state.globalReducer.isGlobalLoginVisible);
    const isLoggedIn = useGlobalSelector((state) => state.globalReducer.isLoggedIn);
    const dispatch = useGlobalDispatch();
    const [cars, setCars] = useState<CarModel[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarModel>();
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date());
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const getCars = async () => {
        const result = await getRequest<CarModel[]>("home/car-rentals");
        if (result.status === 200) {
            setCars(result.data);

        }
    }
    
    const handBookCarSubmit = (e: CarModel) => {
        setSelectedCar(e);
        setIsModalVisible(true);
        if (!isLoggedIn) {
            dispatch(showGlobalLogin());
        }
    }
    const handleOnAddBooking = async () => {
        if (!isLoggedIn) {
            return;
            //return redirect("/auth/login");
        }
        const d = { carId: selectedCar?._id, rentDate: selectedStartDate, returnDate: selectedEndDate };
        setIsSubmiting(true);
        const result = await postRequest<any>('/car-rental/rent-car', d);
        setIsSubmiting(false);
        if (result.status === 200) {
            setSelectedCar(new CarModel());
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    const handleOnSearchSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();        
        
    }
    useEffect(() => {
        getCars();
    }, []);
    return <>
        <section className="single_slider" style={{ height: "78px" }}>

        </section>
        <section>
            <div className="filter container pt-20">
                <form className="d-flex mb-3 w-100" style={{ "gap": "15px" }} onSubmit={handleOnSearchSubmit}>
                    <input type="text" placeholder="Search by name" className="form-control" name="name" />
                    <input type="number" placeholder="Min. Price" className="form-control" name="minPrice"/>
                    <input type="number" placeholder="Max. Price" className="form-control" name="maxPrice"/>
                    <input type="number" placeholder="Model Year" className="form-control" name="modelYear"/>
                    <button className="btn btn-outline-primary">Search</button>
                </form>
            </div>
        </section>
        <section className="container">
            <Modal show={isModalVisible && isLoggedIn && !isGlobalLoginVisible}>
                <Modal.Header>
                    <h3>
                        Book a car
                    </h3>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label htmlFor="">From date</label>
                        <input type="text" name="" id="" className="form-control" value={selectedStartDate?.toDateString()} onChange={e => setSelectedStartDate(e.target.valueAsDate)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">To date</label>
                        <input type="text" name="" id="" className="form-control" value={selectedEndDate?.toDateString()} onChange={e => setSelectedEndDate(e.target.valueAsDate)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={() => setIsModalVisible(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleOnAddBooking}>{!isLoggedIn ? "Login to continue" : isSubmiting ? "Saving..." : "Save"}</button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                {
                    cars && cars.length > 0 && cars.map((car: CarModel, ndx: number) => <div key={car._id} className="col-md-3 mb-3">
                        <div className="card">
                            <img onError={handleOnImageError} src={CONFIG.BaseUrl + car.images[0].file} alt="" className="card-image" />
                            <div className="card-body">
                                <div className="d-flex w-100 justify-content-between">
                                    <b>Car: </b><span>{car.name}</span>
                                </div>
                                <div className="d-flex w-100 justify-content-between">
                                    <b>Model: </b> <span>{car.model}</span>
                                </div>
                                <div className="d-flex w-100 justify-content-between">
                                    <b>Price/day: </b><span>PKR - {car.rent}</span>
                                </div>
                                <p>
                                    {car.description}
                                </p>
                            </div>
                            <div className="mt-3">
                                <button className="btn btn-primary btn-sm btn-block" onClick={e => handBookCarSubmit(car)}>
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section>
    </>
}