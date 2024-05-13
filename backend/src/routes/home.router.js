const homeController = require("../controllers/home.controller");
const checkAuth = require("../middleware/auth.middleware");

const homeRouter = require("express").Router();
homeRouter.get("/home-data",homeController.getHomeData);
homeRouter.get("/car-rentals",homeController.getCarRentals);
homeRouter.get("/venues",homeController.getVenues);
homeRouter.get("/decorations",homeController.getDecoration);
homeRouter.get("/bookings",checkAuth(),homeController.getMyBookings);
homeRouter.post("/add-car-rating",checkAuth(),homeController.addCarRating);
module.exports = homeRouter;