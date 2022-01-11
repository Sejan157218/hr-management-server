const mysql=require("mysql");
require('dotenv').config();
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE,
});
db.connect((err)=>{
    if(err){
        console.warn(err);
    }
    else{
        console.warn('Connected')
    }
})

module.exports=db;