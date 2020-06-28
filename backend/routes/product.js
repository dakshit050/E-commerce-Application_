const express = require('express');
const {database}=require('../config/helper');
const router=express.Router();
const jwthelper=require('../config/jwtHelper');
router.get('/',function(req,res){
    let sql='SELECT * FROM products';
    database.query(sql,(err,result) =>{
        if(err){
            throw err;
        }
        res.status(200).json({
            products:result
        });
    });
});
router.get('/:id',jwthelper.verifyjwtoken,function(req,res){
    let ID=req.params.id;
    let sql=`SELECT * FROM products WHERE id= ${ID}`;
    database.query(sql,(err,result) =>{
        if(err){
            throw err;
        }
        res.status(200).json(result);
    });
});
module.exports=router;

