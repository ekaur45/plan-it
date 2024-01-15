const jwtUtil = require("../utils/jwt.util");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const checkAuth = async (req,res,next)=>{
    if(req.headers&&req.headers["authorization"]){
        try {
            let authorizationHeader = req.headers["authorization"];
            let token = authorizationHeader.toLocaleLowerCase().indexOf("bearer")>-1 ? authorizationHeader.split(" ")[1] : authorizationHeader;
            let user = jwtUtil.verify(token);
            req.user = user;
            return next();
        } catch (error) {
            
        }
    }
    res.UnAuthorized();
}
module.exports = checkAuth;