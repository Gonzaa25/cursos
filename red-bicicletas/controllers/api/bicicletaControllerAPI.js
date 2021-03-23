var Bicicleta = require('../../models/bicicleta');

exports.bicicletas_list = function(req,res){
    Bicicleta.find({},function(err,bicis){
        res.status(200).json({bicicletas:bicis});
    });    
}

exports.bicicletas_delete = function(req,res){
    Bicicleta.findByIdAndRemove(req.body.id,function(err,bicis){
        res.status(200).json({bicicleta_eliminada:bicis});
    });
    
}

exports.bicicletas_create = function(req,res){
    console.log('creando bici a agregar');
    var Bici = new Bicicleta({code:req.body.id,color:req.body.color,modelo:req.body.modelo,ubicacion:req.body.ubicacion});
    console.log(Bici);
    Bici.save(Bici);
    res.status(200).json({bicicletas:Bici});
}