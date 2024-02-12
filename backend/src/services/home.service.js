const dbConstants = require("../models/db.constants");
const ServiceTypes = require("../models/enums");
const mongoUtil = require("../utils/mongo-db.util");
const carRentalService = require("./car-rental.service");
const userService = require("./user.service");

const homeService = {};
homeService.getHomeData = async ()=>{
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const allPromise = await docs.find({"$nor":[{"userRole":"admin"}]});
    const all = await allPromise.toArray();
    const carRentals = all.filter(e=>e.userType == ServiceTypes.CarRental);
    const eventDecorators = all.filter(e=>e.userType == ServiceTypes.Decorator);
    const venueProviders = all.filter(e=>e.userType == ServiceTypes.VenueProvider);
    return {carRentals,eventDecorators,venueProviders};
}
homeService.getCarRentals = async ()=>{
    const docs = await mongoUtil.runner(dbConstants.CARS);
    const allPromise = await docs.find({});
    const all = await allPromise.toArray();
    return all;
}
homeService.getVenues = async ()=>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const allPromise = await docs.find({});
    const all = await allPromise.toArray();
    return all;
}
homeService.getMyBookings = async userId =>{
    const carBookingsDocs = await mongoUtil.runner(dbConstants.CAR_RENT);
    const venueBookingsDoc = await mongoUtil.runner(dbConstants.VENUE_BOOKING);
    const _carBookings = await carBookingsDocs.find({"userId":userId}).toArray();
    const carBookings  = await Promise.all(_carBookings.map(async cb=>{
        const user = await userService.getUserSingle(cb.userId);
        cb["user"] = user;
        const car = await carRentalService.getSingleCar(cb.carId);
        cb["car"] = car;
        return cb;
    }));
    const venueBookings = await venueBookingsDoc.find({"userId":userId}).toArray();
    return {
        carBookings,
        venueBookings
    }
}
module.exports = homeService;