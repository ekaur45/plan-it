const CarRatingModel = require("../models/car-rating.model");
const homeService = require("../services/home.service");

const homeController = {};
homeController.getHomeData = async (req,res,nex)=>{
    const result = await homeService.getHomeData();
    return res.Ok(result);
}
homeController.getCarRentals = async (req,res,nex)=>{
    const {name,amount,maxPrice,modelYear} = req.query;
    const result = await homeService.getCarRentals({name,amount,modelYear});
    return res.Ok(result);
}
homeController.getMyBookings = async (req,res,nex)=>{
    const userId = req.user._id;
    const result = await homeService.getMyBookings(userId);
    return res.Ok(result);
}
homeController.getVenues = async (req,res,next)=>{
    const {name,monthlyPay,capacity} = req.query;
    const result = await homeService.getVenues({name,monthlyPay,capacity});
    return res.Ok(result);
}
homeController.addCarRating = async (req,res,next)=>{
    const carRatingModel = new CarRatingModel(req.body);
    carRatingModel.userId = req.user._id;
    const result = await homeService.addCarRating(carRatingModel);
    return res.Ok(result);
}
homeController.getDecoration = async (req,res,next)=>{
    const result = await homeService.getDecoration(req.query);
    return res.Ok(result);
}
module.exports = homeController;