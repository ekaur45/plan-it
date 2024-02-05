const dbConstants = require("../models/db.constants");
const VenueModel = require("../models/venue.model");
const mongoUtil = require("../utils/mongo-db.util");

const venueRentalService = {};
/**
 * 
 * @param {VenueModel} obj 
 */
venueRentalService.addVenue = async (obj)=>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const result = await docs.insertOne(obj);
    return result;
}
venueRentalService.getVenues = async (userId)=>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const result = await docs.find({})//.find({"userId":userId})
    return result.toArray();
}

/**
 * 
 * @param {BookVenueModel} model 
 */
venueRentalService.bookVenue = async model =>{
    const docs = await mongoUtil.runner(dbConstants.VENUE_BOOKING);
    return await docs.insertOne(model);
}
module.exports = venueRentalService;