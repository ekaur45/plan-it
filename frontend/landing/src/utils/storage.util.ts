interface IStorageUtil{
    setUser:(user:object)=>void
    getUser:()=>any
    clearStorage:()=>any
    isLoggedIn:()=>boolean
}
const StorageUtil:IStorageUtil = {
    setUser:(user:object)=>{
        localStorage.setItem("user",JSON.stringify(user));
    },
    getUser:()=>{
        return JSON.parse(localStorage.getItem("user") ?? "{}") as any;
    },
    isLoggedIn:()=>{
        return Object.keys(StorageUtil.getUser()).length>0; //if user is not empty then user is logged in
    },
    clearStorage:()=>{
        localStorage.clear();
    }
};
export default StorageUtil;