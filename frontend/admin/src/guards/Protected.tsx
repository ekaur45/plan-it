import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StorageUtil from "../utils/storage-util";
type PComponent ={
    component:ReactNode,
    roles?:Array<string>
}
export default function Protected(component:PComponent){
    const redirect = useNavigate();
    useEffect(()=>{
        let user = StorageUtil.getUser();
        if(!user){
            return redirect("/auth/signin");
        }
        if(user.userRole!="admin" && (!user.isProfileCompleted || !user.isUserVerified)){
            return redirect("/settings");
        }
    },[]);
    return <Fragment>{component.component}</Fragment>
}