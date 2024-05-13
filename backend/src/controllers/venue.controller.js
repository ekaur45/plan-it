const BookVenueModel = require("../models/book-venue.model");
const VenueModel = require("../models/venue.model");
const venueRentalService = require("../services/venue.service");

const venueController = {};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.add = async (req,res,next)=>{
    const model = new VenueModel(req.body);
    model.userId = req.user?._id;
    if(!model.isValid) return res.BadRequest(model,"Invalid request.");
    const result = await venueRentalService.addVenue(model);
    return res.Ok(result,"Venue added succesfully.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.getVenues = async (req,res,next)=>{
    //let id = req.user._id;
    const result = await venueRentalService.getVenues();
    return res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.bookVenue = async (req,res,next)=>{
    const model = new BookVenueModel(req.body);
    model.userId = req.user._id;
    if(!model.isValid) return res.BadRequest({},"Invalid request.");
    const result = await venueRentalService.bookVenue(model);
    return res.Ok(result,"Booked successfuly.");
}
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.deleteVenue = async (req,res,next)=>{
    let id = req.query.id;
    const result = await venueRentalService.deleteVenue(id);
    return res.Ok(result,"Venue deleted successfuly.");
}
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.getVenueBookin = async (req,res,next)=>{
    res.InternalServerError();
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.getVenueRatings = async (req,res,next)=>{
    const venueId = req.query.id;
    const result = await venueRentalService.getVenueRatings(venueId);
    return res.Ok(result);
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.getBookingSlots = async (req,res,next)=>{
    const result = await venueRentalService.getVenueBookingSlots(req.params.id);
    return res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

venueController.example = (req,res,next)=>{}
module.exports = venueController;