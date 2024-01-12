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
    }
}
module.exports = UserModel;