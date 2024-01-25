class BookVenueModel{
    userId;
    venueId;
    bookingDate;
    bookingTime;
    constructor(obj={}){
        this.venueId = obj.venueId ?? "";
        this.bookingDate = obj.bookingDate ?? "";
        this.bookingTime = obj.bookingTime ?? "";
    }
    get isValid(){
        return this.userId && this.venueId && this.bookingDate && this.bookingTime;
    }
}

module.exports = BookVenueModel;