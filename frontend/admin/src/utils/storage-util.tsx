const StorageUtil = {
    getUser:()=>{
        const userStr = localStorage.getItem("user");
        if(!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch (error) {
            
        }
        return null;
    }
}
export default StorageUtil;