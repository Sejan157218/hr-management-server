const mysql=require("mysql");

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'employeelist',
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