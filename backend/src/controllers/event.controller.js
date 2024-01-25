const BookDecoratorModel = require("../models/book-decorator.model");
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

eventController.example = (req,res,next)=>{}
module.exports = eventController;