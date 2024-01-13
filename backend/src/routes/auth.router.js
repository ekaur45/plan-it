const authController = require("../controllers/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/signup",authController.signup);


module.exports = authRouter;