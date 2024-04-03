const { ObjectId } = require("bson");
const dbConstants = require("../models/db.constants");
const VenueModel = require("../models/venue.model");
const mongoUtil = require("../utils/mongo-db.util");
const userService = require("./user.service");

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
    const result = await docs.find({"userId":userId})
    return result.toArray();
}
venueRentalService.getVenue = async (id)=>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const result = await docs.findOne({"_id":new ObjectId(id)})
    return result;
}

venueRentalService.getAllVenues = async (userId)=>{
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

venueRentalService.deleteVenue = async _id =>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    return await docs.deleteOne({"_id":new ObjectId(_id)});
}
venueRentalService.getVenueRatings = async _id =>{
    const bookingRatingDoc = await mongoUtil.runner(dbConstants.CAR_RATING);
    const brating =await bookingRatingDoc.find({ venueId: _id }).toArray();
    const rating = await Promise.all(brating.map(async e=>{
        e["user"] = await userService.getUserSingle(e["userId"]);
        return e;
    }))
    return rating;
}
module.exports = venueRentalService;