import { Fragment, useEffect, useState } from "react";
import { Link, useHref, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import { postRequest } from "../utils/api.util";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import { hideGlobalLogin, setIsLoggedInTrue } from "../stores/reducers/global-reducer";
type LoginComponentProps = {
    hideSignup?:boolean
}
export default function LoginComponent(props:LoginComponentProps) {
    const isGlobalLoginVisible = useGlobalSelector((state) => state.globalReducer.isGlobalLoginVisible);
    const dispatch = useGlobalDispatch();
    const redirect = useNavigate();
    const [search] = useSearchParams();
    const [fallback] = useState(search.get("fallback"));
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await postRequest<any>("auth/login", { email, password })
        setIsLoading(false);
        if (result != null && result.status === 200) {
            localStorage.setItem("user", JSON.stringify(result.data));
            if(isGlobalLoginVisible){
                dispatch(hideGlobalLogin());
                dispatch(setIsLoggedInTrue())
            }else{
                const rd = "" + (fallback?fallback:"/");
                redirect(rd);
            }
        } else {
            toast(result.message, { type: "error" });
        }
    }
    return (
        <div className="card login-card">
            <form className="card-body" onSubmit={handleLoginSubmit}>
                <header></header>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" className="form-control form-control-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control form-control-md"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button
                    disabled={isLoading}
                    type="submit" className="btn btn-outline-primary btn-sm btn-block mt-3">Login</button>
                    {!props.hideSignup&&<><div className="align-items-center d-flex justify-content-center" style={{ gap: "1rem" }}>
                    <hr className="w-100" /> or <hr className="w-100" />
                </div>
                <Link to={"/auth/signup"} className="w-100 text-center">Signup</Link></>}
                
            </form>
        </div>
    )
}