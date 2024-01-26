const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {body,validationResult} = require('express-validator');
const bcrypt= require('bcryptjs');
const jwtsecret = "abcd123456";
router.post("/createuser",[body('email').isEmail(),body('password').isLength({min:5}),body('name').isLength({min:5})],async (req,res)=>{
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const salt= await bcrypt.genSalt(10);
        let secpassworrd = await bcrypt.hash(req.body.password,salt);
       await User.create({
            name: req.body.name,
            password: secpassworrd,
            email: req.body.email,
            location : req.body.location


        })
        res.json({success: true});
    }catch( error){
        console.log(error);
        res.json({success:false});
    }
});
router.post("/loginuser",[body('email').isEmail(),body('password').isLength({min:5})],async (req,res)=>{

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
    let email=req.body.email;
    try{
        
        
        let userData=  await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "user does not exist"});
        }
        const pwd = await bcrypt.compare(req.body.password,userData.password);
        if(!(pwd)){
            return res.status(400).json({errors: "incorrect password"});
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authtoken = jwt.sign(data,jwtsecret);
        
        res.json({success:true,authtoken:authtoken});
    }catch( error){
        console.log(error);
        res.json({success:false});
    }
});
module.exports = router;