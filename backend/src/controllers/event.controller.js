const BookDecoratorModel = require("../models/book-decorator.model");
const { EventClass } = require("../models/event.model");
const eventService = require("../services/event.service");

const eventController = {};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

eventController.bookDecorator = async (req,res,next)=>{
    var model = new BookDecoratorModel(req.body);
    model.userId = req.user._id;
    if(!model.isValid) return res.BadRequest(model,"Invalid request.");
    const result = await eventService.bookDecorator(model);
    return res.Ok(result,"Booked successfuly.");
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

eventController.add = async(req,res,next)=>{
    var model = new EventClass(req.body);
    model.userId = req.user._id;
    if(model.isValid) return res.BadRequest(model,"Invalid requrest.");
    const result = await eventService.add(model);
    return res.Ok(result,"Event added.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

eventController.getAll = async (req,res,next)=>{
    const result = await eventService.getAll();
    return res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

eventController.getBookingSlots = async (req,res,next)=>{
const result = await eventService.getBookingSlots(req.params.id);
return res.Ok(result);

}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

eventController.eventComments = async (req,res,next)=>{
    const result = await eventService.getEventComments(req.query.id);
    return res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

eventController.deleteEvent = async (req,res,next)=>{
    const result = await eventService.deleteEvent(req.query.id);
    return res.Ok(result,"Event deleted.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

eventController.example = (req,res,next)=>{}
module.exports = eventController;