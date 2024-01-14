const dbConstants = require("../models/db.constants");
const UserModel = require("../models/user.model");
const config = require("../utils/config");
const mongoUtil = require("../utils/mongo-db.util");
const bcrypt = require("bcrypt");
const authService = {};


authService.alreadyExist = async (email)=>{
    const users = await mongoUtil.runner(dbConstants.USERS);
    const user = await users.findOne({"email":email});
    return user;
}

/**
 * 
 * @param {UserModel} data 
 * @returns 
 */
authService.signup = async (data)=>{
    const users = await mongoUtil.runner(dbConstants.USERS);
    data.password = bcrypt.hashSync(data.password,10);
    data.isProfileCompleted = false;
    const {id, ...rest} = data;
    const result = await users.insertOne(rest);
    return result;
}
authService.getAllUsers = async ()=>{
    const users = await mongoUtil.runner(dbConstants.USERS);
    const _users = users.find({});
    const usersList = await _users.toArray();
    return usersList.map(user=>{
        let {password,...rest} = user;        
        return rest
    })
}
module.exports = authService;