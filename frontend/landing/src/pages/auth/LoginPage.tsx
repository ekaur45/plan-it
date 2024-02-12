import { Fragment, useEffect, useState } from "react";
import './login-page.css'
import LoginComponent from "../../components/LoginComponent";

export default function LoginPage() {

    useEffect(() => {
    }, []);
    return (<Fragment>
        <section className="single_slider" style={{ height: "78px" }}>

        </section>
        <section className="container">
            <div className="row">
                <div className="col-12 justify-content-center d-flex">
                    <LoginComponent />
                </div>
            </div>
        </section>
    </Fragment>)
}