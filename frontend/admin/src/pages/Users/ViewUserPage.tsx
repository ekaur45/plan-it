import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/api.util";
import CONFIG from "../../utils/config.util";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

export default function ViewUserPage(){
    const {id} = useParams();
    const [data,setData] = useState<any>({});
    const fetchUser = async ()=>{
        const result = await getRequest("users/user/"+id);
        if(result.status  == 200){
            setData(result.data);
        }
    }
    const handleApproveUser = async () =>{
        await postRequest("users/approve",{userId:id});
        toast("Approved.");
        fetchUser();
    }
    useEffect(()=>{
        fetchUser();
    },[id]);
    return (<Fragment>
        {
            data&&<div>
                {
                    data.isUserVerified==true?<span>Approved</span>:
                    <button onClick={handleApproveUser}>
                            <FaCheck />
                        </button>
                }
                {data.firstName}
                {
                    data.documents&& data.documents.map((doc:any,i:number)=>{
                        return <div key={i}>
                                <img src={CONFIG.BaseUrl+doc} alt="" />
                            </div>
                    })
                }
            </div>
        }
    </Fragment>)
}