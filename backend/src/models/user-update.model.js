class UserUpdateModel{
    firstName
    lastName   
    documents
    constructor(obj={}){
        this.firstName = obj.firstName??"";
        this.lastName = obj.lastName??"";
        this.documents = obj.documents??[];

    }
    get isValid(){
        return this.firstName && this.lastName;
    }
    
}
module.exports = UserUpdateModel;