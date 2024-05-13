class UserModel{
    _id
    firstName
    lastName
    email
    username
    password
    phoneNumber
    cnicNumber
    cnicFront
    cnicBack
    userType // Venue Provider, Car Rental, Decorator
    userRole
    isUserVerified
    isProfileCompleted
    isEmailVerified
    createdAt
    constructor(obj={}){
        this.firstName = obj.firstName??"";
        this.lastName = obj.lastName??"";
        this.email = obj.email??"";
        this.password = obj.password??"";
        this.userType = obj.userType??"";
        this.userRole = obj.userRole??"user";
        this.isEmailVerified = false;
        this.createdAt = new Date();
    }
    get isValid(){
        return this.firstName && this.lastName && this.email && this.password && (this.userRole =="admin" ? true : this.userType);
    }
    
}
module.exports = UserModel;