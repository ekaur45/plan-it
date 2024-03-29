const userService = require("../services/user.service");

const userController = {};
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

userController.add = async (req,res,next)=>{}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

userController.getUsers = async (req,res,next)=>{
    const result = await userService.getUsers();
    res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

userController.getUserSingle = async (req,res,next)=>{    
    const result = await userService.getUserSingle(req.params.id);
    res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

userController.approveUser = async (req,res,next)=>{
    const {userId} = req.body;
    if(!userId) return res.BadRequest({},"UserId is required.");
    const result = await userService.approveUser(userId);
    res.Ok(result);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

userController.example = (req,res,next)=>{}


module.exports = userController;