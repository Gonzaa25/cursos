var Usuario = require('../../models/usuario');

exports.usuario_list = function(req,res){
    Usuario.find({},function(err,usuarios){
        res.status(200).json({usuarios:usuarios});
    });
}

exports.usuario_create = function(req,res){
    var usuario = new Usuario({nombre:req.body.nombre,email:req.body.email,password:req.body.password});
    usuario.save(function(err){
        res.status(200).json({usuario:usuario});
    });
}

exports.usuario_delete = function(req,res){
    Usuario.findByIdAndRemove(req.body.user_id,function(err){
        if (err) res.status(400).send(err);
        res.status(200).send('usuario eliminado!');
    });
}

exports.usuario_reservar = function(req,res){
    Usuario.findById(req.body.id,function(err,usuario){
        if (err||usuario==null) res.status(400).send(err);
        console.log(usuario);
        usuario.reservar(req.body.bici_id,req.body.desde,req.body.hasta,function(err,reser){
            if (err) res.status(400).send(err);
            res.status(200).send('reserva cargada con éxito!');
        });
    });
}