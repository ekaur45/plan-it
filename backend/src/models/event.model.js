class EventClass{
    name
    price
    description
    files
    userId
    constructor(obj={}){
        this.name = obj.name ?? "";
        this.price = obj.price ?? "";
        this.description = obj.description ?? "";
        this.files = obj.files ?? [];
    }
    get isValid(){
        return this.name && this.price == 0&&this.description&&this.files.length>0;
    }
}

module.exports = {EventClass}