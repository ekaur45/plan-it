const homeController = require("../controllers/home.controller");
const checkAuth = require("../middleware/auth.middleware");

const homeRouter = require("express").Router();
homeRouter.get("/home-data",homeController.getHomeData);
homeRouter.get("/car-rentals",homeController.getCarRentals);
homeRouter.get("/bookings",checkAuth(),homeController.getMyBookings);
module.exports = homeRouter;