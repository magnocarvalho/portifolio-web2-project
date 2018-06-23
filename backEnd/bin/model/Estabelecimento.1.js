"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Usuario_1 = require("./Usuario");
const EmailService_1 = require("./../services/EmailService");
const Estabelecimento_1 = require("./definitions/Estabelecimento");
class Estabelecimento {
    static create(Estabelecimento, email = true) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.create(Estabelecimento, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (email)
                        EmailService_1.default.emailNovaEmpresa(Estabelecimento);
                    resolve(data);
                }
            });
        });
    }
    // static update(id: any, obj: any): Promise<IEstabelecimentoModel> {
    //     obj['modifiedon'] = new Date();
    //     return new Promise<IEstabelecimentoModel>((resolve, reject) => {
    //         this.findById(obj._id).then(c => {
    //             Estabelecimento.updateEstabelecimento(resolve, reject, id, obj);
    //         }, err => {
    //             Estabelecimento.updateEstabelecimento(resolve, reject, id, obj);
    //         });
    //     });
    // }
    static update(id, obj) {
        obj['modifiedon'] = new Date();
        return new Promise((resolve, reject) => {
            this.findById(obj._id).then(c => {
                resolve(c);
            }, err => {
                Estabelecimento.updateEstabelecimento(resolve, reject, id, obj);
            });
        });
    }
    static deactivate(id) {
        return Estabelecimento.update(id, {
            isDeleted: true
        });
    }
    static activate(id) {
        return Estabelecimento.update(id, {
            isDeleted: false
        });
    }
    static updateEstabelecimento(resolve, reject, id, obj) {
        Estabelecimento_1.EstabelecimentoModel.findByIdAndUpdate(id, obj, {
            new: true
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    }
    static getAllEstabelecimentos() {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.find({
            // isDeleted: false
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            }).collation({ locale: "en_US", strength: 1 }).sort({ nome: 1, normalizedName: 1 });
        });
    }
    static updateCode(id) {
        var code = "";
        for (var x = 0; x < 12; x++) {
            code += '' + parseInt((Math.random() * 9) + '');
        }
        return new Promise((resolve, reject) => {
            jwt.sign({
                IdEstabelecimento: id,
                Code: code
            }, process.env.TOKEN_SECRET, { expiresIn: '7d' }, (err, token) => {
                if (err) {
                    reject(err);
                }
                else {
                    Estabelecimento_1.EstabelecimentoModel.findByIdAndUpdate(id, { $set: { code: token } }, (err, data) => {
                        if (err || data === null) {
                            reject(err);
                        }
                        else {
                            resolve({ code: token });
                        }
                    }, err => {
                        reject(err);
                    });
                }
            });
        });
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.findById(id, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findByIdContabilidade(id) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.find({ IdContabilidade: id, isDeleted: false }, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.findOne({
                "email": email,
                isDeleted: false
            }, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findByCNPJ(cnpj) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.findOne({
                "cnpj": cnpj,
                isDeleted: false
            }, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static validarPagamento(est) {
        return new Promise((resolve, reject) => {
            var mesGratis = moment.utc(est.dtCadastro).startOf('day').add(1, 'M');
            // já passou do mês grátis 
            if (mesGratis.diff(moment.utc().startOf('day')) <= 0) {
                resolve({
                    proximaValidacao: moment.utc().startOf('day').toDate()
                });
            }
            else {
                resolve({
                    proximaValidacao: null
                });
            }
        });
    }
    static checkUrl(id, url) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.find({ _id: { $ne: new mongoose.Types.ObjectId(id) }, url: url }, (err, data) => {
                if (err || (data && data.length > 0)) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findByUrl(url) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.findOne({ url: url }, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static updateLoginCount(id) {
        Estabelecimento_1.EstabelecimentoModel.findOneAndUpdate({ _id: id }, { $inc: { login: 1 } }, (err, data) => {
            if (err)
                console.log(err);
        });
    }
    static updatePagamento(id, obj, pagar = false) {
        var maxUsers = obj.Customer.limitUser;
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.findById(id, (err, est) => {
                if (err || est === null || est === undefined) {
                    reject({
                        message: "Estabelecimento inválido, entre em contato através do e-mail suporte-agenda@ykt.com.br"
                    });
                }
                else {
                    Usuario_1.default.countUsers(est._id).then(c => {
                        if (c > maxUsers) {
                            reject({
                                message: `Você possui {0} profissionais cadastrados e está adquirindo um plano para apenas {1}.<br/>
                                    Aumente o número de profissionais no plano ou remova os que não serão utilizados.
                                    `.replace("{0}", c + '').replace("{1}", maxUsers)
                            });
                            return;
                        }
                        var updt = {};
                        // marca para atualiza a quantidade de usuários
                        if (maxUsers != est.limitUser) {
                            est.limitUser = maxUsers || 4;
                            updt.limitUser = est.limitUser;
                        }
                        // se não tem valor mensal, é o primeiro mês
                        if (!est.valorMensal) {
                            est.valorMensal = 10;
                            updt.valorMensal = est.valorMensal;
                        }
                        // marca primeira cobrança, para poder contar os 6 primeiros meses.
                        var mesGratis = moment.utc(est.dtCadastro).startOf('day').add(1, 'M');
                        // já passou do dia do pagamento, então coloca a primeira agora
                        if (mesGratis.diff(moment.utc().startOf('day')) <= 0)
                            mesGratis = moment.utc().startOf('day');
                        if (pagar) {
                            est.primeiraCobranca = mesGratis.toDate();
                            updt.primeiraCobranca = est.primeiraCobranca;
                            var dur = moment.duration(moment.utc().startOf('day').diff(moment(est.primeiraCobranca)));
                            // verificacao se já passou 6 meses de promoção 3 meses de 30 + 4 de 31 (mes grátis)
                            // if (dur.asMonths() >= 6) {
                            //     est.valorMensal = 20;
                            //     updt.valorMensal = est.valorMensal;
                            // }
                        }
                        est.proximaCobranca = mesGratis.toDate();
                        updt.proximaCobranca = est.proximaCobranca;
                        this.update(id, updt).then(updated => {
                            resolve(updated);
                        }, err => {
                            reject({
                                message: "Ocorreu uma falha ao atualizar seus dados, por favor tente novamente."
                            });
                        });
                    }, err => {
                        reject({
                            message: "Ocorreu uma falha de comunicação, por favor tente novamente."
                        });
                    });
                }
            });
        });
    }
}
exports.default = Estabelecimento;
