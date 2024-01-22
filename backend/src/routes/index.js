const checkAuth = require("../middleware/auth.middleware");
const authRouter = require("./auth.router");
const carRentalRouter = require("./car-rental.router");
const eventRouter = require("./event.router");
const userRouter = require("./user.router");
const venueRouter = require("./venue.router");

const apiRouter = require("express").Router();
apiRouter.use("/auth",authRouter);
apiRouter.use("/car-rental",carRentalRouter);
apiRouter.use("/event",eventRouter);
apiRouter.use("/venue",venueRouter);
apiRouter.use("/users",checkAuth("admin"),userRouter);
module.exports = apiRouter;