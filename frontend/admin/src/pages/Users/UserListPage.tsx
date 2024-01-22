import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/api.util";
import { FaCheck, FaEye } from 'react-icons/fa';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function UserListPage() {
    const [users, setUsers] = useState([]);
    const getInitialData = async () => {
        const result = await getRequest<any>('users/list');
        if (result.status == 200) {
            setUsers(result.data);
        }
    }
    const handleApproveUser = async (userId:string) =>{
        await postRequest("users/approve",{userId});
        toast("Approved.");
        getInitialData();
    }
    useEffect(() => {
        getInitialData();
    }, []);
    return (<>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            {users.map((user: any, i: number) => {
                return <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0 relative">
                    <div className="actions flex gap-2">
                        <Link to={"/users/"+user._id+"/view"}>
                            <FaEye />
                        </Link>
                        <button onClick={()=>{handleApproveUser(user._id)}}>
                            <FaCheck />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5">
                        {user.isUserVerified ? "Approved" :"No"} {user.firstName} {user.lastName}
                    </div>
                </div>
            })}
        </div>
    </>);
}