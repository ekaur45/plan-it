const StorageUtil = {
    getUser:()=>{
        const userStr = localStorage.getItem("user");
        if(!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch (error) {
            
        }
        return null;
    },
    setUser:(user:any)=>{
        localStorage.setItem("user",JSON.stringify(user));
    },
    updateUser:(u:any)=>{
        const {access_token} = StorageUtil.getUser();
        StorageUtil.setUser({access_token,...u});
    }

}
export default StorageUtil;