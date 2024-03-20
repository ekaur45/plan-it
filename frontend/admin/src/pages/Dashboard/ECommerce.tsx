import { useState } from "react";
import StorageUtil from "../../utils/storage-util";
import { UserType } from "../../components/DropdownUser";


const ECommerce = () => {
  const [user] = useState(StorageUtil.getUser());
  if(user.userType == UserType["Car Rental"]){
    return (
      <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        Rental
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">      
        <div className="col-span-12 xl:col-span-8">
        </div>
      </div>
      </>
    )
  }
  if(user.userType == UserType["Event Decorator"]){
    return (
      <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">     
      Decorator
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">      
        <div className="col-span-12 xl:col-span-8">
        </div>
      </div>
      </>
    )
  }
  if(user.userType == UserType["Venue Provider"]){
    return (
      <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">     
      Venue
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">      
        <div className="col-span-12 xl:col-span-8">
        </div>
      </div>
      </>
    )
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">     
      Admin
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">      
        <div className="col-span-12 xl:col-span-8">
        </div>
      </div>
    </>
  );
};

export default ECommerce;
