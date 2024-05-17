import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StorageUtil from "../utils/storage-util";
<<<<<<< HEAD
=======
import { toast } from "react-toastify";

type PComponentProps ={
>>>>>>> 2240b6e20deda4ba2edee3f739d06b5ebc913b7b
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
        if(user.userRole!="admin" && (!user.isProfileCompleted || !user.isUserVerified)){
            return redirect("/settings");
        }
    },[]);
<<<<<<< HEAD
    return <Fragment>{component.component}</Fragment>
=======

    return <>{props.component}</>
    
>>>>>>> 2240b6e20deda4ba2edee3f739d06b5ebc913b7b
}