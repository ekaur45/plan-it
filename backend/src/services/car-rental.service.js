const { ObjectId } = require("bson");
const CarModel = require("../models/car.model");
const dbConstants = require("../models/db.constants");
const RentCarModel = require("../models/rent-car.model");
const mongoUtil = require("../utils/mongo-db.util");
const userService = require("./user.service");
const ServiceTypes = require("../models/enums");

const carRentalService = {};
/**
 * 
 * @param {CarModel} obj 
 */
carRentalService.addCar = async (obj)=>{
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    const result = await carDocs.insertOne(obj);
    return result;
}
carRentalService.getMyCars = async (userId,{name,minPrice,maxPrice,modelYear})=>{
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    let query = {
        "userId":userId
    };
    if(name){
        query["name"] = {'$regex': name}
    }
    if(minPrice >0){
        query["rent"] = {'$gte': minPrice};
    }
    if(maxPrice>0){
        query["rent"] = {'$lte': maxPrice};
    }
    if(modelYear>1900){
        query["model"] = {'$gte': modelYear};
    }
    const result = await carDocs.find(query)
    return result.toArray();
}
carRentalService.getAllCars = async ()=>{
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    const result = await carDocs.find();
    const cars = await result.toArray();
    return await Promise.all(cars.map(async cr=>{
        cr["user"] = await userService.getUserSingle(cr.userId);
        return cr
    }))
}

/**
 * 
 * @param {RentCarModel} model 
 */
carRentalService.rentCar = async (model) =>{
    const docs = await mongoUtil.runner(dbConstants.CAR_RENT);
    return await docs.insertOne(model);
}

/**
 * 
 * @param {String} userId 
 */
carRentalService.getMyCarsRental = async (userId)=>{
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    const carsCollection = carDocs.find({ "userId": userId });
    const carsList = await carsCollection.toArray();
    const carIds = carsList.map(e => e._id);
    const docs = await mongoUtil.runner(dbConstants.CAR_RENT);
    const carBookingCollection = docs.find({ "carId": { "$in": [...carIds] } });
    const carBookingList = await carBookingCollection.toArray();
    return carBookingList.map(async cb => {
        const user = await userService.getUserSingle(cb.userId);
        cb["user"] = user;
        const car = carsList.filter(c => c._id == cb.carId);
        cb["car"] = car&&car.length>0?car[0]:null;
        return cb;
    });
}

carRentalService.getMyRental = async (userId) => {
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    const cars = await carDocs.find({userId}).toArray();
    const docs = await mongoUtil.runner(dbConstants.CAR_RENT);
    let q = {"carId":{"$in":cars.map(e=>e._id.toString())}};
    const carRentCollection = docs.find(q);
    const carRentList = await carRentCollection.toArray();

    return  await Promise.all(carRentList.map(async cr=>{
        cr["car"] = await carRentalService.getSingleCar(cr.carId);
        cr["user"] = await userService.getUserSingle(cr.userId);
        return cr;
    }));
}

carRentalService.getSingleCar = async carId =>{
    const carDoc = await mongoUtil.runner(dbConstants.CARS);
    const carDocsCollection = await carDoc.findOne({"_id":new ObjectId(carId)});
    if(carDocsCollection){
        const carRatingDocs = await mongoUtil.runner(dbConstants.CAR_RATING);
        const carRating = carRatingDocs.find({carId:carDocsCollection._id+""}).toArray();
        carDocsCollection["rating"] = carRating;
    }
    return carDocsCollection;
}


//This function is used to get bookings from the carRentalService
carRentalService.getBookings = async (userId,userRole,userType)=>{
    //Get the carRental document from the mongoUtil
    const carBookingDocs = await mongoUtil.runner(dbConstants.CAR_RENT);
    //If the userRole is admin, get all the bookings from the carBookingDocs
    if(userRole == "admin"){
        const carBookingCollection = await carBookingDocs.find();
        const carBookingList = await carBookingCollection.toArray();
        //Map the carBookingList and get the user and car details
        return await Promise.all(carBookingList.map(async cb => {
            const user = await userService.getUserSingle(cb.userId);
            cb["user"] = user;
            const car = await carRentalService.getSingleCar(cb.carId);
            cb["car"] = car;
            return cb;
        }));
    }
    // //If the userRole is user and userType is not ServiceTypes.CarRental, get myCarsRental from the carRentalService
    if(userRole == "user" && userType != ServiceTypes.CarRental){
        return await this.getMyCarsRental(userId);
    }
    // //If the userRole is user and userType is ServiceTypes.CarRental, get myCarsRental from the carRentalService
    if(userRole == "user" && userType == ServiceTypes.CarRental){
        return await carRentalService.getMyRental(userId);
    }
}
carRentalService.getCarBookingSlots = async _id =>{
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    const car = await carDocs.findOne({_id:new ObjectId(_id)});
    if(!car) return null;
    const bookingDocs = await mongoUtil.runner(dbConstants.CAR_RENT);
    const d = new Date();
    const dq = d.getFullYear()+"-"+(d.getMonth()+1>9?"":"0")+(d.getMonth()+1)+"-"+(d.getDate()+1>9?"":"0")+d.getDate();
    const bookingsList = await bookingDocs.find({carId:car._id.toString(),"rentDate":{$gte:dq}}).toArray();
    car["bookings"] = bookingsList;
    car["disabledDates"] = bookingsList.map(x=>x.rentDate);
    return car;    
}
carRentalService.getCarRatings = async id =>{
    const carRatingDocs = await mongoUtil.runner(dbConstants.CAR_RATING);
    const ratingList =  await carRatingDocs.find({"carId":id}).toArray();
    return await Promise.all(ratingList.map(async rate=>{
        rate["user"] = await userService.getUserSingle(rate.userId);
        return rate;
    }))
}
carRentalService.deleteCar = async id=>{
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    return await carDocs.deleteOne({_id:new ObjectId(id)});
}
module.exports = carRentalService;