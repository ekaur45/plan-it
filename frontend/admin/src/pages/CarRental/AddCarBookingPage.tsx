import React, { Fragment, useEffect, useState } from "react"
import CarModel from "../../models/car/car.model";
import { getRequest, postRequest } from "../../utils/api.util";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import moment from "moment";

export default function AddCarBookingPage() {
  const [cars, setCars] = useState<CarModel[]>([]);
  const [selectedCar, setSelectedCars] = useState<CarModel>(new CarModel());
  const [selectedStartDate,setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate,setSelectedEndDate] = useState<Date>(new Date());
  const [numberOfDays,setNumberOfDays] = useState<number>(1);
  const [isLoadingCar, setIsLoadingCar] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const getCars = async () => {
    setIsLoadingCar(true);
    const result = await getRequest<CarModel[]>("car-rental/all-cars");
    setIsLoadingCar(false);
    if (result.status == 200) {
      result.data = [{ name: "Select car", _id: "", color: "", images: [], model: "", rent: 0 }, ...result.data];
      setCars(result.data);
      if (result.data.length > 0)
        setSelectedCars(result.data[0]);
    }
  }
  const handleOnFormSubmit = async (e:React.SyntheticEvent<HTMLFormElement>)=>{
    e.preventDefault();
    e.stopPropagation();
    const d = {carId:selectedCar._id,rentDate:selectedStartDate,returnDate:selectedEndDate,numberOfDays};
    setIsSubmiting(true);
    const result = await postRequest<any>('/car-rental/rent-car',d);
    setIsSubmiting(false);
    if(result.status == 200){
      
    }
  }
  useEffect(() => {
    getCars();
  }, [])
  return (<div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
    <div className="flex flex-col gap-9">
      <form className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      onSubmit={handleOnFormSubmit}
      noValidate
      >
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Book Car
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5 pb-0">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Car
            </label>
            <Listbox
              onChange={setSelectedCars}
              value={selectedCar}
              disabled={isLoadingCar}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm py-3 px-5">
                  <span className="block truncate">
                    {selectedCar._id == "" ? selectedCar.name : `${selectedCar.name} ${selectedCar.model} - PKR ${selectedCar.rent}`}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {cars.map((car, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={car}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {car._id == "" ? car.name : `${car.name} ${car.model} - PKR ${car.rent}`}

                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>

              </div>
            </Listbox>
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              From
            </label>
            <input
              type="date"
              placeholder="date"
              value={moment(selectedStartDate).format("YYYY-MM-DD")}              
              onChange={e=>setSelectedStartDate(e.target.valueAsDate ?? new Date())}
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:bg-form-input"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              To
            </label>
            <input
              type="date"
              placeholder="date"
              value={moment(selectedEndDate).format("YYYY-MM-DD")}              
              onChange={e=>setSelectedEndDate(e.target.valueAsDate ?? new Date())}
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:bg-form-input"
            />
          </div>


        </div>
        <div className="pl-6.5 pr-6.5 pb-6.5 pt-6.5">
          <button
            disabled={isSubmiting || isLoadingCar}
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
            type="submit"
          >
            {isSubmiting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  </div>)
}
