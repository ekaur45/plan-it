const nodemailer = require("nodemailer");
"kmdv yvef eekq iowy";
const EmailUtil = {};
EmailUtil.sendSignup = async(email,verificationToken)=>{
    const trasport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"ekaur45@gmail.com",
            pass:"kmdv yvef eekq iowy"
        }
    });
    let html = require("fs").readFileSync("templates/signup.template.html").toString("utf-8");
    html = html.replace("{{EMAIL_VERIFICATION_LINK}}",process.env.ADMIN_LINK+"verfication?verification_token="+verificationToken)
    return new Promise((resolve,reject)=>{
        trasport.sendMail({from:"ekaur45@gmail.com",to:email,subject:"Verification",html:html},(err,info)=>{
            if(err){
                reject(err);
            }else{
                resolve(info);
            }
        })
    })
}
module.exports = {EmailUtil}