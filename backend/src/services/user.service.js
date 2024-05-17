const { ObjectId } = require("bson");
const dbConstants = require("../models/db.constants");
const mongoUtil = require("../utils/mongo-db.util");
const moment = require("moment");
const userService = {};
userService.getUsers = async () => {
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const users = await docs.find({});
    const userList = await users.toArray();
    return userList.map((obj) => {
        let { password, ...user } = obj;
        return user;
    })
}
userService.getUserSingle = async (userId) => {
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const user = await docs.findOne({ "_id": new ObjectId(userId) });
    return user;
}
userService.checkUserEmail = async (email) => {
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const user = await docs.findOne({ "email": email });
    return user;
}
userService.approveUser = async (userId) => {
    const docs = await mongoUtil.runner(dbConstants.USERS);
    await docs.updateOne({ "_id": new ObjectId(userId) }, { $set: { "isUserVerified": true } });
}
userService.addUser = async (user) => {
    const docs = await mongoUtil.runner(dbConstants.USERS);
    return await docs.insertOne(user);
}
userService.dashboard = async (user) => {
    if (user.userRole == "admin") {
        const docs = await mongoUtil.runner(dbConstants.USERS);
        const rents = await docs.countDocuments({ "userType": 1 });
        const decors = await docs.countDocuments({ "userType": 2 });
        const venue = await docs.countDocuments({ "userType": 3 });
        const total = await docs.countDocuments({});
        return { total, rents, decors, venue }
    } else {
        if(user.userType == 1){
            const carDocs = await mongoUtil.runner(dbConstants.CARS);
            var query =[
                {
                  '$match': {
                    'userId': {
                      '$eq': user._id
                    }
                  }
                }, {
                  '$set': {
                    'id': {
                      '$toString': '$_id'
                    }, 
                    'rent': {
                      '$toInt': '$rent'
                    }
                  }
                }, {
                  '$unwind': '$userId'
                }, {
                  '$lookup': {
                    'from': 'car_rent', 
                    'localField': 'id', 
                    'foreignField': 'carId', 
                    'as': 'joinData'
                  }
                }, {
                  '$unwind': '$joinData'
                }, {
                  '$group': {
                    '_id': '$joinData.userId', 
                    'rent': {
                      '$sum': '$rent'
                    }
                  }
                }
              ];
              const earning = await carDocs.aggregate(query).toArray();
            const cars = await carDocs.find({"userId":user._id}).toArray();
            const bookingsDocs = await mongoUtil.runner(dbConstants.CAR_RENT);
            const bookings = await bookingsDocs.find({"carId":{"$in":[...cars.map(e=>e._id.toString())]}}).toArray();            
            const pastBookings = bookings.filter(e=>moment(e.rentDate).isBefore(new Date()));
            const futureBookings = bookings.filter(e=>moment(e.rentDate).isAfter(new Date()));
            return {total:cars.length,bookings:bookings.length,pastBookings:pastBookings.length,futureBookings:futureBookings.length,earning:earning.length>0?earning[0].rent:0}
        }
        if(user.userType == 2){
            const decorDocs = await mongoUtil.runner(dbConstants.EVENT);
            const decors = await decorDocs.find({"userId":user._id}).toArray();
            const bookingsDocs = await mongoUtil.runner(dbConstants.EVENT_DECORATOR);
            const bookings = await bookingsDocs.find({"decoratorId":{"$in":[...decors.map(e=>e._id.toString())]}}).toArray();
            const pastBookings = bookings.filter(e=>moment(e.rentDate).isBefore(new Date()));
            return {total:decors.length,bookings:bookings.length,pastBookings:pastBookings.length,pendingBookings:bookings.length-pastBookings.length}
        }
        if(user.userType == 3){
            const venueDocs = await mongoUtil.runner(dbConstants.VENUES);
            const venues = await venueDocs.find({"userId":user._id}).toArray();
            const bookingsDocs = await mongoUtil.runner(dbConstants.VENUE_BOOKING);
            const bookings = await bookingsDocs.find({"venueId":{"$in":[...venues.map(e=>e._id.toString())]}}).toArray();
            const pastBookings = bookings.filter(e=>moment(e.bookingDate).isBefore(new Date()));
            return {total:venues.length,bookings:bookings.length,pastBookings:pastBookings.length,pendingBookings:bookings.length-pastBookings.length}
        }
    }
    return {};
}
module.exports = userService;