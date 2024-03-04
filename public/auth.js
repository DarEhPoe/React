const express=require('express');
const router=express.Router();
const handleLogins=require('../controllers/authController');

router.post('/',handleLogins.handleLogin);
module.exports=router