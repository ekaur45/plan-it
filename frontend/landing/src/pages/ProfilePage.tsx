import { Fragment, useState } from "react";
import { useGlobalDispatch, useGlobalSelector } from "../hooks";
import CONFIG from "../utils/config.util";
import { getRequest, postFormRequest, postRequest } from "../utils/api.util";
import StorageUtil from "../utils/storage.util";
import { updateUser } from "../stores/reducers/global-reducer";
import {toast} from 'react-toastify';
export default function ProfilePage() {
    var user = useGlobalSelector((state) => state.globalReducer.user);
    const dispatch = useGlobalDispatch();
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const updateProfileValues = async () => {
        const result = await getRequest("auth/me");
        if (result.status === 200) {
          StorageUtil.updateUser(result.data);
          dispatch(updateUser(result.data));
        }
      }
    const handleOnProfileImageChange = async (e: any) => {
        const form = new FormData();
        form.append("file", e.target.files[0]);
        const response = await postFormRequest<any>("upload", form);
        if(response.status === 200){
            const result = await postRequest<any>("auth/update-profile-image", { img: response.data.file });
            toast(result.message,{type:result.status === 200?"success":"error"});
            if(result.status === 200){
                updateProfileValues();
            }
        }
    }
    const handleOnFormSubmit = async (e: any) => {
        e.preventDefault();
        const rest = {...user};
        rest["firstName"] = firstName
        rest["lastName"] = lastName;
        let d = { ...rest };
        const result = await postRequest("auth/update-profile", d);     
        toast(result.message,{type:result.status === 200?"success":"error"});   
        if (result.status === 200) {
          updateProfileValues();
        }
    
      }
    return (<Fragment>
        <section className="single_slider" style={{ height: "78px" }}>

        </section>
        <section className="filter container pt-20">
            <div className="card mb-3">
                <div className="card-header">
                    <b>Profile</b>
                </div>
                <div className="card-body">
                    <form className="row mb-3" onSubmit={handleOnFormSubmit}>
                        <div className="col-md-6 mb-3">
                            <label>First name</label>
                            <input type="text" className="form-control"
                                value={firstName}
                                required
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Last name</label>
                            <input type="text" className="form-control"
                                value={lastName}
                                required
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control"
                                value={user.email}
                                onChange={e=>{}}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Image</label>
                            <div aria-controls="abcd" className="form-control position-relative">
                                <input id="abcd" type="file" onChange={handleOnProfileImageChange} className="position-absolute w-100" style={{opacity:0}}/>
                                {user.profileImage&&<img src={CONFIG.BaseUrl+user.profileImage} className="h-100"/>}
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </Fragment>);
}