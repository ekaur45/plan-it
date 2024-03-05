const BookDecoratorModel = require("../models/book-decorator.model");
const dbConstants = require("../models/db.constants");
const mongoUtil = require("../utils/mongo-db.util");

const eventService = {};
/**
 * 
 * @param {BookDecoratorModel} model 
 */
eventService.bookDecorator = async model =>{
    const docs = await mongoUtil.runner(dbConstants.EVENT_DECORATORS);
    return await docs.insertOne(model);
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