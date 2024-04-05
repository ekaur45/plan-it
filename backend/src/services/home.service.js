const { ObjectId } = require("bson");
const CarRatingModel = require("../models/car-rating.model");
const dbConstants = require("../models/db.constants");
const ServiceTypes = require("../models/enums");
const mongoUtil = require("../utils/mongo-db.util");
const carRentalService = require("./car-rental.service");
const userService = require("./user.service");
const venueRentalService = require("./venue.service");
const moment = require("moment");
const eventService = require("./event.service");
const homeService = {};
homeService.getHomeData = async () => {
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const allPromise = await docs.find({ "$nor": [{ "userRole": "admin" }] });
    const all = await allPromise.toArray();
    const carRentals = await carRentalService.getAllCars();//all.filter(e=>e.userType == ServiceTypes.CarRental);
    //carRentals.map(e=>e["images"]=[]);
    //const eventDecorators = all.filter(e=>e.userType == ServiceTypes.Decorator);
    const eventDecorators = await eventService.getAll();
    const venueProviders = await venueRentalService.getAllVenues();//all.filter(e=>e.userType == ServiceTypes.VenueProvider);
    return { carRentals, eventDecorators, venueProviders };
}
homeService.getCarRentals = async ({ name, amount, modelYear }) => {
    const docs = await mongoUtil.runner(dbConstants.CARS);
    let query = {

    };
    if (name) {
        var regex = new RegExp([name].join(""), "i");
        query["name"] =  regex ;    }
    // if (amount > 0) {
    //     query["rent"] = { '$gte': amount };
    // }
    if (amount > 0) {
        query["rent"] = { '$lte': amount };
    }
    if (modelYear > 1900) {
        query["model"] = modelYear;
    }
    const allPromise = await docs.find(query);
    const all = await allPromise.toArray();
    return all;
}
homeService.getVenues = async () => {
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const allPromise = await docs.find({});
    const all = await allPromise.toArray();
    return all;
}
homeService.getMyBookings = async userId => {
    const carBookingsDocs = await mongoUtil.runner(dbConstants.CAR_RENT);
    const eventBookingDocs = await mongoUtil.runner(dbConstants.EVENT_DECORATOR);
    const venueBookingsDoc = await mongoUtil.runner(dbConstants.VENUE_BOOKING);
    const bookingRatingDoc = await mongoUtil.runner(dbConstants.CAR_RATING);
    const _carBookings = await carBookingsDocs.find({ "userId": userId, "rentDate": { "$gte": moment(new Date()).format("YYYY-MM-DD") } }).toArray();
    const carBookings = await Promise.all(_carBookings.map(async cb => {
        const user = await userService.getUserSingle(cb.userId);
        cb["user"] = user;
        const car = await carRentalService.getSingleCar(cb.carId);
        cb["car"] = car;
        cb["car"]["rating"] = await bookingRatingDoc.find({ carId: cb["car"]._id + "" }).toArray();
        const bookingRating = await bookingRatingDoc.find({ bookingId: cb._id + "" }).toArray();
        cb["rating"] = bookingRating;
        return cb;
    }));
    const venueBookingList = await venueBookingsDoc.find({ "userId": userId }).toArray();
    const venueBookings = await Promise.all(venueBookingList.map(async (e) => {
        const user = await userService.getUserSingle(e.userId);
        e["user"] = user;
        e["venue"] = await venueRentalService.getVenue(e.venueId);
        e["venue"]["rating"] = await bookingRatingDoc.find({ venueId: e["venueId"] + "" }).toArray();
        const bookingRating = await bookingRatingDoc.find({ bookingId: e._id + "", venueId: e["venueId"] }).toArray();
        e["rating"] = bookingRating;
        return e;
    }))
    const eventBookingList = await eventBookingDocs.find({ "userId": userId }).toArray();
    const eventBookings = await Promise.all(eventBookingList.map(async e=>{
        const user = await userService.getUserSingle(e.userId);
        e["user"] = user;
        e["event"] = await eventService.getSingle(e.decoratorId);
        e["event"]["rating"] = await bookingRatingDoc.find({ eventId: e["decoratorId"] + "" }).toArray();
        const bookingRating = await bookingRatingDoc.find({ bookingId: e._id + "", eventId: e["decoratorId"] }).toArray();
        e["rating"] = bookingRating;
        return e;
    }));
    return {
        carBookings,
        venueBookings,
        eventBookings
    }
}

/**
 * 
 * @param {CarRatingModel} model 
 */
homeService.addCarRating = async model => {
    const carDocs = await mongoUtil.runner(dbConstants.CAR_RATING);
    const update = await carDocs.insertOne(model);
    return update;
}

homeService.getDecoration = async () => {
    const decDoc = await mongoUtil.runner(dbConstants.EVENT);
    const events = await decDoc.find({}).toArray();
    const result = await Promise.all(events.map(async e => {
        e["user"] = await userService.getUserSingle(e.userId);
        return e;
    }));
    return result;
}
module.exports = homeService;