const { ObjectId } = require("bson");
const dbConstants = require("../models/db.constants");
const VenueModel = require("../models/venue.model");
const mongoUtil = require("../utils/mongo-db.util");
const userService = require("./user.service");
const moment = require("moment");
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
venueRentalService.geMytVenues = async (userId)=>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const result = docs.find({"userId":userId})
    const venues = await result.toArray();
    const vid = venues.map(e=>e._id.toString());
    const bookingDocs = await mongoUtil.runner(dbConstants.VENUE_BOOKING);
    const boookings = await bookingDocs.find({venueId:{"$in":[...vid]}}).toArray();
    return await Promise.all(boookings.map(async b=>{
        b["user"] = await userService.getUserSingle(b.userId);
        b["venue"] = await venueRentalService.getVenue(b.venueId);
        return b;
    }));
}
venueRentalService.getVenue = async (id)=>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const result = await docs.findOne({"_id":new ObjectId(id)})
    return result;
}

venueRentalService.getAllVenues = async (userId)=>{
    const docs = await mongoUtil.runner(dbConstants.VENUES);
    const result = await docs.find({})//.find({"userId":userId})
    const venues = await result.toArray();
    return await Promise.all(venues.map(async venue=>{
        venue["user"] = await userService.getUserSingle(venue["userId"]);
        return venue;
    }))
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
venueRentalService.getVenueBookingSlots = async id =>{
    const venueDocs = await mongoUtil.runner(dbConstants.VENUES);
    const venue = await  venueDocs.findOne({_id:new ObjectId(id)});
    if(!venue) return null;
    const bookingDocs = await mongoUtil.runner(dbConstants.VENUE_BOOKING);
    const d = moment(new Date()).format("YYYY-MM-DD");
    const bookingList = await bookingDocs.find({venueId:venue._id.toString(),bookingDate:{$gte:d}}).toArray();
    venue["bookings"] = bookingList;
    venue["disabledDates"] = bookingList.map(x=>x.bookingDate);
    return venue;
}
module.exports = venueRentalService;