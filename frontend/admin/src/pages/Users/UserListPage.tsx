import { Fragment, useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/api.util";
import { FaCheck, FaCheckDouble, FaEye } from 'react-icons/fa';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserModel from "../../models/user/user.model";
import { Dialog, Transition } from "@headlessui/react";
import CONFIG from "../../utils/config.util";
function UserType(obj: { userType: number }) {
    return <span>
        {obj.userType == 1 ? "Car Rental" : obj.userType == 2 ? "Decorator" : obj.userType == 3 ? "Venue Provider" : ""}
    </span>
}
export default function UserListPage() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const getInitialData = async () => {
        const result = await getRequest<UserModel[]>('users/list');
        if (result.status == 200) {
            setUsers(result.data);
        }
    }
    const handleApproveUser = async (userId: string) => {
        await postRequest("users/approve", { userId });
        toast("Approved.");
        getInitialData();
    }
    const closeModal = ()=>{
        setIsOpen(false);
        setSelectedDocs([]);
    }
    useEffect(() => {
        getInitialData();
    }, []);
    return (<>
        <div className="flex justify-end">
            <button className="bg-primary border border-primary cursor-pointer hover:bg-opacity-90 px-4 py-2 rounded-lg text-white transition mb-2">Add new</button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="bg-graydark dark:text-gray-400 text-white text-xs uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Sr#
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            UserType
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sevice type
                        </th>
                        <td>
                            Documents
                        </td>
                        <th scope="col" className="px-6 py-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((user: UserModel, i: number) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{i + 1}</td>
                                <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                                <td className="px-6 py-4">{user.phoneNumber}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.userRole}</td>
                                <td className="px-6 py-4">
                                    <UserType userType={user.userType} />
                                </td>
                                <td>
                                    <span onClick={()=>{setIsOpen(true),setSelectedDocs(user.documents ?? [])}} className="hover:font-bold hover:text-primary cursor hover:underline">{user.documents?.length ?? 0}</span> Document{user.documents?.length == 1 ? "":"s"}
                                </td>
                                <td className="px-6 py-4 flex gap-3 justify-center">
                                    <Link to={"/users/" + user._id + "/view"}>
                                        <FaEye />
                                    </Link>
                                   {user.isUserVerified == true ? <button className="text-success"><FaCheckDouble/></button>:<button onClick={() => { handleApproveUser(user._id) }}><FaCheck /></button>}  
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    User Documents
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        {
                            selectedDocs.map((doc:string)=>{
                                return <img src={CONFIG.BaseUrl+doc}/>
                            })
                        }
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>);
}