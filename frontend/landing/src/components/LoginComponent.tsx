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
                dispatch(setIsLoggedInTrue())
                const rd = "" + (fallback?fallback:"/");
                redirect(rd);
            }
        } else {
            toast(result.message, { type: "error" });
        }
    }
    return (
        <section className={"w-100 "+(props.hideSignup===true ?"":"section") }>
        <div className={"w-100 p-3 "+(props.hideSignup===true?"":"login-card")}>
            <form className="card-content" onSubmit={handleLoginSubmit}>
                <header></header>
                <div className="input-wrapper border-none">
                    <label className="input-label">Email</label>
                    <input type="text" className="input-field"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-wrapper border-none">
                    <label className="input-label">Password</label>
                    <input type="password" className="input-field"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password."
                    />
                </div>
                <button
                    disabled={isLoading}
                    type="submit" className="btn btn-outline-primary btn-sm btn-block mt-3">Login</button>
                    {!props.hideSignup&&<><div className="align-items-center d-flex justify-content-center" style={{ gap: "1rem" }}>
                        
                    <hr className="w-100" /> or <hr className="w-100" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                <span className="d-flex"><Link className="mr-2" to={"/auth/forgot"}>Forgot</Link> password</span>
                <span><Link to={"/auth/signup"} className="w-100 text-center">Signup</Link></span>
                </div>
                </>}
                
            </form>
        </div>
        </section>
    )
}