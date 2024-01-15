const jsonwebtoken = require('jsonwebtoken');
const config = require("./config");
const SECRET = config.JWT_SECRET || "";

const jwtUtil = {};

jwtUtil.sign = (obj)=>{
    return jsonwebtoken.sign(obj,SECRET);
}
jwtUtil.verify = (token)=>{
    return jsonwebtoken.verify(token,SECRET);
}

module.exports = jwtUtil;