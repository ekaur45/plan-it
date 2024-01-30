class BookVenueModel{
    userId;
    venueId;
    bookingDate;
    bookingEndDate;
    //bookingTime;
    constructor(obj={}){
        this.venueId = obj.venueId ?? "";
        this.bookingDate = obj.bookingDate ?? "";
        this.bookingEndDate = obj.bookingEndDate ?? "";
        this.bookingTime = obj.bookingTime ?? "";
    }
    get isValid(){
        return this.userId && this.venueId && this.bookingDate && this.bookingEndDate
    }
}

module.exports = BookVenueModel;