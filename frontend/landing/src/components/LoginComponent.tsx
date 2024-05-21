import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import { postRequest } from "../utils/api.util";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import { hideGlobalLogin, setIsLoggedInTrue } from "../stores/reducers/global-reducer";
import StorageUtil from "../utils/storage.util";
type LoginComponentProps = {
    hideSignup?: boolean
}
export default function LoginComponent(props: LoginComponentProps) {
    const isGlobalLoginVisible = useGlobalSelector((state) => state.globalReducer.isGlobalLoginVisible);
    const dispatch = useGlobalDispatch();
    const redirect = useNavigate();
    const [search] = useSearchParams();
    const [fallback] = useState(search.get("fallback"));
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOtpScreen, setIsOtpScreen] = useState<boolean>(false);
    const [otp, setOtp] = useState("");
    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await postRequest<any>("auth/login", { email, password })
        setIsLoading(false);
        if (result != null && result.status === 200) {
            if (result.data.isEmailVerified !== true) {
                setIsOtpScreen(true);
            } else {
                StorageUtil.setUser(result.data);
                if (isGlobalLoginVisible) {
                    dispatch(hideGlobalLogin());
                    dispatch(setIsLoggedInTrue())
                } else {
                    dispatch(setIsLoggedInTrue())
                    const rd = "" + (fallback ? fallback : "/");
                    redirect(rd);
                }
            }
        } else {
            toast(result.message, { type: "error",position:"bottom-right" });
            if (result.data.isEmailVerified !== true) {
                setIsOtpScreen(true);
            }
        }
    }
    const handleOnOtpSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        const result = await postRequest<any>("auth/verify-otp", { email, otp });
        if (result.status === 200) {
            setIsOtpScreen(false);
            StorageUtil.setUser(result.data);
            if (isGlobalLoginVisible) {
                dispatch(hideGlobalLogin());
                dispatch(setIsLoggedInTrue());
            } else {
                dispatch(setIsLoggedInTrue())
                const rd = "" + (fallback ? fallback : "/");
                redirect(rd);
            }
        }
        setIsLoading(false);
    }
    return (
        <section className={"w-100 " + (props.hideSignup === true ? "" : "section")}>
            <div className={"w-100 p-3 " + (props.hideSignup === true ? "" : "login-card")}>
                {!isOtpScreen && <form className="card-content" onSubmit={handleLoginSubmit}>
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
                        type="submit" className="btn btn-outline-primary btn-block mt-3">Login</button>


                </form>}
                {isOtpScreen && <>
                    <span onClick={() => setIsOtpScreen(false)}> {"<"} Back</span>
                    <form className="card-body pb-0" onSubmit={handleOnOtpSubmit}>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">OTP</label>
                                <input type="text" className="form-control form-control-md"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                />
                            </div>
                            <button
                                disabled={isLoading}
                                type="submit" className="btn btn-outline-primary btn-block mt-3">Submit</button>
                        </div>
                    </form>
                </>}
                {!props.hideSignup && <>
                    <div className="align-items-center d-flex justify-content-center" style={{ gap: "1rem" }}>
                        <hr className="w-100" /> or <hr className="w-100" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="d-flex"><Link className="mr-2" to={"/auth/forgot"}>Forgot</Link> password</span>
                        <span><Link to={"/auth/signup"} className="w-100 text-center">Signup</Link></span>
                    </div>
                </>}
            </div>
        </section>
    )
}