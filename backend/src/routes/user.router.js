const userController = require("../controllers/user.controller");

const userRouter = require("express").Router();
userRouter.post("/add",userController.add);
userRouter.get("/user/:id",userController.getUserSingle);
userRouter.get("/list",userController.getUsers);
userRouter.post("/approve",userController.approveUser);

module.exports = userRouter;