const userController = require("../controllers/user.controller");

const userRouter = require("express").Router();
userRouter.get("/user/:id",userController.getUserSingle);
userRouter.get("/list",userController.getUsers);
userRouter.post("/add",userController.add);
userRouter.post("/approve",userController.approveUser);

module.exports = userRouter;