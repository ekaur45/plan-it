const carRentalController = require("../controllers/car-rental.controller");
const checkAuth = require("../middleware/auth.middleware");

const carRentalRouter = require("express").Router();

carRentalRouter.post("/add",checkAuth,carRentalController.addCar);
carRentalRouter.get("/my-cars",checkAuth,carRentalController.getMyCars);

module.exports = carRentalRouter;