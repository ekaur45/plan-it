import Breadcrumb from '../components/Breadcrumb';
import { useState, useEffect } from "react";
import { FaEnvelope, FaExclamationTriangle, FaSpinner, FaTimesCircle, FaUpload, FaUser } from 'react-icons/fa';
import StorageUtil from '../utils/storage-util';
import { getRequest, postFormRequest, postRequest } from '../utils/api.util';
import { toast } from 'react-toastify';
import CONFIG from '../utils/config.util';
const Settings = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [cnicFront, setCnicFront] = useState("");
  const [cnicNumber, setCnicNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnicBack, setCnicBack] = useState("");
  const [isPIUploading, setIsPIUploading] = useState<boolean>(false);
  const [rows] = useState(localStorage.getItem("alertSettings") ? JSON.parse(localStorage.getItem("alertSettings") ?? "{}") : []);
  const [user, setUser] = useState(StorageUtil.getUser());
  const [files, setFiles] = useState<any[]>(user?.documents?.map((e: any) => { return { file: e } }) ?? []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setCnicNumber(user?.cnicNumber);
    setPhoneNumber(user?.phoneNumber);
    setCnicFront(user?.cnicFront);
    setCnicBack(user?.cnicBack);
    localStorage.setItem("alertSettings", JSON.stringify(rows));
  }, [rows]);

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  }

  const updateProfileValued = async () => {
    const result = await getRequest("auth/me");
    if (result.status == 200) {
      StorageUtil.updateUser(result.data);
    }
  }
  const handleOnFormSubmit = async (e: any) => {
    e.preventDefault();
    let d = { documents: files.map(e => e.file), firstName, lastName, phoneNumber, cnicFront, cnicBack, cnicNumber };
    const result = await postRequest("auth/update-profile", d);
    toast(result.message, { type:result.status == 200? "success":"error", draggable: true })
    if (result.status == 200) {
      updateProfileValued();
    }

  }
  const handleOnImageChange = async (e: any) => {
    setIsUploading(true);
    const form = new FormData();
    form.append("file", e.target.files[0]);
    const response = await postFormRequest<any>("upload", form);
    setFiles(pre => [...pre, response.data]);
    setIsUploading(false);
  }
  const handleOnCnicFrontChange = async (e: any) => {
    setIsUploading(true);
    const form = new FormData();
    form.append("file", e.target.files[0]);
    const response = await postFormRequest<any>("upload", form);
    setCnicFront(pre => response.data.file);
    setIsUploading(false);
  }
  const handleOnCnicBackChange = async (e: any) => {
    setIsUploading(true);
    const form = new FormData();
    form.append("file", e.target.files[0]);
    const response = await postFormRequest<any>("upload", form);
    setCnicBack(pre => response.data.file);
    setIsUploading(false);
  }

  const handleOnProfileImageChange = async (e: any) => {
    setIsPIUploading(true);
    const form = new FormData();
    form.append("file", e.target.files[0]);
    const response = await postFormRequest<any>("upload", form);
    const added = await postRequest<any>("auth/update-profile-image", { img: response.data.file });
    if(added.status === 200) toast("Picture updated. Refresh to view",{type:"success"});
    updateProfileValued();
    setIsPIUploading(false);
  }
  const handleRemove = (e: any) => {
    setFiles(pre => e);
  }
  return (
    <>
      <div className="mx-auto max-w-270">
        {user?.isProfileCompleted!=true&&<>
        <div className='flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] mb-5 px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-5  z-1' style={{top:"100px"}}>
          <div className='mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30'>
            <FaExclamationTriangle className='text-[#9D5425]'/>
          </div>
          <div className="w-full">
            <h5 className='mb-3 text-lg font-bold text-[#9D5425]'>Complete your profile first</h5>
            <p className='leading-relaxed text-[#D0915C]'>Provide CNIC front, CNIC back and required documents for approval.</p>
          </div>
        </div>        
        </>}
        {user?.isProfileCompleted===true&&user?.isUserVerified!=true&&<>
        <div className='flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] mb-5 px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-5  z-1' style={{top:"100px"}}>
          <div className='mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30'>
            <FaExclamationTriangle className='text-[#9D5425]'/>
          </div>
          <div className="w-full">
            <h5 className='mb-3 text-lg font-bold text-[#9D5425]'>Verfication</h5>
            <p className='leading-relaxed text-[#D0915C]'>Please for someone to approved your account. Make sure to upload all the required documents.</p>
          </div>
        </div>        
        </>}
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleOnFormSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="firstName"
                      >
                        First name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FaUser />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First name"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lastName"
                      >
                        Last name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FaUser />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last name"
                          value={lastName}
                          onChange={e => {
                            setLastName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <FaEnvelope />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        value={user.email}
                        onChange={e => {
                          user.email = e.target.value;
                          setUser(user);
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="devidjhon24"
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="cnicNumber"
                    >
                      CNIC
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="cnicNumber"
                      id="cnicNumber"
                      placeholder="00000-0000000-0"
                      value={cnicNumber}
                      onChange={e => setCnicNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Phone number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="0000-0000000"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      {cnicFront && <div
                        id="FileUpload"
                        className="relative  mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray dark:bg-meta-4"
                      >
                        <span onClick={e => setCnicFront("")} className='text-danger top-3 right-3 absolute'>
                          <FaTimesCircle />
                        </span>
                        <img src={CONFIG.BaseUrl + cnicFront} />
                      </div>}
                      {!cnicFront && <div
                        id="FileUpload"
                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          onChange={handleOnCnicFrontChange}
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className='flex gap-2 items-center'>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <FaUpload />
                            </span>
                            <span>
                              CNIC Front
                            </span>
                          </div>
                          <p>
                            <span className="text-primary">Click to upload</span> or
                            drag and drop
                          </p>
                        </div>
                      </div>}
                    </div>
                    <div className="w-full sm:w-1/2">
                      {cnicBack && <div
                        id="FileUpload"
                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray dark:bg-meta-4"
                      >
                        <span onClick={e => setCnicBack("")} className='text-danger top-3 right-3 absolute'>
                          <FaTimesCircle />
                        </span>
                        <img src={CONFIG.BaseUrl + cnicBack} />
                      </div>}
                      {!cnicBack && <div
                        id="FileUpload"
                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          onChange={handleOnCnicBackChange}
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className='flex gap-2 items-center'>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <FaUpload />
                            </span>
                            <span>
                              CNIC Back
                            </span>
                          </div>
                          <p>
                            <span className="text-primary">Click to upload</span> or
                            drag and drop
                          </p>
                        </div>
                      </div>
                      }
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Documents
                    </label>
                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        onChange={handleOnImageChange}
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <FaUpload />
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span> or
                          drag and drop
                        </p>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      {
                        (files && files) ? files.map((img, i) => <div key={i} className='relative'>
                          <div className='text-[#CD5D5D] absolute right-0 top-0 bg-gray' onClick={() => setFiles(f => f.filter((item: any, ndx: number) => ndx !== i))}>
                            <FaTimesCircle />
                          </div>
                          <img style={{ height: "6rem", width: "6rem" }} src={CONFIG.BaseUrl + img.file} />
                        </div>) : null
                      }
                      {
                        isUploading == true && <div className='relative'>
                          <div style={{ height: "6rem", width: "6rem" }} className='border-2 flex items-center justify-center border-[#eee]'>
                            <FaSpinner />
                          </div>
                        </div>
                      }
                    </div>
                  </div>


                  <div className="flex justify-end gap-4.5">
                    {/* <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button> */}
                    <button
                      disabled={files?.length == 0}
                      className={(files?.length == 0 ? "bg-opacity-30 " : "") + "flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"}
                      type="submit"

                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    Add / Update profile image
                    {/* <div className="h-14 w-14 rounded-full">
                      <img src={userThree} alt="User" />
                    </div> */}
                    {/* <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div> */}
                  </div>
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={handleOnProfileImageChange}
                    />
                    {user.profileImage && <img src={CONFIG.BaseUrl + user.profileImage} />}
                    {!user.profileImage && <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <FaUpload />
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                    }
                  </div>

                  {/* <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type="submit"
                    >
                      Save
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
