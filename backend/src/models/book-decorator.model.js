class BookDecoratorModel{
    userId;
    decoratorId;
    bookingDate;
    bookingTime;
    constructor(obj={}){
        this.decoratorId = obj.decoratorId ?? "";
        this.bookingDate = obj.bookingDate ?? "";
        this.bookingTime = obj.bookingTime ?? "";
    }
    get isValid(){
        return this.userId && this.decoratorId && this.bookingDate && this.bookingTime;
    }
}
module.exports = BookDecoratorModel;