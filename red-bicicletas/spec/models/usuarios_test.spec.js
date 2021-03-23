var mongoose =require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuario');


describe('Testing Usuarios',function(){
    beforeAll(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true,useUnifiedTopology: true});
        var db = mongoose.connection;
        db.on('error',console.error.bind(console,'MongoDB connection error:'));
        db.once('open',function(){
            console.log('we are conected to test database');
            done();
        });
    });
    afterEach(function(done){
        Reserva.deleteMany({},function(err,succes){
            if(err) console.log(err);
            Usuario.deleteMany({},function(err,succes){
                if(err) console.log(err);
                Bicicleta.deleteMany({},function(err,succes){
                    if(err) console.log(err);
                    done();
                });
            });
        });
    });

    describe('crear reserva',()=>{
        it('debe existir la reserva',(done)=>{
            const usuario = new Usuario({nombre:'Gonzalo'});
            usuario.save();
            const bicicleta = new Bicicleta({code:1,color:'negrooo',modelo:'playa',ubicacion:[-34.500908, -58.4972602]});
            bicicleta.save();
            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate()+1);
            usuario.reservar(bicicleta.id,hoy,mañana,function(err,reserv){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err,reservas){
                    console.log('Reserva creada: '+reservas[0]);
                    expect(reservas.length).toBe(1);
                    //expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe('Gonzalo');
                    done();
                })
            })
            
        })
    });
});