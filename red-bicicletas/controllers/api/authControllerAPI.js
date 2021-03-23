const jwt = require('jsonwebtoken');
var Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');

module.exports = {
    authenticate: function (req, res, next) {
        Usuario.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (userInfo == null) { return res.status(401).json({ status: err, message: 'Invalid email/password', data: null }) }
                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                    console.log('in..........');
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '7d' });
                    res.status(200).json({ message: 'usuario encontrado!', data: { usuario: userInfo, token: token } });
                } else {
                    res.status(401).json({ status: 'error', message: 'Invalid email/password', data: null })
                }
            }
        });
    },
    forgotPassword: function (req, res, next) {
        Usuario.findOne({ email: req.body.email }, function (err, usuario) {
            if (!usuario) return res.status(401).json({ message: 'no existe el usuario' });
            usuario.resetPassword(function (err) {
                if (err) { return next(err); }
                res.status(200).json({ message: 'se envio un mail para reestablecer la contraseña.', data: null });
            });
        });
    },
    authFacebookToken: function (req, res, next) {
        if (req.user) {
            req.user.save().then(() => {
                const token = jwt.sign({ id: req.user.id }, req.app.get('secretKey'), { expiresIn: '7d' });
                res.status(200).json({ message: 'usuario encontrado!', data: { usuario: req.user, token: token } });
            });
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid email/password', data: null })
        }
    }
}