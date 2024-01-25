const CarModel = require("../models/car.model");
const RentCarModel = require("../models/rent-car.model");
const carRentalService = require("../services/car-rental.service");

const carRentalController = {};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

carRentalController.addCar = async (req,res,next)=>{
    const model = new CarModel(req.body);
    if(!model.isValid) return res.BadRequest(model);
    model.userId = req.user._id;
    const result = await carRentalService.addCar(model);
    return res.Ok(result);

}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
carRentalController.getMyCars = async (req,res,next)=>{
    let userId = req.user._id;
    const result = await carRentalService.getMyCars(userId);
    return res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
carRentalController.rentCar = async (req,res,next)=>{
    var model = new RentCarModel(req.body);
    model.userId = req.user._id;
    if(!model.isValid) return res.BadRequest({},"Invalid request.");
    const result = await carRentalService.rentCar(model);
    return res.Ok(result,"Booked successfuly.");
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

carRentalController.example = (req,res,next)=>{}
module.exports = carRentalController;