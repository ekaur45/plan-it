import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/api.util";
import CarModel from "../models/cars.model";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import CONFIG from "../utils/config.util";
import { showGlobalLogin } from "../stores/reducers/global-reducer";
import { Modal } from "react-bootstrap";
export default function CarsPage() {
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
            setIsModalVisible(false);
            setSelectedCar(new CarModel());
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        getCars();
    }, []);
    return (<>
        <article>
            <section className="section hero" id="home">
                <div className="container">
                    <div className="hero-content">
                        <h2 className="h1 hero-title">The easy way to takeover a lease</h2>
                        <p className="hero-text">
                            Live in Pakistan!
                        </p>
                    </div>
                    <div className="hero-banner"></div>
                    <form action="" className="hero-form">
                        <div className="input-wrapper">
                            <label htmlFor="input-1" className="input-label">Car, model, or brand</label>
                            <input type="text" name="car-model" id="input-1" className="input-field"
                                placeholder="What car are you looking?" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="input-2" className="input-label">Max. monthly payment</label>
                            <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in $" />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="input-3" className="input-label">Make Year</label>
                            <input type="text" name="year" id="input-3" className="input-field" placeholder="Add a minimal make year" />
                        </div>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
            </section>
            <section className="section featured-car" id="featured-car">
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
                <div className="container">
                    <div className="title-wrapper">
                        <h2 className="h2 section-title">Featured cars</h2>
                        <a href="/" className="featured-car-link">
                            <span>View more</span>
                            <em className="fa fa-arrow-right"></em>
                        </a>
                    </div>
                    <ul className="featured-car-list">
                        {
                            cars && cars.length > 0 && cars.map((car: CarModel, ndx: number) => <li key={ndx}>
                                <div className="featured-car-card">

                                    <figure className="card-banner">
                                        <img onError={handleOnImageError} src={CONFIG.BaseUrl + car.images[0].file} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                            className="w-100" />
                                    </figure>

                                    <div className="card-content">

                                        <div className="card-title-wrapper">
                                            <h3 className="h3 card-title">
                                                {car.name}
                                            </h3>

                                            <data className="year" value="2021">{car.model}</data>
                                        </div>

                                        <ul className="card-list">

                                            <li className="card-list-item">
                                                <em className="fa fa-users"></em>
                                                <span className="card-item-text">4 People</span>
                                            </li>

                                            <li className="card-list-item">
                                                <em className="fa fa-bolt"></em>
                                                <span className="card-item-text">Hybrid</span>
                                            </li>

                                            <li className="card-list-item">
                                                <em className="fa fa-tachometer"></em>
                                                <span className="card-item-text">6.1km / 1-litre</span>
                                            </li>

                                            <li className="card-list-item">
                                                <em className="fa fa-microchip"></em>
                                                <span className="card-item-text">Automatic</span>
                                            </li>
                                            <li className="card-list-item">
                                                {car.description}
                                            </li>
                                        </ul>
                                        <div className="card-price-wrapper">
                                            <p className="card-price">
                                                <strong>{car.rent}</strong> / month
                                            </p>
                                            <button className="btn btn-outline-primary" onClick={e => handBookCarSubmit(car)}>Rent now</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            )}
                    </ul>
                </div>
            </section>
        </article>
    </>
    )
}