import { UserType } from "../../components/DropdownUser";
import { useEffect, useState } from "react";
import StorageUtil from "../../utils/storage-util";
import CarRentalDashboard from "./CarRentalDashboard";
import EventDashboard from "./EventDashboard";
import VenueDashboard from "./VenueDashboard";
import AdminDashboard from "./AdminDashboard";
import { getRequest } from "../../utils/api.util";
export default function Dashboard(){
    const [user] = useState(StorageUtil.getUser());
    const [dashboardData,setDashboardData] = useState({});
    const getDashboard = async ()=>{
      const result = await getRequest<any>('users/dashboard');
      if(result.status == 200){
        setDashboardData(result.data);        
      }else{
        setDashboardData({});
      }
    }
    useEffect(()=>{
      getDashboard();
      
    },[]);
    if(user&&user.userType == UserType["Car Rental"]){
        return (
          <CarRentalDashboard data={dashboardData}/>
        )
      }
      if(user&&user.userType == UserType["Event Decorator"]){
        return (
          <EventDashboard data={dashboardData}/>
        )
      }
      if(user&&user.userType == UserType["Venue Provider"]){
        return (
          <VenueDashboard data={dashboardData}/>
        )
      }
      return (
        <AdminDashboard data={dashboardData}/>
      );
}