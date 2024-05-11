import { UserType } from "../../components/DropdownUser";
import { useState } from "react";
import StorageUtil from "../../utils/storage-util";
import CarRentalDashboard from "./CarRentalDashboard";
import EventDashboard from "./EventDashboard";
import VenueDashboard from "./VenueDashboard";
import AdminDashboard from "./AdminDashboard";
export default function Dashboard(){
    const [user] = useState(StorageUtil.getUser());
    if(user&&user.userType == UserType["Car Rental"]){
        return (
          <CarRentalDashboard/>
        )
      }
      if(user&&user.userType == UserType["Event Decorator"]){
        return (
          <EventDashboard/>
        )
      }
      if(user&&user.userType == UserType["Venue Provider"]){
        return (
          <VenueDashboard/>
        )
      }
      return (
        <AdminDashboard/>
      );
}