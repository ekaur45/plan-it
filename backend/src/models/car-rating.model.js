class CarRatingModel {
    carId;
    rating;
    userId;
    bookingId;
    constructor(obj = {}) {
        this.carId = obj.carId ?? "";
        this.rating = obj.rating ?? 0;        
        this.bookingId = obj.bookingId ?? "";        
    }
}

module.exports = CarRatingModel;