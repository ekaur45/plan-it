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

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.updateProfile = async (req,res,next)=>{

}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.example = (req,res,next)=>{}
module.exports = authController;