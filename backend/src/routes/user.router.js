const userController = require("../controllers/user.controller");

const userRouter = require("express").Router();
userRouter.post("/add",userController.add);
userRouter.get("/list",userController.getUsers);

module.exports = userRouter;