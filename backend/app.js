require('./config/passportConfig');
const productRoutes=require('./routes/product');
const express=require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const app=express();
const passport=require('passport');
const userRoutes=require('./routes/user');
const orderRoutes=require('./routes/order');
const jwthelper=require('./config/jwtHelper');
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors({
    origin:"*",
    methods:['GET','POST','PATCH','DELETE','PUT'],
    
    
}));
app.use('/uploads',express.static('uploads'));
app.use('/home',productRoutes);
app.use('/user',userRoutes);
app.use('/order',orderRoutes)
app.listen('3000',() =>{
    console.log("Server started ");
});
module.exports = app;