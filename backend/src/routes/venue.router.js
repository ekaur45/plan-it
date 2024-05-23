const venueController = require("../controllers/venue.controller");
const checkAuth = require("../middleware/auth.middleware");

const venueRouter = require("express").Router();
venueRouter.get("/venues",checkAuth(),venueController.getVenues);
venueRouter.get("/delete-venue",venueController.deleteVenue);
venueRouter.get("/venue-bookings",venueController.getVenues);
venueRouter.get("/my-bookings",checkAuth(),venueController.getMyVenues);
venueRouter.get("/venue-comments",venueController.getVenueRatings);

venueRouter.post("/add",checkAuth(),venueController.add);
venueRouter.post('/book-venue',checkAuth(),venueController.bookVenue);
venueRouter.get('/booking-slots/:id',checkAuth(),venueController.getBookingSlots);

module.exports = venueRouter;