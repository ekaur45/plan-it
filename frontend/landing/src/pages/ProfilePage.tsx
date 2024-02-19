import { Fragment, useState } from "react";
import { useGlobalSelector } from "../hooks";
import CONFIG from "../utils/config.util";

export default function ProfilePage() {
    const user = useGlobalSelector((state) => state.globalReducer.user);
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    console.log(user);
    return (<Fragment>
        <section className="single_slider" style={{ height: "78px" }}>

        </section>
        <section className="filter container pt-20">
            <div className="card mb-3">
                <div className="card-header">
                    <b>Profile</b>
                </div>
                <div className="card-body">
                    <form className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <label>First name</label>
                            <input type="text" className="form-control"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Last name</label>
                            <input type="text" className="form-control"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control"
                                value={user.email}
                            />
                        </div>
                        <div className="col-md-12">
                            <label>Image</label>
                            {user.profileImage?<img src={CONFIG.BaseUrl+user.profileImage}/>:<input type="file" className="form-control"/>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </Fragment>);
}