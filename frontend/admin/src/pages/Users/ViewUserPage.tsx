import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getRequest } from "../../utils/api.util";
import CONFIG from "../../utils/config.util";

export default function ViewUserPage(){
    const {id} = useParams();
    const [data,setData] = useState<any>({});
    const fetchUser = async ()=>{
        const result = await getRequest("users/user/"+id);
        if(result.status  == 200){
            setData(result.data);
        }
    }
    useEffect(()=>{
        fetchUser();
    },[id]);
    return (<Fragment>
        {
            data&&<div>
                {data.firstName}
                {
                    data.documents.map((doc:any,i:number)=>{
                        return <div key={i}>
                                <img src={CONFIG.BaseUrl+doc} alt="" />
                            </div>
                    })
                }
            </div>
        }
    </Fragment>)
}