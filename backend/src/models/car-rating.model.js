class CarRatingModel {
    carId;
    rating;
    userId;
    bookingId;
    venueId;
    comments;
    constructor(obj = {}) {
        this.carId = obj.carId ?? "";
        this.rating = obj.rating ?? 0;        
        this.bookingId = obj.bookingId ?? "";        
        this.venueId = obj.venue?? "";        
        this.comments = obj.comments?? "";        
    }
}

module.exports = CarRatingModel;