const express=require('express');
const router=express.Router();
const LogOutWebTokens=require('../controllers/logOutController')

router.get('/',LogOutWebTokens.LogOutWebToken);
module.exports=router