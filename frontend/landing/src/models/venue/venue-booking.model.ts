import UserModel from "../user/user.model";
import VenueModel from "./venue.model";

export default class VenueBookingModel{
    _id:string = "";
    userId:string = "";
    user:UserModel = new UserModel();
    venueId:string = "";
    venue:VenueModel = new VenueModel();
    bookingDate:string = "";
    bookingEndDate:string = "";
    bookingTime:string = "";
}