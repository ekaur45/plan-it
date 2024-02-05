const authController = require("../controllers/auth.controller");
const checkAuth = require("../middleware/auth.middleware");

const authRouter = require("express").Router();

authRouter.post("/signup",authController.signup);
authRouter.post("/login",authController.signin);
authRouter.get("/all",authController.getAllUsers);
authRouter.post("/update-profile",checkAuth(),authController.updateProfile);
authRouter.get("/me",checkAuth(),authController.getMyProfile);
authRouter.get("/me/bookings",checkAuth(),authController.getMyBokings);

module.exports = authRouter;