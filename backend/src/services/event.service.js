const { ObjectId } = require("bson");
const BookDecoratorModel = require("../models/book-decorator.model");
const dbConstants = require("../models/db.constants");
const mongoUtil = require("../utils/mongo-db.util");
const moment = require("moment");
const userService = require("./user.service");
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
eventService.getAll = async id=>{
    const docs = await mongoUtil.runner(dbConstants.EVENT);
    let q = {};
    if(id)
        q["userId"] = id;    
    const events =  await docs.find(q).toArray();
    return await Promise.all(events.map(async e=>{
        e["user"] = await userService.getUserSingle(e.userId);
        return e;
    }))
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
eventService.getEventComments = async id =>{
    const eventRatingDocs = await mongoUtil.runner(dbConstants.CAR_RATING);
    const rating = await eventRatingDocs.find({eventId:id}).toArray();
    return await Promise.all(rating.map(async rate=>{
        rate["user"] = await userService.getUserSingle(rate.userId);
        return rate;
    }))
}
eventService.deleteEvent = async id =>{
    const docs = await mongoUtil.runner(dbConstants.EVENT);
    return await docs.deleteOne({_id:new ObjectId(id)});
}

eventService.addEvent = async (model)=>{
    const docs = await mongoUtil.runner(dbConstants.EVENT);
    return await docs.insertOne(model);
}

eventService.getEvent = async ()=>{
    const docs = await mongoUtil.runner(dbConstants.EVENT);
    return await docs.find().toArray();
}
module.exports = eventService;