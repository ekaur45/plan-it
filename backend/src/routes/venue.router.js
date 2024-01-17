const venueController = require("../controllers/venue.controller");

const venueRouter = require("express").Router();
venueRouter.post("/add",venueController.add);
venueRouter.get("/venues",venueController.add);

module.exports = venueRouter;