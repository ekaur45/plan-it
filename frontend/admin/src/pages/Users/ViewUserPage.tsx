import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/api.util";
import CONFIG from "../../utils/config.util";
import { toast } from "react-toastify";
import { FaCheck, FaEnvelope, FaIdCard, FaPhoneAlt } from "react-icons/fa";
import Breadcrumb from "../../components/Breadcrumb";
import { UserType } from "../../components/DropdownUser";

export default function ViewUserPage() {
    const { id } = useParams();
    const [data, setData] = useState<any>({});
    const fetchUser = async () => {
        const result = await getRequest("users/user/" + id);
        if (result.status == 200) {
            setData(result.data);
        }
    }
    const handleApproveUser = async () => {
        await postRequest("users/approve", { userId: id });
        toast("Approved.");
        fetchUser();
    }
    useEffect(() => {
        fetchUser();
    }, [id]);
    return (<Fragment>
        <div className="mx-auto">
            <Breadcrumb pageName="User details" />
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-2">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex justify-between items-center border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Personal Information
                            </h3>
                            <div>
                                {data.isUserVerified && <button className="flex flex-1 font-medium gap-3 items-center justify-center py-1 rounded"><span className="text-success"><FaCheck /></span> Approved

                                </button>}
                                {!data.isUserVerified && <button onClick={handleApproveUser} className="flex items-center gap-3 border border-grey rounded px-3 py-1 hover:shadow-1 hover:border hover:border-primary hover:text-primary">Approve <FaCheck /></button>}
                            </div>
                        </div>
                        {data && <div className="p-7 flex gap-3">
                            <img src={CONFIG.BaseUrl + data.profileImage} className="rounded-2xl shadow-default border-2 border-body" style={{ "maxHeight": "150px" }} />
                            <div>
                                <div className="flex gap-2 mb-2">
                                    <b>
                                        {data.firstName}
                                    </b>
                                    <b>
                                        {data.lastName}
                                    </b>
                                    <div >(<i className="mb-2 text-sm">{UserType[data.userType]}</i>)</div>
                                </div>

                                <div className="mb-1 flex items-center gap-2">
                                    <FaEnvelope />
                                    {data.email}
                                </div>
                                <div className="mb-1 flex items-center gap-2">
                                    <FaPhoneAlt />
                                    {data.phoneNumber}
                                </div>
                                <div className="mb-1 flex items-center gap-2">
                                    <FaIdCard />
                                    {data.cnicNumber}
                                </div>

                            </div>
                        </div>}
                    </div>
                </div>
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Document(s)
                            </h3>
                        </div>
                        <div className="flex gap-4 p-7">
                            <div>

                            <b>CNIC Front</b>
                            {data.cnicFront&&<div className="">
                                <img src={CONFIG.BaseUrl+data.cnicFront} alt="" />
                                </div>}
                            </div>
                            <div>

                            <b>CNIC Back</b>
                            {data.cnicBack&&<div className="">
                                <img src={CONFIG.BaseUrl+data.cnicBack} alt="" />
                                </div>}
                            </div>
                        </div>
                                <div className="p-7">
                                <b>Other documents</b>
                            {data.documents&&data.documents.map((e:string,i:number)=><div key={i} className="">
                            <img src={CONFIG.BaseUrl+e} alt="" />

                            </div>)}
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>)
}