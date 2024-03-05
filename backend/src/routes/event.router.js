const eventController = require("../controllers/event.controller");
const checkAuth = require("../middleware/auth.middleware");

const eventRouter = require("express").Router();
eventRouter.post("/add",checkAuth(),eventController.addEvent);
eventRouter.get("/events",checkAuth(),eventController.getEvent);
module.exports = eventRouter;