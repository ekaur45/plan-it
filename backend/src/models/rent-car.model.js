class RentCarModel{
    carId;
    userId;
    rentDate;
    returnDate;
    numberOfDays;
    constructor(obj={}){
        this.carId = obj.carId ?? "";
        this.rentDate = obj.rentDate ?? new Date();
        this.returnDate = obj.returnDate ?? new Date();
        this.numberOfDays = obj.numberOfDays ?? 1;
    }
    get isValid(){
        return this.carId && this.rentDate && this.returnDate && this.userId && this.numberOfDays;
    }
}

module.exports = RentCarModel;