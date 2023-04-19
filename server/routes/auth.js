const router = require('express').Router();
const userModel = require('../models/User');
const bcrypte = require('bcrypt')

//register
router.post("/register", async(req,res)=>{

    try{
        // new password
        const salt = await bcrypte.genSalt(10);
        const hashPassword = await bcrypte.hash(req.body.password,salt);
        // new user
        const user = await new userModel({
            username : req.body.username,
            email : req.body.email,
            password :hashPassword
        })
        //save user 
        const userNew = await user.save();
        res.status(200).json(userNew)

    }
    catch (err){
        res.status(500).json(err)    }   
   
})

//login 
router.post("/login", async(req,res)=>{
    try{
    // verify email
    const user = await userModel.findOne({email:req.body.email});
    !user &&  res.status(404).json("user not found")
    
    //verify pwd
    const validPasswird = await bcrypte.compare(req.body.password, user.password)
    !validPasswird &&  res.status(400).json("wrong password")
    

    res.status(200).json(user)
    }
    catch (err){
        res.status(500).json(err)
    }

})



module.exports = router;