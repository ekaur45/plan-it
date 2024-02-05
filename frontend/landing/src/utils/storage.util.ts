interface IStorageUtil{
    setUser:(user:object)=>void
    getUser:()=>any
}
const StorageUtil:IStorageUtil = {
    setUser:(user:object)=>{
        localStorage.setItem("user",JSON.stringify(user));
    },
    getUser:()=>{
        return JSON.parse(localStorage.getItem("user") ?? "{}") as any;
    }
};
export default StorageUtil;