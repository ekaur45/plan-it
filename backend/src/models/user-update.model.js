class UserUpdateModel{
    firstName
    lastName   
    documents
    phoneNumber
    cnicNumber
    cnicFront
    cnicBack
    constructor(obj={}){
        this.firstName = obj.firstName??"";
        this.lastName = obj.lastName??"";
        this.documents = obj.documents??[];
        this.phoneNumber = obj.phoneNumber??"";
        this.cnicNumber = obj.cnicNumber??"";
        this.cnicFront = obj.cnicFront ?? "";
        this.cnicBack = obj.cnicBack ?? "";
    }
    get isValid(){
        return this.firstName && this.lastName;
    }
    
}
module.exports = UserUpdateModel;