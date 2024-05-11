import { useState } from "react";
import { postRequest } from "../utils/api.util";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [sendingOtp,setSendingOtp] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);
    const handleSendOtpSubmit = async (e: any) => {
        e.preventDefault();
        setSendingOtp(true);
        const result = await postRequest("auth/send-otp",{email});
        if(result.status == 200){
            setSendingOtp(false);
            setIsSent(true);
        }
    }
    const handleOnResetPassword = async(e:any)=>{
        e.preventDefault();
        const result = await postRequest("auth/reset-password",{email,otp,password});
        if(result.status == 200){
            alert("Password reset");
        }
    }
    return (<>
        <section className="single_slider" style={{ height: "78px" }}></section>
        <section className="container">
            <div className="row">
                <div className="col-12 justify-content-center d-flex">
                    <div className="card login-card my-5 w-50">
                        {!isSent&&<form className="card-content" onSubmit={handleSendOtpSubmit}>
                            <div className="input-wrapper border-none">
                                <label className="input-label">Email</label>
                                <input type="email" className="input-field"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email."
                                />
                            </div>
                            <div className="input-wrapper border-none">
                                <button className="btn btn-primary">Send</button>
                            </div>
                        </form>}
                        {isSent&&<form onSubmit={handleOnResetPassword}>
                            <div className="input-wrapper border-none">
                                <label className="input-label">OTP</label>
                                <input type="text" className="input-field"
                                autoComplete={""}
                                value={otp}
                                onChange={e=>setOtp(e.target.value)}
                                    placeholder="Enter OTP."
                                />
                            </div>
                            <div className="input-wrapper border-none">
                                <label className="input-label">New password</label>
                                <input type="password" className="input-field"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                    placeholder="Enter new password."
                                />
                            </div>
                            <div className="input-wrapper border-none">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                            </form>}
                    </div>
                </div>
            </div>
        </section>
    </>);
}