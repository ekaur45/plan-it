const UserModel = require("../models/user.model");
const userService = require("../services/user.service");

const userController = {};
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

userController.add = async (req,res,next)=>{
    const model = new UserModel(req.body);
    if(!model.isValid) return res.BadRequest(model,"Invalid request");
    const result = await userService.addUser(model);
    return res.Ok(result);
}

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

userController.checkUserEmail = async (req,res,next)=>{    
    const result = await userService.checkUserEmail(req.params.email);
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