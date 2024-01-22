const homeService = require("../services/home.service");

const homeController = {};
homeController.getHomeData = async (req,res,nex)=>{
    const result = await homeService.getHomeData();
    return res.Ok(result);
}
module.exports = homeController;