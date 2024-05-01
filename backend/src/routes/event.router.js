const eventRouter = require("express").Router();

const eventController = require("../controllers/event.controller.js");
const checkAuth = require("../middleware/auth.middleware.js");
eventRouter.get("/events",checkAuth(),eventController.getAll);
eventRouter.post("/add",checkAuth(),eventController.add);
eventRouter.post("/book-event",checkAuth(),eventController.bookDecorator);
module.exports = eventRouter;