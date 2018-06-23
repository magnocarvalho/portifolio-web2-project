"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Estabelecimento_1 = require("./../model/Estabelecimento");
const Usuario_1 = require("./../model/Usuario");
const LoginCtrl_1 = require("./LoginCtrl");
const fs = require('fs');
var generator = require('generate-password');
class EstabelecimentoCtrl {
    static create(req, res, next) {
        //ReCaptcha.validate(req.body.Estabelecimento.recaptcha, req.connection.remoteAddress).then(ok => {
        //     if (!ok) {
        //         //next({ msg: "reCAPTCHA inválido" });
        //         //return;
        //     }
        let estabelecimento = req.body.Estabelecimento;
        //estabelecimento.email = estabelecimento.email.toLowerCase().trim();
        let pro = {
            Nome: estabelecimento.nomeRespon.split("@")[0],
            Email: estabelecimento.emailRespon,
            Login: estabelecimento.emailRespon,
            Senha: generator.generate({
                length: 6,
                uppercase: false,
                numbers: true
            }),
            IsAdministrador: true
        };
        Usuario_1.default.findByEmail(pro.Email).then(obj => {
            next({ message: "E-mail já cadastrado" });
        }, canCreate => {
            Estabelecimento_1.default.create(estabelecimento).then((data) => {
                pro.IdEstabelecimento = data._id;
                Usuario_1.default.create(pro).then((data) => {
                    LoginCtrl_1.default.doLogin({ body: { Login: pro.Login, Pass: pro.Senha } }, res, next);
                }, (err) => {
                    next(err);
                });
            }, (err) => {
                next(err);
            });
        });
        // });
    }
    static update(req, res, next) {
        let obj = req.body.Estabelecimento;
        if (obj.croppedImage != undefined) {
            obj.IsAvatar = true;
            var base64Data = obj.croppedImage.replace(/^data:image\/[a-z]+;base64,/, "");
            fs.writeFile("./bin/assets/" + obj._id + ".png", base64Data, 'base64', function (err) {
                if (err)
                    console.log("err = " + err);
                else
                    console.log("sucesso");
            });
        }
        if (obj.url) {
            obj.url = obj.url.trim().toLowerCase();
            Estabelecimento_1.default.checkUrl(req.IdEstabelecimento, obj.url).then(objRes => {
                EstabelecimentoCtrl.doUpdate(obj, res, next);
            }, err => {
                next({ messageURL: "A URL que você escolheu já está sendo utilizada, por favor, escolha outra ou entre em contato com nosso suporte." });
            });
        }
        else
            EstabelecimentoCtrl.doUpdate(obj, res, next);
    }
    static doUpdate(obj, res, next) {
        Estabelecimento_1.default.update(obj._id, obj).then((obj) => {
            res.send(obj);
        }, (err) => {
            next({ message: err });
        });
    }
    static deactivate(req, res, next) {
        let id = req.params.id;
        Estabelecimento_1.default.deactivate(id)
            .then(data => res.send(data), error => next(error));
    }
    static activate(req, res, next) {
        let id = req.params.id;
        Estabelecimento_1.default.activate(id).then((obj) => {
            res.send(obj);
        }, (err) => {
            next(err);
        });
    }
    static getAllEstabelecimentos(req, res, next) {
        Estabelecimento_1.default.getAllEstabelecimentos().then((data) => {
            res.json(data);
        }, (err) => {
            next(err);
        });
    }
    static getEstabelecimentoById(req, res, next) {
        let establishmentId = req.params.id;
        Estabelecimento_1.default.findById(establishmentId).then((data) => {
            res.json(data);
        }, (err) => {
            next(err);
        });
    }
    ;
}
exports.default = EstabelecimentoCtrl;
