var passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook-token');
const Usuario = require('../models/usuario');

passport.use(new localStrategy(
    function (email, password, done) {
        Usuario.findOne({ email: email }, function (err, usuario) {
            if (err) { return done(err); }
            if (!usuario) {
                return done(null, false, { message: 'Username incorrecto.' });
            }
            if (!usuario.validPassword(password)) {
                return done(null, false, { message: 'Password incorrecto.' });
            }
            return done(null, usuario);
        });
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback"
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile.emails[0].value);
        Usuario.findOneOrCreateByGoogle(profile, function (err, result) {
            return done(err, result);
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
},
    function (request, accessToken, refreshToken, profile, done) {
        try {
            Usuario.findOneOrCreateByFacebook(profile, function (err, result) {
                return done(err, result);
            });
        } catch (err2) {
            console.log(err2);
            return done(err2, null);

        }

    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Usuario.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;