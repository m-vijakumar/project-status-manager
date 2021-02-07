const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const key =require("../../setup/connect").TOKEN_KEY;
const userController = require("../../controllers/user")
const sessionHelper = require("../../helpers/sessionHelper")
const passport = require("passport")
require('../../helpers/githubAuth')
const User = require("../../models/User")

router.get("/users",async(req,res)=>{

    await User.find({})
        .then(r=>{
            console.log(r)
        }).catch(err=>{
            console.log(err)
        })
})

router.get("/verify/github",sessionHelper.githubSessionVerification,(req,res)=>{

    res.json({
        error:false,
        success:true,
        msg:req.session.user.id
    })
});


// @type    POST
//@route    /api/auth/login
// @desc    starting router
// @access  PUBLIC
router.post("/getstatus",userController.getStatus);

// @type    GET
//@route    /api/auth/github
// @desc    starting router
// @access  PUBLIC
router.get("/github",passport.authenticate('github', {scope : ['gist']}));

// @type    POST
//@route    /api/auth/github/verify
// @desc    starting router
// @access  PUBLIC
router.get("/github/callback",passport.authenticate('github',{failureRedirect : '/'}),userController.githubAuthverify);


// @type    GET
//@route    /api/auth/logout
// @desc    starting router
// @access  PRAVITE 

router.post("/getuser", userController.getUser )

// @type    DELETE
//@route    /api/auth/logout
// @desc    starting router
// @access  PRAVITE 

router.delete("/logout", userController.logout )

// // @type    DELETE
// //@route    /api/auth/logout
// // @desc    starting router
// // @access  PRAVITE 

// router.delete("/logout",tokenHelper.sessionVerfiy, userController.logout )

module.exports =router;