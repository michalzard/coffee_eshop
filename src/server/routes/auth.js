const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User=require("../schemas/User");
const {handleValidationErrors,checkForSession, getSessionCookie, deleteSession} = require("../utils");
const Email = require("@sendgrid/mail");
Email.setApiKey(process.env.EMAIL_API_KEY);
const ResetToken = require("../schemas/ResetToken");
const { v4: uuidv4 } = require('uuid');

/*
auth workflow - /auth/
/login - checks db for user checks credentials,returns session ID
/register - checks db for duplicates,saves user object,returns session ID
/session - checks db for existing session object if not found do nothing else log user in
*/

router.post('/register',async (req,res)=>{
try{
const {email,name,password}=req.body;
if(name && email && password){
//find if there's already user with same name or email
const duplicates=await User.find({'$or':[{displayName:name},{email}]});
if(!/^[A-Za-z0-9]*$/.test(name)){res.status(400).send({message:"Username can only contain letters and numbers"});return;}
if(password.length < 5) { res.status(400).send({message:"Password needs to be atleast 5 characters"});return;}
if(duplicates.length>0) {res.status(400).send({message:"Username or email already in use"});return;}
else{
const hashedPw=await bcrypt.hashSync(password,12);
const registeredUser=new User({email,displayName:name,tag:name,password:hashedPw});
if(registeredUser){
const user=await registeredUser.save();
req.session.user_id=registeredUser._id;
res.cookie("session_id",req.session.id,{httpOnly:true,maxAge: 1000 * 60 * 60 * 24, /*1 day*/ });
res.status(200).send({message:"User registered successfully",user});
}
}
}else{
    res.status(400).send({message:"Bad Request"});
}

}catch(err){
    handleValidationErrors(res,err);
}
});

router.post('/login',async(req,res)=>{
try{
const {name,password}=req.body;
const foundUser=await User.findOne({displayName:name});
if(foundUser){
req.session.user_id=foundUser._id;
req.session.save();
const validatedPw=await bcrypt.compare(password,foundUser.password);
if(validatedPw) {
    //remove password field from response
    res.cookie("session_id",req.session.id,{httpOnly:true,maxAge: 1000 * 60 * 60 * 24, /*1 day*/ });
    res.status(200).send({message:"Login successful",user:foundUser});
}
else res.status(400).send({message:"Username or password you entered is incorrect"});  
// }else res.status(401).send({message:"Unauthorized"});  
}else res.status(400).send({message:"Username or password you entered is incorrect"});  
}catch(err){
    handleValidationErrors(res,err);
}
});


router.post('/logout',async (req,res)=>{
try{
    const id = getSessionCookie(req.headers.cookie);
    //clear cookie there removing session on client side and delete session from db
    const session=await deleteSession(id);
    res.clearCookie("session_id");
    if(session.value){res.status(200).send({message:"User successfully logged out!"});}
    else{res.status(200).send({message:"Session expired!"});}
}catch(err){
    handleValidationErrors(res,err);
}
});


/*request send everytime user visits websites
if their last session is still active,go to website,
if not send response back to delete last session and make them log in*/

router.get('/session',async(req,res)=>{
try{
const id = getSessionCookie(req.headers.cookie);
const foundSession=await checkForSession(id);
//load session_id from cookie grab session user
// return user object
if(foundSession){
const{user_id}=foundSession.session;
const user = await User.findById(user_id,{password:0});
if(user)res.status(200).send({message:"Session found",user});
else res.status(404).send({message:"User session expired"});
}else{
    res.status(404).send({message:"User session expired"});
}
}catch(err){
    handleValidationErrors(res,err);
}
});

// Handle password reset via email using sendgrid

router.post("/forgot-password",async(req,res)=>{
try{
    const {recipientAddress} = req.body;
    if(!recipientAddress) res.status(400).send({message:"Bad Request"});
    else if(!/\S+@\S+\.\S+/.test(recipientAddress)) res.status(400).send({message:"Email is invalid"});
    else{
        //lookup if user with certain email exists
    const userViaEmail = await User.findOne({email:recipientAddress});
    if(userViaEmail){
    //create token with expiry date that will be provided as url for email's button
    const generatedToken = uuidv4();

    const resetToken = new ResetToken({
        userId:userViaEmail._id,
        token: generatedToken.toString(),
    });
    if(resetToken){
    resetToken.save();
    const message = {
        to:recipientAddress,//recipient
        from:process.env.EMAIL_SENDER,//sender(lunar app)
        subject:"Lunar Password Reset",
        templateId:process.env.EMAIL_TEMPLATE_ID,
        dynamicTemplateData:{
            email:recipientAddress,
            button_url:`${process.env.DOMAIN || "http://localhost:3000"}/password-reset?token=${generatedToken.toString()}`
        }
    }       
    Email.send(message).then(data=>{
        if(data)res.status(200).send({message:`If email exists,we will send a password reset link`});
    }).catch(err=>{
        handleValidationErrors(res,err);
    });
}else res.status(404).send({message:"Resource not found"});

}else{
    //Cannot find user but
    //Still returns 200 with message ->dont wanna give out this information to client
    res.status(200).send({message:`If email exists,we will send a password reset link`});
}
}
}catch(err){
    handleValidationErrors(res,err);
}
})

router.post("/password-reset",async(req,res)=>{
//grab password from input,
try{
const {token} = req.query;
const {action,newPassword} = req.body;
//check if token expired,if it did 
if(token){    
const expToken = await ResetToken.findOne({token});
switch(action){
    case "validate-token": 
    if(expToken) res.status(200).send({message:"Token active"});
    else res.status(404).send({message:"Token Expired"});
    break;
    case "reset-password":
    if(newPassword.length < 5) res.status(400).send({message:"Password has to be 5 or more characters long "});
    else{
    const updatedUser=await User.findOneAndUpdate({_id:expToken.userId},{password:bcrypt.hashSync(newPassword,12)},{runValidators:true,returnOriginal:false});
    if(updatedUser){
        updatedUser.save();
        expToken.delete();
        res.status(200).send({message:"Password reset success"});
    }else res.status(404).send({message:"Resource unavailable"});
    }
    break;
    default: res.status(400).send({message:"Bad request"});
}

}else res.status(400).send({message:"Bad Request"});    

}catch(err){
    handleValidationErrors(res,err);
}
})

module.exports=router;