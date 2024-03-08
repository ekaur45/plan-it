const eventRouter = require("express").Router();

const eventController = require("../controllers/event.controller.js");
const checkAuth = require("../middleware/auth.middleware.js");
eventRouter.post("/add",checkAuth(),eventController.add);
eventRouter.get("/events",checkAuth(),eventController.getAll);
module.exports = eventRouter;