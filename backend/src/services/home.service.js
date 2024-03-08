const { ObjectId } = require("bson");
const CarRatingModel = require("../models/car-rating.model");
const dbConstants = require("../models/db.constants");
const ServiceTypes = require("../models/enums");
const mongoUtil = require("../utils/mongo-db.util");
const carRentalService = require("./car-rental.service");
const userService = require("./user.service");
const venueRentalService = require("./venue.service");

const homeService = {};
homeService.getHomeData = async ()=>{
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const allPromise = await docs.find({"$nor":[{"userRole":"admin"}]});
    const all = await allPromise.toArray();
    const carRentals = await carRentalService.getAllCars();//all.filter(e=>e.userType == ServiceTypes.CarRental);
    //carRentals.map(e=>e["images"]=[]);
    const eventDecorators = all.filter(e=>e.userType == ServiceTypes.Decorator);
    const venueProviders =await venueRentalService.getAllVenues();//all.filter(e=>e.userType == ServiceTypes.VenueProvider);
    return {carRentals,eventDecorators,venueProviders};
}
homeService.getCarRentals = async ({name,minPrice,maxPrice,modelYear})=>{
    const docs = await mongoUtil.runner(dbConstants.CARS);
    let query = {
        
    };
    if(name){
        query["name"] = {'$regex': name}
    }
    if(minPrice >0){
        query["rent"] = {'$gte': minPrice};
    }
    if(maxPrice>0){
        query["rent"] = {'$lte': maxPrice};
    }
    if(modelYear>1900){
        query["model"] = modelYear;
    }    
    const allPromise = await docs.find(query);
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
    const bookingRatingDoc = await mongoUtil.runner(dbConstants.CAR_RATING);
    const _carBookings = await carBookingsDocs.find({"userId":userId}).toArray();
    const carBookings  = await Promise.all(_carBookings.map(async cb=>{
        const user = await userService.getUserSingle(cb.userId);
        cb["user"] = user;
        const car = await carRentalService.getSingleCar(cb.carId);
        cb["car"] = car;
        const bookingRating = await bookingRatingDoc.find({bookingId:cb._id+""}).toArray();
        cb["rating"] = bookingRating;
        return cb;
    }));
    const venueBookings = await venueBookingsDoc.find({"userId":userId}).toArray();
    return {
        carBookings,
        venueBookings
    }
}

/**
 * 
 * @param {CarRatingModel} model 
 */
homeService.addCarRating = async model=>{
    console.log(model);
    const carDocs = await mongoUtil.runner(dbConstants.CAR_RATING);    
    const update = await carDocs.insertOne(model);
    return update;
}
module.exports = homeService;