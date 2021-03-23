var mongoose =require('mongoose');
var Bicicleta =require('../../models/bicicleta')


describe('Testing Bicicletas',function(){
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
       Bicicleta.deleteMany({},function(err,succes){
           if(err) console.log(err);
           done();
       });
    });

    describe('Bicicleta.createInstance',()=>{
        it('crea una instanacia de Bicicletas',()=>{
            var bici = Bicicleta.createInstance(1,'negro','playa',[-34.500908, -58.4972602]);
            
            expect(bici.code).toBe(1);
            expect(bici.color).toBe('negro');
            expect(bici.modelo).toBe('playa');
        });
    });

    describe('Bicicleta.allBicis',()=>{
        it('se espera vacio',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                if (err) console.log('error:'+err);
                expect(bicis.length).toBe(0);
                done();
            });   
        });
    });

    describe('Bicicleta.add',()=>{
        it('agregar solo una bicicleta',(done)=>{
            var abici = new Bicicleta({code:1,color:'negro',modelo:'playa',ubicacion:[-34.500908, -58.4972602]});
            Bicicleta.add(abici,function(err,bici){
                if (err) console.log('error:'+err);
                Bicicleta.allBicis(function(err,bicis){
                    expect(bicis.length).toBe(1);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode',()=>{
        it('debe devolver la bici con code 1',(done)=>{
            Bicicleta.allBicis(function (err,bicis){
                expect(bicis.length).toBe(0);
                var abici = new Bicicleta({code:1,color:'negrooo',modelo:'playa',ubicacion:[-34.500908, -58.4972602]});
                Bicicleta.add(abici,function(err,bici){
                    if (err) console.log('error:'+err);
                    Bicicleta.findByCode(1,function(err,bici){
                        expect(bici.code).toBe(abici.code);
                        expect(bici.color).toBe(abici.color);
                        expect(bici.modelo).toBe(abici.modelo);
                        done();
                    })
                });
            });
            
        });
    });

    // describe('Bicicleta.removeByCode',()=>{
    //     it('borrar la bici con codigo 1',(done)=>{
    //         Bicicleta.allBicis(function (err,bicis){
    //             expect(bicis.length).toBe(0);
                
    //             var abici = new Bicicleta({code:1,color:'negro1',modelo:'playa',ubicacion:[-34.500908, -58.4972602]});
    //             Bicicleta.add(abici,function(err,bici){
    //                 if (err) console.log('error:'+err);
    //                 console.log('bicicletas en mongo:'+Bicicleta.allBicis.length);
    //                 Bicicleta.removeByCode(1,function(err,success){
    //                     if (err) console.log('error:'+err);
    //                     expect(Bicicleta.allBicis.length).toBe(1);
    //                     console.log('bicicletas en mongo:'+Bicicleta.allBicis.length);
    //                     done();
    //                 })
    //             });
    //         });
            
    //     });
    // });

    
    
});
// beforeEach(()=>{
//     Bicicleta.allBicis=[];
// })
// describe('Bicicleta.allBicis',()=>{
//     it('comienza vacia',()=>{
//         expect(Bicicleta.allBicis.length).toBe(0);
//     })
// });

// describe('Bicicleta.add',()=>{
//     it('agregamos una',()=>{
//         expect(Bicicleta.allBicis.length).toBe(0);
//         var Bici = new Bicicleta(1,'negro','playa',[-34.500908, -58.4972602]);
//         Bicicleta.add(Bici);
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(Bici);
//     })
// });

// describe('Bicicleta.findById',()=>{
//     it('debe devolver la bici con id 1',()=>{
//         expect(Bicicleta.allBicis.length).toBe(0);
//         var Bici = new Bicicleta(1,'negro','playa',[-34.500908, -58.4972602]);
//         var Bici2 = new Bicicleta(2,'negro','playa',[-34.500908, -58.4972602]);
//         Bicicleta.add(Bici);
//         Bicicleta.add(Bici2);
//         var  targetBici =  Bicicleta.findById(1);
//         expect(targetBici.id).toBe(1);
//         expect(targetBici.color).toBe(Bici.color);
//     })
// });

// describe('Bicicleta.removeById',()=>{
//     it('debe borrar la  bici con id 2',()=>{
//         expect(Bicicleta.allBicis.length).toBe(0);
//         var Bici = new Bicicleta(1,'negro','playa',[-34.500908, -58.4972602]);
//         var Bici2 = new Bicicleta(2,'negro','playa',[-34.500908, -58.4972602]);
//         Bicicleta.add(Bici);
//         Bicicleta.add(Bici2);
//         Bicicleta.removeById(1);
//         expect(Bicicleta.allBicis.length).toBe(1);
//     })
// });