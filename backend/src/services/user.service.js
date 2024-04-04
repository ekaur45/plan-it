const {ObjectId} = require("bson");
const dbConstants = require("../models/db.constants");
const mongoUtil = require("../utils/mongo-db.util");

const userService = {};
userService.getUsers = async ()=>{
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const users = await docs.find({});
    const userList = await users.toArray();
    return userList.map((obj)=>{
        let {password,...user} = obj;
        return user;
    })
}
userService.getUserSingle = async (userId)=>{
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const user = await docs.findOne({"_id":new ObjectId(userId)});
    return user;
}
userService.checkUserEmail = async (email)=>{
    const docs = await mongoUtil.runner(dbConstants.USERS);
    const user = await docs.findOne({"email":email});
    return user;
}
userService.approveUser = async (userId)=>{
    const docs = await mongoUtil.runner(dbConstants.USERS);
    await docs.updateOne({"_id":new ObjectId(userId)},{$set:{"isUserVerified":true}});
}
userService.addUser = async (user)=>{
    const docs = await mongoUtil.runner(dbConstants.USERS);
    return await docs.insertOne(user);
}
module.exports = userService;