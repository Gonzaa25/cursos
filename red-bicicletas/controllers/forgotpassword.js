module.exports ={
    forgotpassword_get:function(req,res,err){
        res.render('session/forgotPassword');
    },
    forgotpassword_post:function(req,res,err){
        console.log("enviando mail de recuperación a "+req.body.email);
        res.render('session/forgotPasswordMessage');
    }
}