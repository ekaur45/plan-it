const authController = require("../controllers/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup",authController.signup);
authRouter.post("/login",authController.signin);
authRouter.get("/all",authController.getAllUsers);


module.exports = authRouter;