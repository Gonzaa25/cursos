var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var TokenSchema = new Schema({
    _userId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'Usuario'
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        expires:4320
    }
});



module.exports = mongoose.model('Token',TokenSchema);