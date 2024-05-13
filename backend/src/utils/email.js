const nodemailer = require("nodemailer");
const crypto = require("crypto");
const EmailUtil = {};
EmailUtil.sendSignup = async(email,verificationToken)=>{
    const trasport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_APP_PASS
        }
    });
    let html = require("fs").readFileSync("templates/signup.template.html").toString("utf-8");
    html = html.replace("{{EMAIL_VERIFICATION_LINK}}",process.env.ADMIN_LINK+"verfication?verification_token="+verificationToken)
    return new Promise((resolve,reject)=>{
        trasport.sendMail({from:process.env.GMAIL_USER,to:email,subject:"Verification",html:html},(err,info)=>{
            if(err){
                reject(err);
            }else{
                resolve(info);
            }
        })
        
    })
}

EmailUtil.sendOtp = async (email,otp) =>{
    return new Promise((resolve,reject)=>{
        try {
    const trasport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_APP_PASS
        }
    });
    let html = require("fs").readFileSync("templates/otp.template.html").toString("utf-8");
    
    html = html.replace("{{OTP}}",otp);
        
            trasport.sendMail({from:`Pant IT - OTP<${process.env.GMAIL_USER}>`,to:email,subject:"Verification",html:html},(err,info)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(info);
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}


EmailUtil.generateOTP = (_length=6) => new Promise(res =>
	// Uses Node Crypto to genarate cryptographically strong pseudo-random data
	// crypto.randomBytes(size[, callback])
	// For more check 
	// https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback 
	crypto.randomBytes(3, (err, buffer) => {
		res(
			parseInt(buffer.toString("hex"), 16)
				.toString()
				.substr(0, _length)
		);
	})
);
module.exports = {EmailUtil}