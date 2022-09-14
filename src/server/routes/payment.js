const express = require("express");
const router = express.Router();

router.post("/create",(req,res)=>{
    try{
    res.status(200).send({message:"Payment received"});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;