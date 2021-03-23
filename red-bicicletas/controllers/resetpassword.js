
module.exports ={
    resetpassword_get:function(req,res,err){
        res.render('session/resetPassword',{usuario: {email:{}},errors:{password:{}}});
    },
    resetpassword_post:function(req,res,err){
        res.send({message:'reseteo de clave con exito!'});
    }
}