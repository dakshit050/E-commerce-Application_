const express=require('express');
const {database}=require('../config/helper');
const passport=require('passport');
const PasswordHash= require('password-hash');
const jwthelper=require('../config/jwtHelper');
const ctruser=require('../config/controller');
const router=express.Router();
router.post('/signup',function(req,res){
    const data=req.body;
    const pass=data.password;
    const hash=PasswordHash.generate(pass);
    if(data!=undefined){
        let sql=`SELECT id FROM users WHERE email='${data.email}'`;
        database.query(sql,(err,results)=>{
            if(results.length>0){
                res.status(404).json({status:false,message:'Email Allready Exist.'});
            }else{
                
                let sql=`INSERT INTO users (id,googleid,username,password,email,DOB) Values(
                    '',
                    '',
                    '${data.username}',
                    '${hash}',
                    '${data.email}',
                    ${data.Birthday}
                )`; 
                database.query(sql,(err,result)=>{
                    if(err){
                        throw err;
                    }
                    return res.status(200).json({status:true,message:'Profile Created'});
                });

            }
        })
    }else{
        res.status(404).json({status:false,message:"Please Fill the Form"});
    }
   });
   router.get('/google',passport.authenticate('google',{
       scope:['profile','email']
   }));
   router.get('/google/redirect',ctruser.googleOuth);
   router.post('/login',ctruser.authenticate);
   router.get('/profile',jwthelper.verifyjwtoken,ctruser.userprofile);
   module.exports=router;