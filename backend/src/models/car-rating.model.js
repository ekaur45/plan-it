class CarRatingModel {
    carId;
    rating;
    userId;
    bookingId;
    venueId;
    eventId;
    comments;
    constructor(obj = {}) {
        this.carId = obj.carId ?? "";
        this.rating = obj.rating ?? 0;        
        this.bookingId = obj.bookingId ?? "";        
        this.venueId = obj.venue?? "";        
        this.eventId = obj.event?? "";        
        this.comments = obj.comments?? "";        
    }
}

module.exports = CarRatingModel;