import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
type PComponent ={
    component:ReactNode,
    roles?:Array<string>
}
export default function Protected(component:PComponent){
    const redirect = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("user")){
            return redirect("/auth/signin");
        }
    },[component.component]);
    return <Fragment>{component.component}</Fragment>
}