const mongoUtil = require("./mongo-db.util")
const dbConstants = require("../models/db.constants");
const UserModel = require("../models/user.model");
const ServiceTypes = require("../models/enums");
const bcrypt= require("bcrypt");
module.exports ={
    mongo:mongoUtil,
    getColl: async function(collName){
        return await this.mongo.runner(collName);
    },
    accounts: async function(){
        const accDocs = await this.getColl(dbConstants.USERS);
        await accDocs.drop();
        let user1 =  {firstName:"Car",lastName:"Rental",email:"car-rental@email.com",username:"car-rental",password:bcrypt.hashSync("123456",10),userRole:"user",userType:ServiceTypes.CarRental,isProfileCompleted:true,isUserVerified:true};
        await accDocs.insertOne(user1);
        let user2 =  {firstName:"Decorator",lastName:"Provider",email:"decorator@email.com",username:"decorator",password:bcrypt.hashSync("123456",10),userRole:"user",userType:ServiceTypes.Decorator,isProfileCompleted:true,isUserVerified:true};
        await accDocs.insertOne(user2);
        let user3 =  {firstName:"Venue",lastName:"Provider",email:"venue@email.com",username:"venue",password:bcrypt.hashSync("123456",10),userRole:"user",userType:ServiceTypes.VenueProvider,isProfileCompleted:true,isUserVerified:true};
        await accDocs.insertOne(user3);
        let adminUser = {firstName:"Admin",lastName:"Admin",email:"admin@email.com",username:"venue",password:bcrypt.hashSync("123456",10),userRole:"admin",userType:null,isProfileCompleted:true,isUserVerified:true};
        await accDocs.insertOne(adminUser);
    }
}