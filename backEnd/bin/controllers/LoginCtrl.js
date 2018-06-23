"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../model/Usuario");
const Estabelecimento_1 = require("../model/Estabelecimento");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const async = require("async");
const moment = require("moment");
const admin = require("firebase-admin");
class LoginCtrl {
    static login(req, res, next) {
        // ReCaptcha.validate(req.body.recaptcha, req.connection.remoteAddress).then(ok => {
        //     if (!ok) {
        //     //     next({ msg: "reCAPTCHA inválido" });
        //     //     return;
        //     }
        LoginCtrl.doLogin(req, res, next);
        //  }, err => {
        //     //next({ msg: "reCAPTCHA inválido" });
        // });
    }
    static doLogin(req, res, next, isFirst = false) {
        let user = req.body.Login;
        let pass = req.body.Pass;
        let steps = [
            async.apply(LoginCtrl.findUser, user, pass, isFirst),
            LoginCtrl.checkPass,
            LoginCtrl.findEstabelecimentos,
            LoginCtrl.sign
        ];
        async.waterfall(steps, (err, data) => {
            if (err)
                next(err);
            else {
                res.json(data);
            }
        });
    }
    static reLogin(req, res, next) {
        var userID = req.userID;
        let steps = [
            async.apply(LoginCtrl.checkToken, userID),
            LoginCtrl.findEstabelecimentos,
            LoginCtrl.sign,
            LoginCtrl.findFuncionario
        ];
        if (req.IsAdministrador)
            steps.push(LoginCtrl.findFuncionario);
        async.waterfall(steps, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
    static validateToken(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            admin.auth().verifyIdToken(token)
                .then(function (decodedToken) {
                var uid = decodedToken.uid;
                req.userID = uid;
                next();
            }).catch(function (error) {
                console.log(error);
                res.sendStatus(401);
            });
        }
        else {
            res.sendStatus(401);
        }
    }
    static checkPayment(req, res, next) {
        if (moment.utc(req.ValidateDate).diff(moment.utc()) <= 0 && !req.Master && !req.IsContabilidade) {
            // nao pode deixar passar
            res.sendStatus(444);
            return;
        }
        else
            next();
    }
    static checkToken(userID, callback) {
        Usuario_1.default.findById(userID).then((obj) => {
            callback(null, {
                user: obj
            });
        }, (err) => {
            callback(err);
        });
    }
    static findUser(user, pass, isFirst, callback) {
        Usuario_1.default
            .findByUserName(user)
            .then(data => {
            if (data) {
                callback(null, pass, data);
            }
        }, (error) => {
            var erro = 'Usuário ou senha incorreta';
            callback({ code: "erro", error: erro });
        });
    }
    static findUserAdm(user, pass, idEst, callback) {
        Usuario_1.default
            .findByUsernameAdm(user, idEst)
            .then(data => {
            if (data) {
                callback(null, pass, data);
            }
        }, (error) => {
            var erro = 'Usuário ou senha incorreta';
            callback({ code: "erro", error: erro });
        });
    }
    static checkPass(pass, user, callback) {
        bcrypt.compare(pass, user.Senha, (error, same) => {
            if (error) {
                var erro = 'Ocorreu um erro desconhecido';
                callback({ code: "erro", error: erro });
            }
            else if (!same) {
                var erro = 'Usuário ou senha incorreta';
                callback({ code: "Erro", error: erro });
            }
            else {
                callback(null, {
                    key: Date.now().toString(),
                    user: user
                });
            }
        });
    }
    static sign(data, callback) {
        if (data.canLogin) {
            jwt.sign({
                key: data.user._id,
                IdEstabelecimento: data.user.IdEstabelecimento,
                IdContabilidade: data.user.IdContabilidade,
                Senha: data.user.Senha,
                IsAdministrador: data.user.IsAdministrador,
                IsContabilidade: data.user.IsContabilidade,
                ValidateDate: data.ValidateDate
            }, process.env.TOKEN_SECRET, {
                expiresIn: '7d'
            }, (err, token) => {
                if (err) {
                    callback({ code: "erroLogin", error: err });
                }
                else {
                    data.token = token;
                    callback(null, data);
                }
            });
        }
        else
            callback({ code: "erroEstabelecimento" });
    }
    static signMaster(data, callback) {
        jwt.sign({
            key: data.user._id,
            Master: true
        }, process.env.TOKEN_SECRET, {
            expiresIn: '7d'
        }, (err, token) => {
            if (err) {
                callback({ code: "erro", error: err });
            }
            else {
                data.token = token;
                callback(null, data);
            }
        });
    }
    static findFuncionario(data, callback) {
        Usuario_1.default.findAll(data.user.IdEstabelecimento)
            .then((obj) => {
            data.funcionarios = obj;
            callback(null, data);
        }, (err) => {
            callback(data);
        });
    }
    static findEstabelecimentos(data, callback) {
        Estabelecimento_1.default.findById(data.user.IdEstabelecimento).then((obj) => {
            callback(null, data);
        }, (err) => {
            data.canLogin = false;
            callback(null, data);
        });
    }
    static teste(req, res, callback) {
        res.json({ time: new Date() });
    }
}
exports.default = LoginCtrl;
