const User = require("../models/User");
const jsonwt =require("jsonwebtoken");
const cookie =require("cookie-parser");
const key =require("../setup/connect").TOKEN_KEY;
const tokenHelper = require("../helpers/tokenHelper")
const passport = require('passport')

exports.ss =(req,res)=>{

    return res.send(req.session.user)
}

exports.vv =(req,res)=>{

    return res.send(req.session.user)
}

exports.logout =(req,res)=>{

    console.log("in logout")
    try {
        req.logOut();
        res.status(200).clearCookie('*', {
            path: '/'
          });
        req.session.destroy();
        // console.log(req.session.verification.id)
        return res.json({
            error:false,
            msg:"logout"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            error:true,
            msg:"error in logout"
        })
    }
    

}

exports.getStatus = async(req,res)=>{

   await User.findOne({_id:req.body.id},{password:0,_v:0})
        .then((result)=>{
            console.log(result)
            return res.json({
                error:false,
                status :{ email : result.emailVerification.status , phone : result.mobileVerification.status }
            })
           
        }).catch((err)=>{
            console.log(err)
            return res.json({
                error:true,
                msg:"Internal Error....!"
            })
        })
}


// exports.githubAuth =(req,res)=>{

//     // passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    
// }

exports.githubAuthverify = (req,res)=>{
    
        const userData = {
            id : req.user.id,
            githubId : req.user.githubId,
            username :req.user.username,
            accessToken : req.user.accessToken
        }

        console.log("githubAuthverify")
        console.log(userData)
        req.session.user = userData

        console.log(  req.session.githubAuth)
        res.redirect("http://localhost:3000/dashboard")
          
    }


exports.getUser =async (req,res) =>{
    console.log(req.body.id)
    await User.getUserDateWithId(req.body.id)

            .then((result)=>{
                console.log("getuser   :")
                console.log(result)
                return res.json({
                    error:false,
                    user:result
                })
            }).catch((err)=>{
                console.log(err)
                return res.json({
                    error:true,
                    msg:"Error"
                })
            })

}