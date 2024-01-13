class UserModel{
    id
    firstName
    lastName
    email
    username
    password
    phoneNumber
    cnicNumber
    cnicFront
    cnicBack
    isUserVerified
    constructor(obj={}){
        this.firstName = obj.firstName??"";
        this.lastName = obj.lastName??"";
        this.email = obj.email??"";
        this.password = obj.password??"";
    }
    get isValid(){
        return this.firstName && this.lastName && this.email && this.password;
    }
    
}
module.exports = UserModel;