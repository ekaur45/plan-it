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
            state.isLoggedIn = true
        }
    }
})
export const {showGlobalLogin,hideGlobalLogin,setIsLoggedInFalse,setIsLoggedInTrue} = globalSlice.actions;
export default globalSlice.reducer;