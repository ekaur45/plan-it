const homeController = require("../controllers/home.controller");

const homeRouter = require("express").Router();
homeRouter.get("/home-data",homeController.getHomeData);
homeRouter.get("/car-rentals",homeController.getCarRentals);
module.exports = homeRouter;