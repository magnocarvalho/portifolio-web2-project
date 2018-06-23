// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
// var smtpapi = require('smtpapi')
// var nodemailer = require('nodemailer')
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
var sg = require('sendgrid')('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');
class EmailService {
    static sendMail(email, template, substitutions) {
        return new Promise((resolve, reject) => {
            var objSub = {};
            if (substitutions)
                substitutions.forEach(s => objSub[s.tipo] = s.sub);
            try {
                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: {
                        personalizations: [{
                                to: [{
                                        email: email.to,
                                        name: email.nome
                                    }],
                                subject: email.subject,
                                substitutions: objSub
                            }],
                        from: {
                            email: email.from,
                            name: 'Ponto Yankton'
                        },
                        'template_id': template
                    }
                });
                sg.API(request, (error, response) => {
                    if (error)
                        reject(error);
                    else
                        resolve(response);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static sendMailMultipleRecipients(email, template, substitutions) {
        return new Promise((resolve, reject) => {
            var objSub = {};
            if (substitutions)
                substitutions.forEach(s => objSub[s.tipo] = s.sub);
            try {
                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: {
                        personalizations: [{
                                to: [{
                                        email: email.to[0].email
                                    }, {
                                        email: email.to[1].email
                                    }],
                                name: email.nome,
                                subject: email.subject,
                                substitutions: objSub
                            }],
                        from: {
                            email: email.from,
                            name: 'AgendaJob'
                        },
                        'template_id': template
                    }
                });
                sg.API(request, (error, response) => {
                    if (error)
                        reject(error);
                    else
                        resolve(response);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    static emailFuncionario(profissional) {
        return new Promise((resolve, reject) => {
            let email = profissional.Email;
            let nome = profissional.Nome;
            let login = profissional.Login;
            let senha = profissional.Senha;
            let mail = {
                nome: nome,
                from: 'contato@ykt.com.br',
                to: email,
                subject: 'Automativo - Novo cadastro' // Subject line
            };
            let substitutions = [{ tipo: ':nome', sub: nome }, { tipo: ':senha', sub: senha }, { tipo: ':email', sub: email }];
            EmailService.sendMail(mail, "6812c1f5-ce15-48b2-994c-9da337c6235f", substitutions).then(r => {
                resolve();
            }, err => {
                reject();
            });
            //Usuario.findByEmail(email).then(callback, errorCallback);
        });
    }
    static emailNovaEmpresa(estabelecimento) {
        return new Promise((resolve, reject) => {
            let email = estabelecimento.email;
            let nome = estabelecimento.nome;
            let tipo = 'Estabelecimento';
            let mail = {
                nome: nome,
                from: 'contato@ykt.com.br',
                to: 'contato@ykt.com.br',
                subject: 'Automativo - Novo estabelecimento' // Subject line
            };
            let substitutions = [{ tipo: ':nome', sub: nome }, { tipo: ':email', sub: email }, { tipo: ':tipo', sub: tipo }];
            EmailService.sendMail(mail, "99a7b0c2-94a9-48b0-9bcd-bce6b20bec8f", substitutions).then(r => {
                resolve();
            }, err => {
                reject();
            });
            // Estabelecimento.findByEmail(email).then(callback, errorCallback);
        });
    }
    static emailNovaContabilidade(contabilidade) {
        return new Promise((resolve, reject) => {
            let email = contabilidade.email;
            let nome = contabilidade.nome;
            let tipo = 'Contabilidade';
            let mail = {
                nome: nome,
                from: 'contato@ykt.com.br',
                to: 'contato@ykt.com.br',
                subject: 'Automativo - Nova contabilidade' // Subject line
            };
            let substitutions = [{ tipo: ':nome', sub: nome }, { tipo: ':email', sub: email }, { tipo: ':tipo', sub: tipo }];
            EmailService.sendMail(mail, "99a7b0c2-94a9-48b0-9bcd-bce6b20bec8f", substitutions).then(r => {
                resolve();
            }, err => {
                reject();
            });
            // Estabelecimento.findByEmail(email).then(callback, errorCallback);
        });
    }
    static emailNovoEstabelecimentoPelaContabilidade(contabilidade, estabelecimento) {
        return new Promise((resolve, reject) => {
            let email = contabilidade.email;
            let nome = contabilidade.nome;
            let mail = {
                nome: nome,
                from: 'suporte.agenda@ykt.com.br',
                to: email,
                subject: 'Ponto Yankton - Nova empresa' // Subject line
            };
            let substitutions = [{ tipo: ':empresa', sub: estabelecimento.nome }, { tipo: ':contabilidade', sub: contabilidade.nome }, { tipo: ':email', sub: email }, { tipo: ':senha', sub: estabelecimento.senha }];
            EmailService.sendMail(mail, "64df51e9-ee54-4e0b-83e4-3743b0ebe6a5", substitutions).then(r => {
                resolve();
            }, err => {
                reject();
            });
            // Estabelecimento.findByEmail(email).then(callback, errorCallback);
        });
    }
    static emailComprovanteRegistro(ponto) {
        return new Promise((resolve, reject) => {
            let email = ponto.email;
            let nome = ponto.nome;
            let empresa = ponto.empresa;
            let id = ponto.id;
            let horario = ponto.horario;
            let mail = {
                nome: nome,
                from: 'suporte.agenda@ykt.com.br',
                to: 'carlos.kikuti@ykt.com.br',
                subject: 'Automativo - Comprovante de Registro' // Subject line
            };
            let substitutions = [{ tipo: ':nome', sub: nome }, { tipo: ':horario', sub: horario }, { tipo: ':id', sub: id }, { tipo: ':empresa', sub: empresa }];
            EmailService.sendMail(mail, "e31b8bf1-92a1-4e3d-aca1-40a19d8af9d1", substitutions).then(r => {
                resolve();
            }, err => {
                reject();
            });
            // Estabelecimento.findByEmail(email).then(callback, errorCallback);
        });
    }
}
exports.EmailService = EmailService;
exports.default = EmailService;
