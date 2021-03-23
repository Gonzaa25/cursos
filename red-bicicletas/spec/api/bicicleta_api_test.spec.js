var Bicicleta =require('../models/../../models/bicicleta');
var  request  = require('request');
var  server = require('../../bin/www');


var base_url ='http://localhost:3000/api/bicicletas';
describe('Bicicleta API',()=>{
    beforeEach(()=>{
        console.log('testeando…');
    }); 
    describe('GET BICICLETAS /',()=>{
         it('Status 200',()=>{
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new  Bicicleta(1,'negro','playa',[-34.500908, -58.4972602]);
            Bicicleta.add(a);
            request.get(base_url,function(error,res,body){
                expect(res.statusCode).toBe(200);
                expect(Bicicleta.allBicis.length).toBe(1);
            });
         });
    });
    describe('POST BICICLETAS /',()=>{
        it('Status 200',(done)=>{
           var headers  =  {'content-type':'application/json'};
           var aB = '{ "id":3,"color":"rojo","modelo":"playa","ubicacion":[-34.500908, -58.4972602]}';
           request.post({
               headers:headers,
               url:`${base_url}/create`,
               body: aB
           },function(error,res,body){
               expect(res.statusCode).toBe(200);
               expect(Bicicleta.findById(3).color).toBe("rojo");
               done();
           });
        });
   });
});


