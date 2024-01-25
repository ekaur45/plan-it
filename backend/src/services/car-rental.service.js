const CarModel = require("../models/car.model");
const dbConstants = require("../models/db.constants");
const mongoUtil = require("../utils/mongo-db.util");

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
module.exports = carRentalService;