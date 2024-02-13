const  Sequelize  = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASS,{
   host: process.env.DB_HOST,
   dialect:process.env.DB_DIALECT
});
connection.authenticate().then(()=>{
    console.log("\x1b[33m[MySQL]\x1b[36m Connection OK \x1b[0m");
}).catch((err) =>{ console.log("\x1b[33m[MySQL]\x1b[31m" +err+"\x1b[0m");})

module.exports = connection; 