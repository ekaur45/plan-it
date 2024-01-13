const UserModel = require("../models/user.model");

const authController = {};
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
authController.signup = (req,res,next)=>{
    const model = new UserModel(req.body);
    if(!model.isValid) return res.BadRequest(model,"All fields are required.");
    res.Ok(req.body);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

authController.example = (req,res,next)=>{}
module.exports = authController;