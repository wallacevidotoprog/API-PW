const express = require('express'); 
const { RegisterUser, LogIn } = require('../controller/UserController');
const { eLogin } = require('../middleware/auth');
const Updata = require('../middleware/UpDataController');
const { INFO } = require('../controller/DataController');
const routers = express.Router();

routers.post("/register", RegisterUser);
routers.post("/login",LogIn)

routers.post("/updata",eLogin,Updata.single('data'))
routers.get("/infodata",eLogin,INFO)
module.exports= routers;