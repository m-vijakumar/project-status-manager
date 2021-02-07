exports.githubSessionVerification = (req,res,next)=>{

    if(req.session.user){   
        next();
   }else{
       console.log("githubVerification no")
       return res.json({
           error:true,
           success:false,
           
       })
   }
}