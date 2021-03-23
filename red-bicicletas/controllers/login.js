

module.exports ={
    login_get:function(req,res,err){
        res.render('session/login');
    },
    login_post:function(req,res,err){
        console.log('se ingreso con el mail '+req.body.username+' password: '+req.body.password);
        res.redirect('/');
    }
}