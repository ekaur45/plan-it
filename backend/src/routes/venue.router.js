const venueController = require("../controllers/venue.controller");

const venueRouter = require("express").Router();
venueRouter.post("/add",venueController.add);
venueRouter.get("/venues",venueController.getVenues);
venueRouter.get("/venue-bookings",venueController.getVenues);
venueRouter.post('/book-venue',venueController.bookVenue);

module.exports = venueRouter;