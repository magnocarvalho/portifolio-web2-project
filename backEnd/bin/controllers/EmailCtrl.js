"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../model/Usuario");
const EmailService_1 = require("../services/EmailService");
class EmailCtrl {
    static createEsqueceuSenha(req, res, next) {
        let padraoEmail = /^([\w\-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w\-]{2,3})$/;
        let info = req.body.Login;
        let isEmail = padraoEmail.test(info);
        let User;
        var self = this;
        var generateGuid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        let callback = data => {
            User = data;
            var guid = generateGuid();
            let mail = {
                from: 'contato@ykt.com.br',
                to: User.Email,
                nome: User.Nome,
                subject: 'Automativo - Recuperar Senha',
                id: guid
            };
            //SEMPRE TROCAR O LINK QUANDO FOR PARA PROD
            //let linkLocal = process.env.SITE + '/#/recuperar-senha/id=' + guid;
            let linkLocal = process.env.SITE + '/#/auth/new-password/' + guid;
            // let link = process.env.URL_AGENDA + '#/recuperar-senha/id=' + guid;
            User.token = guid;
            let substitutions = [{ tipo: ':nome', sub: User.Nome }, { tipo: ':url_ponto', sub: linkLocal }];
            Usuario_1.default.update(User._id, User, null, true).then(r => {
                EmailService_1.default.sendMail(mail, "0df95899-63b2-4d63-8a23-1bec04a170ad", substitutions).then(r => {
                    res.send(data);
                }, err => {
                    res.sendStatus(500);
                });
            }, err => {
                res.sendStatus(500);
            });
        };
        let errorCallback = error => {
            res.send(error);
        };
        if (isEmail)
            Usuario_1.default.findByEmail(info).then(callback, errorCallback);
        else
            Usuario_1.default.findByUserName(info).then(callback, errorCallback);
    }
    static esqueceuSenha(req, res, next) {
        let guid = req.body.guid;
        Usuario_1.default.findByTokenSenha(guid).then(function (data) {
            res.send(data);
        }, function () {
            next({ status: 404 });
        });
    }
    static alterarSenha(req, res, next) {
        let guid = req.body.token;
        let senha = req.body.Senha;
        Usuario_1.default.updatePassword(guid, senha).then(function (data) {
            next({ status: 200 });
        }, function () {
            next({ status: 404 });
        });
    }
    static emailContato(req, res, next) {
        let email = req.body.Email;
        let nome = req.body.Nome;
        let telefone = req.body.Telefone;
        let mensagem = req.body.Mensagem;
        let idEstabelecimento = req.body.IdEstabelecimento;
        let mail = {
            nome: nome,
            from: email,
            to: 'suporte.agenda@ykt.com.br',
            subject: 'AgendaJob - Contato' // Subject line
        };
        let substitutions = [{ tipo: ':nome', sub: nome }, { tipo: ':email', sub: email }, { tipo: ':telefone', sub: telefone }, { tipo: ':mensagem', sub: mensagem }, { tipo: ':idEst', sub: idEstabelecimento }];
        EmailService_1.default.sendMail(mail, "e2bb2f77-9f04-4a8e-b868-af508409a184", substitutions).then(r => {
            res.send(r);
        }, err => {
            res.send(err);
        });
    }
}
exports.default = EmailCtrl;
