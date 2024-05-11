import CarBookingModel from "../car-booking.model";
import VenueBookingModel from "../venue/venue-booking.model";

export default class MyBookingModel{
    carBookings:CarBookingModel[] = [];
    venueBookings:VenueBookingModel[] = [];
    eventBookings:any[] = [];
}