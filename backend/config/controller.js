const passport= require('passport');
const  jwt=require('jsonwebtoken');
const {database}= require('../config/helper');
const config=require('../config/config.json');
const lodash=require('lodash');
module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            return res.status(400).json(err);
        } 
        else if(user){
            return res.status(200).json({"token":jwt.sign(
                {_id:user.id,
                _type:user.Role},
                config.JWT_SECRET,
                {expiresIn:config.JWT_EXP}
                
            )});
        }else{
            return res.status(404).json(info);
        }
    })(req,res);

}
module.exports.googleOuth=(req,res)=>{
passport.authenticate('google',(err,user,info)=>{
    if(err){
        return res.status(400).json(err);
    }
    else if(user){
        return res.status(200).json({"token":jwt.sign(
            {_id:user.id},
            config.JWT_SECRET,
            {expiresIn:config.JWT_EXP}
        )});
    }
})(req,res);
}

module.exports.userprofile=(req,res,next)=>{
let id=req._id;
let sql=`SELECT * FROM users WHERE id='${id}'`;
database.query(sql,(err,result)=>{
    if(!result[0]){
        return res.status(404).json({ status: false, message: 'User record not found.' });
    }else{
        return res.status(200).json({ status: true,user:lodash.pick(result[0],['username','email','photoUrl','DOB'])});
    }
});
}
