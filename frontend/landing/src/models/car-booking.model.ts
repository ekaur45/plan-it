import UserModel from "./user/user.model";
import CarModel from "./cars.model";

export default class CarBookingModel{
    _id:string = "";
    userId:string = "";
    user:UserModel = new UserModel();
    car:CarModel = new CarModel();
    rentDate:Date = new Date();
    returnDate:Date = new Date();
}