const carRentalController = require("../controllers/car-rental.controller");
const checkAuth = require("../middleware/auth.middleware");

const carRentalRouter = require("express").Router();

carRentalRouter.post("/add",checkAuth(),carRentalController.addCar);
carRentalRouter.get("/my-cars",checkAuth(),carRentalController.getMyCars);
carRentalRouter.get("/all-cars",carRentalController.getAllCars);
carRentalRouter.get("/bookings",checkAuth(),carRentalController.getBookings);
carRentalRouter.post('/rent-car',checkAuth(),carRentalController.rentCar);
carRentalRouter.get('/booking-slots',checkAuth(),carRentalController.carBookingSlots);
carRentalRouter.get("/car-comments",carRentalController.getCarRatings);

module.exports = carRentalRouter;