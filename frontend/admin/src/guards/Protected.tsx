import { Fragment, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StorageUtil from "../utils/storage-util";
import { toast } from "react-toastify";

type PComponentProps ={
    component:ReactNode,
    roles?:Array<string>
}
export default function Protected(props:PComponentProps) {
    const redirect = useNavigate();

    useEffect(()=>{

        let user = StorageUtil.getUser();
        if(!user){
            return redirect("/auth/signin");
        }
        if(user.userRole!="admin" && !user.isProfileCompleted ){
            //toast("Complete your profile",{type:"info"});
            return redirect("/settings");
        }
    },[]);

    return <>{props.component}</>
    
}