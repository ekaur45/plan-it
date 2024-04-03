const venueController = require("../controllers/venue.controller");
const checkAuth = require("../middleware/auth.middleware");

const venueRouter = require("express").Router();
venueRouter.post("/add",venueController.add);
venueRouter.get("/venues",venueController.getVenues);
venueRouter.get("/delete-venue",venueController.deleteVenue);
venueRouter.get("/venue-bookings",venueController.getVenues);
venueRouter.get("/venue-comments",venueController.getVenueRatings);
venueRouter.post('/book-venue',checkAuth(),venueController.bookVenue);

module.exports = venueRouter;