var mongoose = require('mongoose');
var moment = require('moment');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;

const Token = require('../models/token');
const mailer = require('../mailer/mailer');
const { userInfo } = require('os');

var Schema = mongoose.Schema;


const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio!']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio!'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'El correo no tiene el formato correcto!'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio!']
    },
    googleId: String,
    facebookId: String,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {
    message: 'El {PATH}  ya existe con otro usuario.'
})
usuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
})

usuarioSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function (idBici, desde, hasta, cb) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: idBici, desde: desde, hasta: hasta });
    console.log(reserva);
    reserva.save(cb);
    return moment(this.hasta).diff(moment(this.desde), 'days') + 1;
};

usuarioSchema.methods.resetPassword = function (cb) {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;
    token.save(function (err) {
        if (err) { return cb(err) }

        const mailOptions = {
            from: 'no-replay@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password',
            text: 'Hola,\n\n para verificar haga click en este link.\n' + 'http://localhost:3000' + '\/resetPassword\/' + token.token + '.\n'
        }

        mailer.sendMail(mailOptions, function (err) {
            if (err) { return console.log(err.message) }
            console.log('Se envio el mail de bienvenida a ' + email_destination + ".");
        })
        cb(null);
    });
}

usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log("perfil del usuario!:" + condition);
    self.findOne({
        $or: [
            { 'googleId': condition.id }, { 'email': condition.emails[0].value }
        ]
    }, (err, result) => {
        if (result) {
            callback(err, result);
        } else {
            console.log('---------CONDITION-----------');
            console.log(condition);
            let values = {};
            values.googleId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado = true;
            values.password = condition._json.sub;
            console.log('---------VALUE-----------');
            console.log(values);
            self.create(values, (err, result) => {
                if (err) { console.log(err) }
                return callback(err, result);
            });

        }
    });
}

usuarioSchema.statics.findOneOrCreateByFacebook = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log("perfil del usuario!:" + condition);
    self.findOne({
        $or: [
            { 'facebookId': condition.id }, { 'email': condition.emails[0].value }
        ]
    }, (err, result) => {
        if (result) {
            callback(err, result);
        } else {
            console.log('---------CONDITION-----------');
            console.log(condition);
            let values = {};
            values.facebookId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado = true;
            values.password = crypto.randomBytes(16).toString('hex');
            console.log('---------VALUE-----------');
            console.log(values);
            self.create(values, (err, result) => {
                if (err) { console.log(err) }
                return callback(err, result);
            });

        }
    });
}

usuarioSchema.methods.enviar_email_bienvenida = function () {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;

    token.save(function (err) {
        if (err) { return console.log(err.message) }

        const mailOptions = {
            from: 'no-replay@redbicicletas.com',
            to: email_destination,
            subject: 'Verificacion de cuenta',
            text: 'Hola,\n\n para verificar haga click en este link.\n' + 'http://localhost:3000' + '\/token\/confirmation\/' + token.token + '.\n'
        }

        mailer.sendMail(mailOptions, function (err) {
            if (err) { return console.log(err.message) }
            console.log('Se envio el mail de bienvenida a ' + email_destination + ".");
        })
    });
}

module.exports = mongoose.model('Usuario', usuarioSchema);