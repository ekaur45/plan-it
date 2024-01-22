const homeController = require("../controllers/home.controller");

const homeRouter = require("express").Router();
homeRouter.get("/home-data",homeController.getHomeData);
module.exports = homeRouter;