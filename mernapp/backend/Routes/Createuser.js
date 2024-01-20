const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator');
router.post("/createuser",[body('email').isEmail(),body('password').isLength({min:5}),body('name').isLength({min:5})],async (req,res)=>{
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
       await User.create({
            name: req.body.name,
            password: req.body.password,
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
        if(!(userData.password===req.body.password)){
            return res.status(400).json({errors: "incorrect password"});
        }
        res.json({success:true});
    }catch( error){
        console.log(error);
        res.json({success:false});
    }
});
module.exports = router;