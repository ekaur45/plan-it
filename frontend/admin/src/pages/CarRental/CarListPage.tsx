import { useEffect, useState } from "react";
import CarModel from "../../models/car/car.model";
import Loader from "../../common/Loader";
import { getRequest } from "../../utils/api.util";
import { Link } from "react-router-dom";
import { FaBan } from "react-icons/fa";

export default function CarListPage() {
    const [cars, setCars] = useState<CarModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialData = async () => {
        setIsLoading(true)
        const result = await getRequest<CarModel[]>('car-rental/all-cars');
        setIsLoading(false);
        if (result.status == 200) {
            setCars(result.data);
        }
    }
    useEffect(() => {
        initialData();
    }, []);
    if (isLoading) return <Loader />
    if (cars && cars.length == 0) {
        return (
            <div className="rounded w-full border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col items-center w-full">
<span className="text-gray" style={{fontSize:"8rem"}}>
<FaBan/>
</span>
                    <span className="text-2xl font-medium">
                        No data
                    </span>
                    <span className="text-2xl">
                        <Link className="text-primary hover:underline" to={"/car-rental/add-car"}>Add</Link> new record.
                    </span>
                </div>
            </div>
        );
    }
    return (<>
        {isLoading && <Loader />}
        {
            !isLoading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                {
                    cars && cars.length > 0 && cars.map((e: CarModel, i: number) => {
                        return <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5">
                                {e.name} {e.model} {e.color} - PKR {e.rent}
                            </div>
                        </div>
                    })
                }
            </div>
        }
    </>
    )
}