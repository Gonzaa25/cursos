var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports ={
    confirmationGet: function(req,res,next){
        console.log('dato obtenido:'+req.params.token);
        Token.findOne({ token:req.params.token }, function(err,token){
            if(!token) return res.status(400).send({type:'not-verified',msg:'No encontramos un usuario con este token,solicitelo nuevamente.'});
            console.log('token encontrado!'+token._userId);
            Usuario.findById(token._userId,function(err,usuario){
               if(!usuario) return res.status(400).send({msg:'No encontramos al usuario.'});
               if(usuario.verificado) return res.redirect('/usuarios');
               usuario.verificado= true;
               console.log('usuario encontrado y marcado para verificar')
               usuario.save(function(err){
                   if(err) {return res.status(400).send({msg:err.message})}
                   res.redirect('/usuarios');
               })
            });
        });
    }
}