require('dotenv').config()
const mysql=require('mysql');
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pwd",
    database:"shoping"
});
module.exports={
    database:db
};