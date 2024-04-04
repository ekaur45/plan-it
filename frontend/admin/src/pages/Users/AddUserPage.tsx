import { useState } from "react";
import { Link } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/api.util";
export type UserRole = "admin" | "user";
export default function AddUserPage() {
    const [firstName,setFirstName] = useState<string>("");
    const [lastName,setLastname] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] =  useState<string>("");
    const [userRole,setUserRole] = useState<UserRole>("admin");
    const [userType,setUserType] = useState<string>();
    const [isUserVerified,setIsUserVerified] = useState<boolean>(false);
    const [isEmailVerified,setIsEmailVerified] = useState<boolean>(false);

    const checkEmail = async (email:string) =>{
        const user= await getRequest("users/check/"+email);
        return user.status === 200 && !!user.data;
    }
    const handleOnUserSubmit = async (e:any)=>{
    
        e.preventDefault();
        const d = {firstName,lastName,email,password,userRole,userType,isUserVerified,isEmailVerified};
        const userExists = await checkEmail(email);
        debugger
        if(userExists===true){
            alert("User already exists");
            return;
        }
        console.log({d});
        const result = await postRequest("users/add",d);
        if(result.status === 200){
            alert("added");
        }
    }

    return (<>
        <div className="flex justify-end">            
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <form onSubmit={handleOnUserSubmit} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between items-center border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        User Information
                    </h3>
                    <Link to={"/users/list"} className="bg-primary border border-primary cursor-pointer hover:bg-opacity-90 px-4 py-2 rounded-lg text-white transition mb-2">View All</Link>
                </div>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5 pb-0">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            First name
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            onChange={e=>setFirstName(e.target.value)}
                            value={firstName}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Last name
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            onChange={e=>setLastname(e.target.value)}
                            value={lastName}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            onChange={e=>setEmail(e.target.value)}
                            value={email}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder=""
                            onChange={e=>setPassword(e.target.value)}
                            value={password}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            User role
                        </label>
                        <select
                            
                            placeholder=""
                            onChange={e=>setUserRole(e.target.value == "admin" ? "admin":"user")}
                            value={userRole}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    {userRole == "user" && <div>
                        <label className="mb-3 block text-black dark:text-white">
                            User type
                        </label>
                        <select
                            placeholder=""
                            onChange={e=>setUserType(e.target.value)}
                            value={userType}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        >
                            <option value=""></option>
                            <option value="1">Car Rental</option>
                            <option value="2">Event Decorator</option>
                            <option value="3">Venue Provider</option>
                        </select>
                    </div>}
                </div>
                <div className="pl-6.5 pr-6.5 pb-6.5 mt-3">
                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </>);
}