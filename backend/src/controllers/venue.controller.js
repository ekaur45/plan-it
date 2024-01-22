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
    if(!model.isValid) return res.BadRequest(model);
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

venueController.example = (req,res,next)=>{}
module.exports = venueController;