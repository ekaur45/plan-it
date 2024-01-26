const { ObjectId } = require("bson");
const CarModel = require("../models/car.model");
const dbConstants = require("../models/db.constants");
const RentCarModel = require("../models/rent-car.model");
const mongoUtil = require("../utils/mongo-db.util");
const userService = require("./user.service");

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
carRentalService.getMyCars = async (userId)=>{
    const carDocs = await mongoUtil.runner(dbConstants.CARS);
    const result = await carDocs.find({"userId":userId})
    return result.toArray();
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
        return car;
    });
}

carRentalService.getMyRental = async (userId) => {
    const docs = await mongoUtil.runner(dbConstants.CAR_RENT);
    const carRentCollection = docs.find({"userId":userId});
    const carRentList = await carRentCollection.toArray();
    return carRentList.map(async cr=>{
        cr["car"] = await this.getSingleCar(cr.cardId);
        return cr;
    });
}

carRentalService.getSingleCar = async carId =>{
    const carDoc = await mongoUtil.runner(dbConstants.CARS);
    const carDocsCollection = await carDoc.findOne({"_id":new ObjectId(carId)});
    return carDocsCollection;
}
module.exports = carRentalService;