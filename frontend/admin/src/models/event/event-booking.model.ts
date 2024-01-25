import UserModel from "../user/user.model";

export default class EventBookingModel{
    _id:string = "";
    userId:string = "";
    user:UserModel = new UserModel();    
    bookingDate:string = "";
    bookingTime:string = "";
}