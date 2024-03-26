const authController = require("../controllers/auth.controller");
const checkAuth = require("../middleware/auth.middleware");

const authRouter = require("express").Router();

authRouter.post("/signup",authController.signup);
authRouter.post("/login",authController.signin);
authRouter.get("/all",authController.getAllUsers);
authRouter.get("/test",authController.sendMail);
authRouter.post("/send-otp",authController.sendMail);
authRouter.post("/verify-otp",authController.verifyUserOtp);
authRouter.post("/reset-password",authController.resetPassword);
authRouter.get("/verifyuseremail",authController.verifyUserEmail);
authRouter.post("/update-profile",checkAuth(),authController.updateProfile);
authRouter.get("/me",checkAuth(),authController.getMyProfile);
authRouter.post("/update-profile-image",checkAuth(),authController.updateProfileImage);
authRouter.get("/me/bookings",checkAuth(),authController.getMyBokings);

module.exports = authRouter;