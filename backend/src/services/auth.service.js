const { ObjectId } = require("bson");
const dbConstants = require("../models/db.constants");
const UserUpdateModel = require("../models/user-update.model");
const UserModel = require("../models/user.model");
const config = require("../utils/config");
const jwtUtil = require("../utils/jwt.util");
const mongoUtil = require("../utils/mongo-db.util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const moment = require("moment");
const { EmailUtil } = require("../utils/email");
const authService = {};


authService.alreadyExist = async (email)=>{
    const users = await mongoUtil.runner(dbConstants.USERS);
    const user = await users.findOne({"email":email});
    return user;
}
authService.generateUserVerificationToken = async (id,email)=>{
 const buffer = crypto.randomBytes(48);
 const token = buffer.toString("hex");
 const userTokenDoc = await mongoUtil.runner(dbConstants.USER_TOKEN);
 await userTokenDoc.insertOne({userId:id,token,dateAdded:new Date(),email});
 await EmailUtil.sendSignup(email,token);
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
    const userOtpDoc = await mongoUtil.runner(dbConstants.USER_OTP);
    authService.sendOtp(rest.email);
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
    const userDoc = await users.findOne({"email":obj.email});
    if (!userDoc) return userDoc;
    const {password,...user} = userDoc;
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
authService.updateProfileImage =async d=>{
    const userDoc = await mongoUtil.runner(dbConstants.USERS);
    const user = userDoc.updateOne({_id:new ObjectId(d.userId)},{$set:{profileImage:d.img}});
    return user;
}
authService.verifyUserEmail = async token =>{
    const userTokenDoc = await mongoUtil.runner(dbConstants.USER_TOKEN);
    const result = await userTokenDoc.findOne({token});
    if(result){
        const userDoc = await mongoUtil.runner(dbConstants.USERS);
        const user = await userDoc.findOne({_id:new ObjectId(result.userId)});
        if(user){
           const resss = await userDoc.updateOne({_id:new ObjectId(result.userId)},{$set:{isEmailVerified:true}});
            const {_id,password,...rest} = user;
            const token = jwtUtil.sign(rest);
            rest["token"] =token;
            return rest;
        }
    }
    return null;
}

authService.resetPassword = async (email,otp,_password) =>{
    const userTokenDoc = await mongoUtil.runner(dbConstants.USER_OTP);
    const result = await userTokenDoc.findOne({email,otp});
    if(result){
        const userDoc = await mongoUtil.runner(dbConstants.USERS);
        const user = await userDoc.findOne({_id:new ObjectId(result.userId)});
        if(user){
           const resss = await userDoc.updateOne({_id:new ObjectId(result.userId)},{$set:{isEmailVerified:true,password:bcrypt.hashSync(_password,10)}});
           await userTokenDoc.updateOne({_id:new ObjectId(result._id.toString())},{$set:{isUsed:true}});
            const {_id,password,...rest} = user;
            const token = jwtUtil.sign(rest);
            rest["token"] =token;
            return rest;
        }
    }
    return null;
}
authService.verifyUserOtp = async (email,otp) =>{
    const userTokenDoc = await mongoUtil.runner(dbConstants.USER_OTP);
    const result = await userTokenDoc.findOne({email,otp});
    if(result){
        const userDoc = await mongoUtil.runner(dbConstants.USERS);
        const user = await userDoc.findOne({_id:new ObjectId(result.userId)});
        if(user){
           const resss = await userDoc.updateOne({_id:new ObjectId(result.userId)},{$set:{isEmailVerified:true}});
           await userTokenDoc.updateOne({_id:new ObjectId(result._id.toString())},{$set:{isUsed:true}});
            const {_id,password,...rest} = user;
            const token = jwtUtil.sign(rest);
            rest["token"] =token;
            return rest;
        }
    }
    return null;
}
authService.sendOtp = async email =>{
    const userDoc = await mongoUtil.runner(dbConstants.USERS);
    const user = await userDoc.findOne({email:email});
    if(!user) return null;
    const otp = await EmailUtil.generateOTP();
    const userOtpDoc = await mongoUtil.runner(dbConstants.USER_OTP);
    const resss = await userOtpDoc.insertOne({email,otp:otp,userId:user._id,createdDate:new Date()});
    return await EmailUtil.sendOtp(email,otp);
}
module.exports = authService;