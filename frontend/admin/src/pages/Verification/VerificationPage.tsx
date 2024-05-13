import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { getRequest } from "../../utils/api.util";

export default function VerficationPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("verification_token");
    useEffect(()=>{
        (async()=>{
            getRequest("auth/verifyuseremail?verification_token="+token).then(x=>{
                console.log(x);
            })
        })()
    },[token]);
    return(
        <>
        Verified {token}
        </>
    )
}