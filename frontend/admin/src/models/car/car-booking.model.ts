import UserModel from "../user/user.model";
import CarModel from "./car.model";

export default class CarBookingModel{
    _id:string = "";
    userId:string = "";
    user:UserModel = new UserModel();
    car:CarModel = new CarModel();
    startDate:Date = new Date();
    endDate:Date = new Date();
}