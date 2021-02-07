const mongoose =require("mongoose");
const bcrypt = require('bcryptjs');
var encrypt = require('mongoose-encryption');
const { stringify } = require("uuid");
// const secret  = require("../setup/connect").TOKEN_KEY;
const  Schema = mongoose.Schema;
const userSchema = new Schema({

    githubId:{
        type:String,
        required:false
    },
    username:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default :Date.now
    },
    projects:[{
        title:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        },
        Date:{
            type:Date,
            default :Date.now
        },

        todos:[{
            task:{
                type:String,
                require:true
            },
            status:{
                type:Boolean,
                require:true,
                default:false
            },
            Date:{
                type:Date,
                default :Date.now
            }
        }]

    }]
    
})

userSchema.statics.checkIfUserExists = async(email)=>{

    return await User
      .findOne({email:email},{_v:0})
      .then((result)=>{
        //   console.log(result)
          return result;
      })
      .catch((err)=>{
          throw err;
      })
  };
  
  userSchema.statics.checkIfUserExistsWithId = async(userId)=>{
  
    return await User
      .findOne({_id:userId},{password:0,_v:0})
      .then((result)=>{
        //   console.log(result)
          return result;
      })
      .catch((err)=>{
          throw err;
      })
  };

  userSchema.statics.getUserDateWithId = async(userId)=>{
  
    return await User
      .findOne({_id:userId},{password:0,__v:0,_id:0,emailVerification :0 , mobileVerification :0})
      .then((result)=>{
        //   console.log(result)
          return result;
      })
      .catch((err)=>{
          throw err;
      })
  };


 userSchema.statics.updateStatus = async(id , data)=>{

    return await User.findOneAndUpdate({_id : id}, data,{new:true ,password: 0, _v: 0})
                    .then((result)=>{
                        console.log(result)
                        return result.emailVerification
                    })
                    .catch((err)=>{
                        console.log(err)
                       return  err;
                    })
 }
 
const User = module.exports  = mongoose.model("GithubUsers",userSchema);