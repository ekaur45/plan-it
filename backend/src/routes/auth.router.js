const authController = require("../controllers/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup",authController.signup);
authRouter.get("/all",authController.getAllUsers);


module.exports = authRouter;