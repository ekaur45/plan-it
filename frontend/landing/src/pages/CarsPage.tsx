import { useEffect, useState } from "react"
import { getRequest, postRequest } from "../utils/api.util";
import CarModel from "../models/cars.model";
import CONFIG from "../utils/config.util";
import { Modal } from "react-bootstrap";

export default function CarPage() {
    const [cars, setCars] = useState<CarModel[]>([]);
    const [selectedCar,setSelectedCar] = useState<CarModel>();
    const [selectedStartDate,setSelectedStartDate] = useState<Date | null>(new Date());
    const [selectedEndDate,setSelectedEndDate] = useState<Date | null>(new Date());
    const [isModalVisible,setIsModalVisible] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const getCars = async () => {
        const result = await getRequest<CarModel[]>("home/car-rentals");
        if (result.status === 200) {
            setCars(result.data);
            
        }
    }
    const handBookCarSubmit = (e:CarModel)=>{
        setSelectedCar(e);
        setIsModalVisible(true);
    }
    const handleOnAddBooking = async ()=>{
        const d = {carId:selectedCar?._id,rentDate:selectedStartDate,returnDate:selectedEndDate};
        setIsSubmiting(true);
        const result = await postRequest<any>('/car-rental/rent-car',d);
        setIsSubmiting(false);
        if(result.status === 200){
          setSelectedCar(new CarModel());
        }
    }
    useEffect(() => {
        getCars();
    }, []);
    return <>
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
                    {selectedCar?.name}
                    <div className="form-group">
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" className="form-control" value={selectedStartDate?.toDateString()} onChange={e=>setSelectedStartDate(e.target.valueAsDate)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" className="form-control" value={selectedEndDate?.toDateString()} onChange={e=>setSelectedEndDate(e.target.valueAsDate)}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleOnAddBooking}>{isSubmiting?"Saving...":"Save"}</button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                {
                    cars && cars.length > 0 && cars.map((car: CarModel, ndx: number) => <div key={car._id} className="col-md-3 mb-3"><div className="card">
                        <div className="card-body">
                            <img src={CONFIG.BaseUrl + car.images[0]} alt="" className="card-image" />
                            {car.name}
                            <br />
                            {car.model}
                            <br />
                            PKR - {car.rent}
                        </div>
                        <div className="">
                            <button className="btn btn-light btn-sm" onClick={e=>handBookCarSubmit(car)}>
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