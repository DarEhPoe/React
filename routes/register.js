const express = require('express');
const router = express.Router();
const handleNewUser=require('../controllers/registerController');

router.get("/",handleNewUser.handleNewUser);
module.exports=router;


