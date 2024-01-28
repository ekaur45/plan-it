export default class UserModel{
    _id:string = "";
    firstName:string = "";
    lastName:string = "";
    email:string = "";
    phoneNumber:string = "";
    username:string = "";
    userType:number = 0;
    userRole:string = "";
    isUserVerified:boolean = false;
    documents:string[] = [];
}