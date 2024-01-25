const { ObjectId } = require("bson");
const dbConstants = require("../models/db.constants");
const UserUpdateModel = require("../models/user-update.model");
const UserModel = require("../models/user.model");
const config = require("../utils/config");
const jwtUtil = require("../utils/jwt.util");
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
    rest["access_token"] = jwtUtil.sign(rest);
    return rest;
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
/**
 * 
 * @param {{email,password}} obj 
 */
authService.signin = async (obj)=>{
    const users = await mongoUtil.runner(dbConstants.USERS);
    const {password,...user} = await users.findOne({"email":obj.email});
    if(!user) return null;
    if(!bcrypt.compareSync(obj.password,password)) return null;
    user["access_token"] = jwtUtil.sign(user);
    return user;
    
}
/**
 * 
 * @param {string} userId 
 * @param {UserUpdateModel} user 
 */
authService.updateProfile = async (userId,user)=>{
    const users = await mongoUtil.runner(dbConstants.USERS);
    const result = await users.updateOne({"_id":new ObjectId(userId)},{$set:{...user,"isProfileCompleted":true}});
    return result;
}

authService.getMyProfile = async userId =>{
    const users = await mongoUtil.runner(dbConstants.USERS);
    const result = await users.findOne({"_id":new ObjectId(userId)});
    return result;
}
module.exports = authService;