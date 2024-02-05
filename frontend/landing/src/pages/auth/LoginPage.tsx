import { Fragment, useEffect, useState } from "react";
import './login-page.css'
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/api.util";
import { toast } from "react-toastify";
export default function LoginPage() {

    const redirect = useNavigate();
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
            redirect("/");
        } else {
            toast(result.message, { type: "error" });
        }
    }
    useEffect(() => {
    }, []);
    return (<Fragment>
        <section className="single_slider" style={{ height: "78px" }}>

        </section>
        <section className="container">
            <div className="row">
                <div className="col-12 justify-content-center d-flex">
                    <div className="card login-card my-5 w-50">
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
                            <div className="align-items-center d-flex justify-content-center" style={{ gap: "1rem" }}>
                                <hr className="w-100" /> or <hr className="w-100" />
                            </div>
                            <Link to={"/auth/signup"} className="w-100 text-center">Signup</Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>)
}