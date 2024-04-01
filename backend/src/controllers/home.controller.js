const CarRatingModel = require("../models/car-rating.model");
const homeService = require("../services/home.service");

const homeController = {};
homeController.getHomeData = async (req,res,nex)=>{
    const result = await homeService.getHomeData();
    return res.Ok(result);
}
homeController.getCarRentals = async (req,res,nex)=>{
    const {name,minPrice,maxPrice,modelYear} = req.query;
    const result = await homeService.getCarRentals({name,minPrice,maxPrice,modelYear});
    return res.Ok(result);
}
homeController.getMyBookings = async (req,res,nex)=>{
    const userId = req.user._id;
    const result = await homeService.getMyBookings(userId);
    return res.Ok(result);
}
homeController.getVenues = async (req,res,next)=>{
    const result = await homeService.getVenues();
    return res.Ok(result);
}
homeController.addCarRating = async (req,res,next)=>{
    const carRatingModel = new CarRatingModel(req.body);
    carRatingModel.userId = req.user._id;
    const result = await homeService.addCarRating(carRatingModel);
    return res.Ok(result);
}
homeController.getDecoration = async (req,res,next)=>{
    const result = await homeService.getDecoration();
    return res.Ok(result);
}
module.exports = homeController;