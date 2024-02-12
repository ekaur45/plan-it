const homeService = require("../services/home.service");

const homeController = {};
homeController.getHomeData = async (req,res,nex)=>{
    const result = await homeService.getHomeData();
    return res.Ok(result);
}
homeController.getCarRentals = async (req,res,nex)=>{
    const result = await homeService.getCarRentals();
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
module.exports = homeController;