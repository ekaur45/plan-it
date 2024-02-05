const dbConstants = require("../models/db.constants");
const ServiceTypes = require("../models/enums");
const mongoUtil = require("../utils/mongo-db.util");

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
module.exports = homeService;