import { useEffect, useState } from "react"
import { getRequest } from "../utils/api.util";
import CarModel from "../models/cars.model";
import CONFIG from "../utils/config.util";

export default function CarPage() {
    const [cars, setCars] = useState<CarModel[]>([]);
    const getCars = async () => {
        const result = await getRequest<CarModel[]>("home/car-rentals");
        if (result.status === 200) {
            setCars(result.data);
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
                            <button className="btn btn-light btn-sm">
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