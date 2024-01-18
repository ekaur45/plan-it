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
module.exports = userService;