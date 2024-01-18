import axios, {Axios} from "axios";
import ApiResponse from "../models/resp.interface";
const baseURL ="http://localhost:8000/api/";

const getTokenFromStorage = ():string=>{
    let userStorageStr = localStorage.getItem("user");
    if(userStorageStr){
        try {
            let userStorage = JSON.parse(userStorageStr);
            return userStorage.access_token ?? "";
        } catch (error) {
            
        }
    }
    return "";
}
const getRequest = async <T>(url:string):Promise<ApiResponse<T>>=>{
    let headers = {};
    let token = getTokenFromStorage();
    if(token){
        headers = {"Authorization":token}
    }
    const result = await axios.get(baseURL+url,{headers});
    if(result.status == 200){
        return result.data as ApiResponse<T>;
    }
    return {status:500} as ApiResponse<T>;
}
const postRequest = async <T>(url:string,data:any):Promise<ApiResponse<T>>=>{
    let headers = {};
    let token = getTokenFromStorage();
    if(token){
        headers = {"Authorization":token,"content-type":"application/json"}
    }
    const result = await axios.post(baseURL+url,data,{headers:{...headers}})
    //const result = await instance.request({url:url,method:"POST",data:JSON.stringify(data),headers});
    //const result = await instance.post(url,JSON.stringify(data));
    if(result.status == 200){
        return result.data as ApiResponse<T>;
    }
    return {status:500} as ApiResponse<T>;
}
export {getRequest,postRequest}
