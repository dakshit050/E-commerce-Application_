const jwt=require('jsonwebtoken');
const config=require('../config/config.json');
module.exports.verifyjwtoken=(req,res,next)=>{
    var token;
    if('authorization' in req.headers){
        token =req.headers['authorization'].split(' ')[1];
    }
    if(!token){
        return res.status(401).send({auth:false, message:'no token provided.'});
    }else{
        jwt.verify(token,config.JWT_SECRET,(err,decode)=>{
            if (err){
            return res.status(401).send({ auth: false, message: 'Token authentication failed.' });
            }
        else {
            req._id = decode._id;
            req._type=decode._type;
            next();
        }
        })
    }
}