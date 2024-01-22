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
    if(!result) return res.BadRequest(req.body,"Email/usename or password are invalid.")
    return res.Ok(result);
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
    return res.Ok(result);
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.example = async (req,res,next)=>{}
module.exports = authController;