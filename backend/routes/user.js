const express=require('express');
const {database}=require('../config/helper');
const  jwt=require('jsonwebtoken');
const PasswordHash= require('password-hash');
const jwthelper=require('../config/jwtHelper');
const ctruser=require('../config/controller');
const router=express.Router();
const config=require('../config/config.json');
router.post('/signup',function(req,res){
    const data=req.body;
    const pass=data.password;
    const hash=PasswordHash.generate(pass);
    if(data!=undefined){
        let sql=`SELECT id FROM users WHERE email= ?`;
        database.query(sql,[data.email],(err,results)=>{
            if(results.length>0){
                res.status(405).json({status:false,message:'Email Allready Exist.'});
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
        res.status(405).json({status:false,message:"Please Fill the Form"});
    }
   });
   
   router.post('/google',function(req,res){
    const user=req.body;
    if(user!==undefined){
        let sql=`SELECT id FROM users WHERE email= ?`;
        database.query(sql,user.email,(error,results)=>{
            if(results[0]!==undefined){
                res.status(200).json({"token":jwt.sign(
                    {_id:results[0].id},
                    config.JWT_SECRET,
                    {expiresIn:config.JWT_EXP}
                    
                )});
            }else{
                let sql=`INSERT INTO users SET googleid= ?,username=?,email=?,photoUrl= ?`;
                database.query(sql,[user.id,user.name,user.email,user.photoUrl],(err,result)=>{
                    if(err){
                        throw err;
                    }
                   
                     res.status(200).json({"token":jwt.sign(
                        {_id:result.insertId},
                        config.JWT_SECRET,
                        {expiresIn:config.JWT_EXP}
                        
                    )});
                });

            }  
        })

    }

   })


   router.post('/login',ctruser.authenticate);
   router.get('/profile',jwthelper.verifyjwtoken,ctruser.userprofile);
   module.exports=router;