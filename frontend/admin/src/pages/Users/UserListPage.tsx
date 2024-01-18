import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api.util";
import { FaCheck, FaEye } from 'react-icons/fa';

export default function UserListPage() {
    const [users, setUsers] = useState([]);
    const getInitialData = async () => {
        const result = await getRequest<any>('users/list');
        if (result.status == 200) {
            setUsers(result.data);
        }
    }
    useEffect(() => {
        getInitialData();
    }, []);
    return (<>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            {users.map((user: any, i: number) => {
                return <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0 relative">
                    <div className="actions flex gap-2">
                        <FaCheck />
                        <FaEye />
                    </div>
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            })}
        </div>
    </>);
}