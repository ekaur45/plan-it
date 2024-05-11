const authController = require("../controllers/auth.controller");
const checkAuth = require("../middleware/auth.middleware");

const authRouter = require("express").Router();
authRouter.get("/all",authController.getAllUsers);
authRouter.get("/test",authController.sendMail);
authRouter.get("/verifyuseremail",authController.verifyUserEmail);
authRouter.get("/me",checkAuth(),authController.getMyProfile);
authRouter.get("/me/bookings",checkAuth(),authController.getMyBokings);

authRouter.post("/signup",authController.signup);
authRouter.post("/login",authController.signin);
authRouter.post("/send-otp",authController.sendMail);
authRouter.post("/verify-otp",authController.verifyUserOtp);
authRouter.post("/reset-password",authController.resetPassword);
authRouter.post("/update-profile",checkAuth(),authController.updateProfile);
authRouter.post("/update-profile-image",checkAuth(),authController.updateProfileImage);


module.exports = authRouter;