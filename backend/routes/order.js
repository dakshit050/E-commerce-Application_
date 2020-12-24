const express = require('express');
const {database}=require('../config/helper');
const router=express.Router();
const jwthelper=require('../config/jwtHelper');
const productRoutes=require('../routes/product');
const loadash=require('lodash');
router.get('/',jwthelper.verifyjwtoken,function(req,res){
let id=req._id;
let sql=`SELECT products.cat_id,products.description,products.id,products.image,products.images,products.price,orders_details.quantity,products.short_desc,products.title FROM products INNER JOIN orders_details ON products.id=orders_details.prod_id WHERE orders_details.id= ?`;
database.query(sql,[id],(err,result)=>{
    if(err){
        res.status(400).json(err);
    }else if(result){
    res.status(200).json({"data":result});
    }
});
});

router.delete('/',jwthelper.verifyjwtoken,function(req,res){
    let id=req._id;
    let sql=`DELETE FROM orders_details WHERE id=?`;
    database.query(sql,[id],(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else{
        res.status(200).json({"message":"Order Placed Successfully"});
        }
    });
});
 
router.get('/:id',jwthelper.verifyjwtoken,function(req,res){
let prod_id=req.params.id;
let user_id=req._id;
let sql=`SELECT * FROM orders_details WHERE id= ? AND prod_id= ?`;
database.query(sql,[user_id,prod_id],(err,result)=>{
    if(result[0]!=undefined){
        let new_quantity=result[0].quantity+1;
        let sql=`UPDATE orders_details SET quantity= ? WHERE id= ? AND prod_id= ?`;
        database.query(sql,[new_quantity,user_id,prod_id],(err,result)=>{
            if(err){
                res.status(400).json(err);
            }else if(result){
                console.log("Quantity Updated");
            }
        });
    }else{
        let sql=`INSERT INTO orders_details SET id= ?,prod_id= ?,quantity= ?`;
        database.query(sql,[user_id,prod_id,1],(err,result)=>{
            if(err){
                res.status(400).json(err);
            }else if(result){
                console.log("New order created");
            }
        });
    }
    let sql=`SELECT products.cat_id,products.description,products.id,products.image,products.images,products.price,orders_details.quantity,products.short_desc,products.title FROM products INNER JOIN orders_details ON products.id=orders_details.prod_id WHERE products.id= ?`;
    database.query(sql,[prod_id],(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else if(result){
        res.status(200).json({"data":result});
        }
    });
});

});

router.get('/remove/:id',jwthelper.verifyjwtoken,(req,res)=>{
let user_id=req._id;
let prod_id=req.params.id;
let sql=`DELETE FROM orders_details WHERE id= ? AND prod_id= ?`;
database.query(sql,[user_id,prod_id],(err,result)=>{
if(err){
res.status(400).json(err);
}else if(result){
    res.status(200).json({message:'Product Removed.'});
}
});
});

router.post('/update',jwthelper.verifyjwtoken,function(req,res){
    const data=req.body;
    let user_id=req._id;
    let prod_id=data.id;
    let quantity=data.quantity;
    let sql=`UPDATE orders_details SET quantity= ? WHERE id= ? AND prod_id= ?`;
    database.query(sql,[quantity,user_id,prod_id],(err,result)=>{
    if(err){
    res.status(400).json(err);
    }else if(result){
        res.status(200).json({message:'Quantity Updated.'});
    }
    });
    });
module.exports=router;