const { ObjectId } = require("bson");
const BookDecoratorModel = require("../models/book-decorator.model");
const dbConstants = require("../models/db.constants");
const mongoUtil = require("../utils/mongo-db.util");
const moment = require("moment");
const eventService = {};
/**
 * 
 * @param {BookDecoratorModel} model 
 */
eventService.bookDecorator = async model =>{
    const docs = await mongoUtil.runner(dbConstants.EVENT_DECORATOR);
    return await docs.insertOne(model);
}

eventService.add = async model =>{
    const docs = await mongoUtil.runner(dbConstants.EVENT);
    return await docs.insertOne(model);
}
eventService.getAll = async _=>{
    const docs = await mongoUtil.runner(dbConstants.EVENT);
    return await docs.find({}).toArray();
}
eventService.getSingle = async id=>{
    const docs = await mongoUtil.runner(dbConstants.EVENT);
    return await docs.findOne({_id:new ObjectId(id)});
}
eventService.getBookingSlots = async id =>{
    const eventDocs = await mongoUtil.runner(dbConstants.EVENT);
    const event = await  eventDocs.findOne({_id:new ObjectId(id)});
    if(!event) return null;
    const bookingDocs = await mongoUtil.runner(dbConstants.EVENT_DECORATOR);
    const d = moment(new Date()).format("YYYY-MM-DD");
    const bookingList = await bookingDocs.find({decoratorId:event._id.toString(),bookingDate:{$gte:d}}).toArray();
    event["bookings"] = bookingList;
    event["disabledDates"] = bookingList.map(x=>x.bookingDate);
    return event;
}
module.exports = eventService;