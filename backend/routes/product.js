const express = require('express');
const {database}=require('../config/helper');
const router=express.Router();
const jwthelper=require('../config/jwtHelper');
const multer=require('multer');

const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
    }
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jfif'){
        cb(null,true);
    }else{
        cb(new Error("file type not supported"),false);
    }
};
const upload=multer({storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
})
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
router.get('/:id',function(req,res){
    let ID=req.params.id;
    let sql=`SELECT * FROM products WHERE id= ?`;
    database.query(sql,[ID],(err,result) =>{
        if(err){
            throw err;
        }
        res.status(200).json(result);
    });
});

router.post('/',jwthelper.verifyjwtoken,upload.single('productImages'),function(req,res){
    if(req._type.localeCompare("Admin")==0){

        let newProduct=req.body;
        let sql=`INSERT INTO products SET title= ?,image= ?,description= ?,price= ?,quantity= ?,short_desc= ?,cat_id= ?`;
            database.query(sql,[newProduct.title,'uploads/'+req.file.filename,newProduct.description,newProduct.price,newProduct.quantity,newProduct.short_desc,newProduct.cat_id],(err,result)=>{
                if(err){
                    throw err;
                }
                res.status(201).json({
                    message:"New Product added successfully"
                });
            });

    }else{
        res.status(401).json({
            message:"Token authentication failed."
        });
    }
});

router.delete('/:id',jwthelper.verifyjwtoken,function(req,res){
    if(req._type.localeCompare("Admin")==0){
        var id=req.params.id;
        let sql=`DELETE FROM products WHERE id= ?`;
        database.query(sql,[id],(err,result)=>{
            if(err){
                throw err;
            }
            res.status(202).json({
                message:"Product deleted successfully"
            })
        })
    }else{
        res.status(401).json({
            message:"Token authentication failed."
        });
    }
});

router.get('/catagory/:id',(req,res)=>{
    let ID=req.params.id;
    let sql=`SELECT * FROM products WHERE cat_id= ?`;
    database.query(sql,[ID],(err,result) =>{
        if(err){
            throw err;
        }
        res.status(200).json(result);
    });
});
module.exports=router;

