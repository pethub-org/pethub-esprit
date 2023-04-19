const router =   require('express').Router();
const bcrypte = require('bcrypt')
const userModel = require('../models/User');

//update
router.put("/:id",async (req,res)=>{
   if (req.body.userId == req.params.id || req.body.isAdmin){
        // regenere password mara okhra
       if(req.body.password){
           try{
            const salt = await bcrypte.genSalt(10);
            req.body.password = await bcrypte.hash(req.body.password, salt);
           }
           catch (err){
            return res.status(500).json(err)
           }
       }
       //update taw 
       try{
        const user = await userModel.findByIdAndUpdate(req.params.id,{$set:req.body,});
        res.status(200).json ("account has been updated")
       }
       catch  (err){
          return res.status(500).json(err)

       }

   }
   else {
    return res.status(403).json("you can update only your account")
   }
})

//delete
router.delete("/:id",async (req,res)=>{
    if (req.body.userId == req.params.id || req.body.isAdmin){
        //delete
        try{
         const user = await userModel.findByIdAndDelete({_id:req.params.id});
         res.status(200).json ("account has been deleted")
        }
        catch  (err){
           return res.status(500).json(err)
 
        }
 
    }
    else {
     return res.status(403).json("you can delete only your account")
    }
 })
 

//get
router.get("/:id",async(req,res)=>{
   
    try{
        const user = await userModel.findById(req.params.id)
        res.status(200).json(user)

    }
    catch(err){
        return res.status(500).json(err)
    }
})

//get All
router.get("/",async(req,res)=>{
   
    try{
        const users = await userModel.find();
        res.status(200).json(users)

    }
    catch(err){
        return res.status(500).json(err)
    }
})



//follow 
router.put("/:id/follow", async(req,res)=>{
      // mouch nafss id ok
     if(req.body.userId !== req.params.id){
        try{
            const user = await userModel.findById(req.params.id);
            const currentUser = await userModel.findById(req.body.userId)
            //follow 
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followersPeople:req.params.id}})
                res.status(200).json("user has been followed")
            }
            //deja 3amelou follow
            else{
                 res.status(403).json("already follow this person")

            }
        }
        catch(err){
             res.status(500).json(err)

        }
     }
     //nafss id  no
     else {
        res.status(403).json("you can't follow yourself !")
     }
 })

 // unfllow

router.put("/:id/unfollow", async(req,res)=>{
    // mouch nafss id ok
   if(req.body.userId !== req.params.id){
      try{
          const user = await userModel.findById(req.params.id);
          const currentUser = await userModel.findById(req.body.userId)
          //unfollow 
          if(user.followers.includes(req.body.userId)){
              await user.updateOne({$pull:{followers:req.body.userId}})
              await currentUser.updateOne({$pull:{followersPeople:req.params.id}})
              res.status(200).json("user has been unfollowed")
          }
          //deja 3amelou unfollow
          else{
               res.status(403).json("you already unfollow this person")

          }
      }
      catch(err){
           res.status(500).json(err)

      }
   }
   //nafss id  no
   else {
      res.status(403).json("you don't follow this person !")
   }
})

module.exports = router