
const jsonwt = require('jsonwebtoken')
const key =require("../setup/connect").TOKEN_KEY;
// const  uuidv4 =require('uuid/v4');
const { uuid } = require('uuidv4');

exports.newToken = () =>{

    try{
    const token = uuid();
    console.log(token)
    return token
    }
    catch(err){
        return null
    }
}