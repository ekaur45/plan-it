const UserUpdateModel = require("../models/user-update.model");
const UserModel = require("../models/user.model");
const authService = require("../services/auth.service");

const authController = {};
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
authController.signup = async (req,res,next)=>{
    let err = null;
    try {
        const model = new UserModel(req.body);
        if(!model.isValid) return res.BadRequest(model,"All fields are required.");
        const user = await authService.alreadyExist(model.email);
        if(user) return res.BadRequest(model,"User already exist with this email.");
        const result = await authService.signup(model);
        return res.Ok(result);
    } catch (error) {
        err = error;
    }
    return res.ISE(err,"Try later.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.getAllUsers = async (req,res,next)=>{
    const result = await authService.getAllUsers();
    return res.Ok(result);
}

// /**
//  * 
//  * @param {import("express").Request} req 
//  * @param {import("express").Response} res 
//  * @param {import("express").NextFunction} next 
//  */

// authController.updateProfile = async (req,res,next)=>{

// }


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.signin = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!(email&&password)) return res.BadRequest(req.body,"Email/usename and password are required.");
    const result = await authService.signin({email,password});
    if(!result) return res.BadRequest(req.body,"Email/usename or password are invalid.");
    if(!result.isEmailVerified) return res.Response(req.body,"OTP sent. Please verify your email first.",405);
    return res.Ok(result,"Loggedin successful.");
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
authController.updateProfile = async (req,res,next)=>{
    const model = new UserUpdateModel(req.body);
    if(!model.isValid) return res.BadRequest(model);
    const userId = req.user._id;
    const result = await authService.updateProfile(userId,model);
    return res.Ok(result,"Profile updated.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
authController.getMyProfile = async (req,res,next)=>{
    const userId = req.user._id;
    const result = await authService.getMyProfile(userId);
    return res.Ok(result);
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
authController.getMyBokings = async (req,res,next)=>{
    const userId = req.user._id;
    return res.Ok(userId);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
authController.updateProfileImage = async (req,res,next)=>{
    let d = {userId:req.user._id,img:req.body.img};
    const result = await authService.updateProfileImage(d);
    return res.Ok(result,"Profile image updated.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.sendMail = async (req,res,next)=>{
    await authService.generateUserVerificationToken("65df55e181eba4a0bc55ce62",req.query.email??"waqas.ahmad2023@outlook.com");
    return res.Ok();
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.sendMail = async (req,res,next)=>{
    if(!req.body.email) return res.BadRequest({},"Email is required.");
    const result = await authService.sendOtp(req.body.email);
    if(!result) return res.BadRequest({});
    return res.Ok();
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.verifyUserEmail = async (req,res,next)=>{
    const token = req.query.verification_token??"";
    if(!token) return res.BadRequest({},"Invalid request.");
    const result = await authService.verifyUserEmail(token);
    if(!result)return res.BadRequest({},"Invalid request.");
    return res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.resetPassword = async (req,res,next)=>{
    const {email,otp,password} = req.body;
    if(!(email&&otp&&password)) return res.BadRequest({},"Invalid request.");
    const result = await authService.resetPassword(email,otp,password);
    if(!result)return res.BadRequest({},"Invalid request.");
    return res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.verifyUserOtp = async (req,res,next)=>{
    const {email,otp,password} = req.body;
    if(!(email&&otp)) return res.BadRequest({},"Invalid request.");
    const result = await authService.verifyUserOtp(email,otp);
    if(!result)return res.BadRequest({},"Invalid or expired OTP.");
    return res.Ok(result,"OTP verified.");
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.example = async (req,res,next)=>{}
module.exports = authController;