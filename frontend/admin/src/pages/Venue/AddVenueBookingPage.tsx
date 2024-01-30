import React, { Fragment, ReactNode, useEffect, useState } from "react";
import VenueModel from "../../models/venue/venue.model";
import { getRequest, postRequest } from "../../utils/api.util";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";

export default  function AddVenueBookingPage(){
    const [venues,setVenues] = useState<VenueModel[]>([]);
    const [selectedVenue,setSelectedVenue] = useState<VenueModel>({} as VenueModel); // initialize as an empty object with VenueModel type
    const [selectedStartDate,setSelectedStartDate] = useState<Date>(new Date());
    const [selectedEndDate,setSelectedEndDate] = useState<Date>(new Date());
    const [isVenuesLoading,setIsVenuesLoading] = useState<boolean>(false);
    const [isSubmiting,setIsSubmiting] = useState<boolean>(false);

    const getVenues = async ()=>{
        setIsVenuesLoading(true);
        const result = await getRequest<VenueModel[]>('/venue/venues');
        setIsVenuesLoading(false);
        if(result.status == 200){
            setVenues(result.data);
        }
    }

    const handleOnFormSubmit = async (e:React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        const d = {venueId:selectedVenue._id,bookingDate:selectedStartDate,bookingEndDate:selectedEndDate};
        setIsSubmiting(true);
        const result = await postRequest('/venue/book-venue',d);
        setIsSubmiting(false);
        toast(result.message,{type:result.status == 200 ? "success":"error"});
    }

    useEffect(()=>{
        getVenues();
    },[getVenues]);

    return(<Fragment>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
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
              onChange={setSelectedVenue}
              value={selectedVenue}
              disabled={isVenuesLoading}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm py-3 px-5">
                  <span className="block truncate">
                    {selectedVenue._id == "" ? selectedVenue.name : `${selectedVenue.name} ${selectedVenue.capacity} - PKR ${selectedVenue.price}`}
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
                    {venues.map((venue, ndx) => (
                      <Listbox.Option
                        key={ndx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={venue}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {venue._id == "" ? venue.name : `${venue.name} ${venue.capacity} - PKR ${venue.price}`}

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
              value={selectedStartDate.toDateString()}              
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
              value={selectedEndDate.toDateString()}              
              onChange={e=>setSelectedEndDate(e.target.valueAsDate ?? new Date())}
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:bg-form-input"
            />
          </div>


        </div>
        <div className="pl-6.5 pr-6.5 pb-6.5">
          <button
            disabled={isSubmiting || isVenuesLoading}
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
            type="submit"
          >
            {isSubmiting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  </div>
    </Fragment>)
}