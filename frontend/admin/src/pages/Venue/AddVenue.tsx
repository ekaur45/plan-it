import { ChangeEvent, useState } from "react"
import { postFormRequest, postRequest } from "../../utils/api.util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AddVenuePage() {
  const redirect = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [pricePerHead, setPricePerHead] = useState(1);
  const [images, setImages] = useState<any[]>([]);
  const handleOnSubmit = async (e: any) => {
    let d = { name, location, capacity, images,description,pricePerHead };
    const result = await postRequest<any>('venue/add', d);
    if (result && result.status == 200) {
      toast(result.message, { type: "success" });
      redirect("/venue/venues");
    }
  }
  const handleOnImageChange = async (e: any) => {
    const image = e.target.files[0];
    const form = new FormData();
    form.append("image", image);
    const result = await postFormRequest("upload", form);
    if (result.status == 200) {
      setImages(pre => [...pre, result.data]);
    }
  }
  const descriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Venue
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5 pb-0">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:bg-form-input"
                />
              </div>


              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Capacity
                </label>
                <input
                  type="number"
                  placeholder="Capacity"
                  value={capacity}
                  onChange={e => setCapacity(e.target.valueAsNumber)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Price per head
                </label>
                <input
                  type="number"
                  placeholder="Capacity"
                  value={pricePerHead}
                  onChange={e => setPricePerHead(e.target.valueAsNumber)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Description
                </label>

                <textarea
                  className="w-full rounded border border-stroke bg-gray py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="bio"
                  id="bio"
                  rows={8}
                  onChange={descriptionChange}
                  placeholder="Write your bio here"
                  value={description}
                  
                >{description}</textarea>
              </div>
              <div
                id="FileUpload"
                className="relative mt-9 mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  onChange={handleOnImageChange}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="#3056D3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="#3056D3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>
              {
                images && images.length > 0 && <>{images.length} image{images.length == 1 ? "" : "s"} added.</>
              }
            </div>
            <div className="pl-6.5 pr-6.5 pb-6.5">
              <button
                onClick={handleOnSubmit}
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}