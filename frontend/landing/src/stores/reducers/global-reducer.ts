import { createSlice } from "@reduxjs/toolkit";
import StorageUtil from "../../utils/storage.util";

export const globalSlice = createSlice({
    name:"globalSlice",
    initialState:{
        isGlobalLoginVisible:false,
        isLoggedIn:StorageUtil.isLoggedIn(),
        user:StorageUtil.getUser()
    },
    reducers:{
        showGlobalLogin:(state)=>{
            state.isGlobalLoginVisible = true
        },
        hideGlobalLogin:(state)=>{
            state.isGlobalLoginVisible = false
        },
        setIsLoggedInFalse:(state,)=>{
            state.isLoggedIn = false
        },
        setIsLoggedInTrue:(state,)=>{
            state.isLoggedIn = true;
            state.user = StorageUtil.getUser()
        },
        updateUser:(state,values)=>{
            state.user = {...values.payload,access_token:state.user.access_token}
        }
    }
})
export const {showGlobalLogin,hideGlobalLogin,setIsLoggedInFalse,setIsLoggedInTrue,updateUser} = globalSlice.actions;
export default globalSlice.reducer;