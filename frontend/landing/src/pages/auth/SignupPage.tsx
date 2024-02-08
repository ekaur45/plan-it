import React, { Fragment, useState } from "react"
import { postRequest } from "../../utils/api.util";
import './login-page.css'
import { Link, useNavigate } from "react-router-dom";
import StorageUtil from "../../utils/storage.util";
interface IUserType{
    name:string;
    value:string;
}
const userTypes: Array<IUserType> = [
    { name: "Car Rental", value: "1" },
    { name: "Event Decorator", value: "2" },
    { name: "Venue Provider", value: "3" },
    { name: "Other", value: "4" }
]
export default function SignupPage() {
    const redirect = useNavigate();
    const [userType, setType] = useState("4");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignupSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await postRequest<any>("auth/signup", { userType, firstName, lastName, email, password });
        if (result.status === 200) {
            StorageUtil.setUser(result.data);
            redirect("/");
        }
    }
    return (<>
        <section className="single_slider" style={{ height: "78px" }}></section>
        <section className="container">
            <div className="row">
                <div className="col-12 justify-content-center d-flex">
                    <div className="card login-card my-5 w-50">
                        <form className="card-body" onSubmit={handleSignupSubmit}>
                            <header>Signup</header>
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <select 
                                value={userType}
                                onChange={e=>setType(e.target.value)}
                                className="form-control">
                                    <option value="">Select type</option>
                                    {userTypes.map((obj:IUserType,ndx:number)=><Fragment key={ndx}>
                                        <option value={obj.value}>{obj.name}</option>
                                    </Fragment>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">First name</label>
                                <input type="text" className="form-control form-control-md"
                                value={firstName}
                                onChange={e=>setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Last name</label>
                                <input type="text" className="form-control form-control-md"
                                value={lastName}
                                onChange={e=>setLastName(e.target.value)}
                                />
                            </div>
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
                                type="submit" className="btn btn-outline-primary btn-sm btn-block mt-3">Signup</button>
                                 <div className="align-items-center d-flex justify-content-center" style={{gap:"1rem"}}>
                                 <hr className="w-100" /> or <hr className="w-100"/>
                                 </div>
                            <Link to={"/auth/login"} className="w-100 text-center">Login</Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>)
}