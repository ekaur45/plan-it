class RentCarModel{
    carId;
    userId;
    rentDate;
    constructor(obj={}){
        this.carId = obj.carId ?? "";
        this.rentDate = obj.rentDate ?? "";
    }
    get isValid(){
        return this.carId && this.rentDate && this.userId;
    }
}

module.exports = RentCarModel;