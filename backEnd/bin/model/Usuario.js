"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const async = require("async");
const bcrypt = require("bcrypt");
const Usuario_1 = require("./definitions/Usuario");
const Estabelecimento_1 = require("./definitions/Estabelecimento");
const EmailService_1 = require("../services/EmailService");
class Usuario {
    static IdEstabelecimento(arg0) {
        throw new Error("Method not implemented.");
    }
    static create(Usuario, isContabilidade = false, email = true) {
        return new Promise((resolve, reject) => {
            let passDecrypt = Usuario.Senha;
            this.findEstabelecimentoById(Usuario.IdEstabelecimento).then(res => {
                this.getAllUsuarios(isContabilidade ? Usuario.IdContabilidade : Usuario.IdEstabelecimento, isContabilidade).then(users => {
                    if (users.length < res.limitUser) {
                        //Limite de usuários não atingido                        
                        this.findByUserName(Usuario.Login).then(obj => {
                            reject('Funcionário já cadastrado'); //verifica se login já existe
                        }, err => {
                            this.findByEmail(Usuario.Email).then(obj => {
                                reject('Email já cadastrado'); //verifica se e-mail já existe
                            }, er => {
                                if (Usuario['Senha']) {
                                    Usuario['Senha'] = bcrypt.hashSync(Usuario['Senha'], parseInt(process.env.BCRYPT_SALT));
                                }
                                Usuario['Email'] = Usuario.Email.toLowerCase();
                                Usuario_1.UsuarioModel.create(Usuario, (err, data) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        Usuario['Senha'] = passDecrypt;
                                        if (email)
                                            EmailService_1.EmailService.emailFuncionario(Usuario);
                                        resolve(data);
                                    }
                                });
                            });
                        });
                    }
                    else {
                        reject("Limite de usuários atingido!");
                    }
                });
            });
        });
    }
    static updateOrder(id, order) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findByIdAndUpdate(id, { $set: { AgendaOrder: order } }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static update(id, obj, IdEstabelecimento, isEmail = false) {
        if (obj['Senha'] && !isEmail) {
            obj['Senha'] = bcrypt.hashSync(obj['Senha'], parseInt(process.env.BCRYPT_SALT));
        }
        obj['modifiedon'] = new Date();
        return new Promise((resolve, reject) => {
            var objAux = obj;
            //verificar por email
            this.findByEmail(obj.Email).then(e => {
                //verifica é o proprio id que esta fazendo update
                if (objAux._id.toString() == e['_id'].toString()) {
                    //busca por nome
                    this.findByUserName(obj.Login).then(c => {
                        //verifica é o proprio id que esta fazendo update
                        if (objAux._id.toString() == c['_id'].toString()) {
                            Usuario.execCountAdministrador(resolve, reject, id, obj, IdEstabelecimento);
                        }
                        else {
                            reject('Login indisponível');
                        }
                    }, err => {
                        Usuario.execCountAdministrador(resolve, reject, id, obj, IdEstabelecimento);
                    });
                }
                else {
                    reject("Email indisponível");
                }
            }, err => {
                this.findByUserName(obj.Login).then(c => {
                    //verifica é o proprio id que esta fazendo update
                    if (objAux._id.toString() == c['_id'].toString()) {
                        Usuario.execCountAdministrador(resolve, reject, id, obj, IdEstabelecimento);
                    }
                    else {
                        reject('Nome indisponível');
                    }
                }, err => {
                    Usuario.execCountAdministrador(resolve, reject, id, obj, IdEstabelecimento);
                });
            });
        });
    }
    static updateSenha(obj, IdEstabelecimento, SenhaToken) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(obj.SenhaAntiga, SenhaToken, function (err, res) {
                if (res) {
                    obj['Senha'] = bcrypt.hashSync(obj['Senha'], parseInt(process.env.BCRYPT_SALT));
                    Usuario.updateFuncionario(resolve, reject, obj._id, obj);
                }
                else {
                    reject();
                }
            });
        });
    }
    static execCountAdministrador(resolve, reject, id, obj, IdEstabelecimento) {
        Usuario.countAdministrador(IdEstabelecimento).then(c => {
            if (c <= 1) {
                obj.IsAdministrador = true;
            }
            Usuario.updateFuncionario(resolve, reject, id, obj);
        }, err => {
            console.log('eeee');
            obj.IsAdministrador = true;
            Usuario.updateFuncionario(resolve, reject, id, obj);
        });
    }
    static countAdministrador(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.find({
                IdEstabelecimento: new mongoose.Types.ObjectId(id),
                IsAdministrador: true
            }, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data.length);
                }
            });
        });
    }
    static findByTokenSenha(guid) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({
                "token": guid
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
    static updatePassword(guid, pass) {
        var self = this;
        return new Promise((resolve, reject) => {
            async.waterfall([
                (callback) => {
                    // find user by token
                    self.findByTokenSenha(guid).then((data) => {
                        callback(null, data);
                    }, (err) => {
                        callback(err);
                    });
                },
                (usu, callback) => {
                    usu['Senha'] = bcrypt.hashSync(pass, parseInt(process.env.BCRYPT_SALT));
                    usu['token'] = null;
                    Usuario_1.UsuarioModel.findByIdAndUpdate(usu['_id'], usu, { new: true }, (err, data) => {
                        if (err) {
                            console.log("erro find and update");
                            callback(err);
                        }
                        else {
                            console.log('************************************');
                            callback(null, true);
                        }
                    });
                }
            ], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            });
        });
    }
    static updateFuncionario(resolve, reject, id, obj) {
        obj['modifiedon'] = new Date();
        Usuario_1.UsuarioModel.findByIdAndUpdate(id, obj, {
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
    static deleteFuncionario(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findByIdAndUpdate(id, {
                isDeleted: true
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static delete(id) {
        console.log(id);
        return Usuario.update(id, {
            isDeleted: true
        });
    }
    static findByUserName(user) {
        user = user.toLowerCase().trim();
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({
                Login: user,
                isDeleted: false
            }, (err, data) => {
                if (err || data === null) {
                    // se não encontrar, procurar por e-mail
                    Usuario_1.UsuarioModel.findOne({
                        "Email": user,
                        isDeleted: false
                    }, (err, data) => {
                        if (err || data === null) {
                            reject(err);
                        }
                        else {
                            resolve(data);
                        }
                    });
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findByUsernameAdm(user, idEst) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({
                Login: user,
                IsAdministrador: true,
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
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({
                "Email": email,
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
    static findEstabelecimentoById(IdEstabelecimento) {
        return new Promise((resolve, reject) => {
            Estabelecimento_1.EstabelecimentoModel.findById(IdEstabelecimento, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findByIdFull(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findById(id, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            }).populate("IdEstabelecimento");
        });
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findById(id, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findAll(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.find({
                IdMaster: id
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static findByPw(userAdm) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.find({
                IdEstabelecimento: new mongoose.Types.ObjectId(userAdm.idEst),
                Senha: userAdm.pw,
                isDeleted: false
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static countUsers(idEstabelecimento) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.count({
                IdEstabelecimento: new mongoose.Types.ObjectId(idEstabelecimento),
                isDeleted: false,
                TemAgenda: true
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static getAllUsuariosAgenda(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.find({
                IdEstabelecimento: new mongoose.Types.ObjectId(id),
                isDeleted: false,
                TemAgenda: true
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            }).populate('IdEstabelecimento').collation({ locale: "en_US", strength: 1 }).sort({ Nome: 1, normalizedName: 1 });
        });
    }
    static getAllUsuarios(id, isContabilidade = false) {
        return new Promise((resolve, reject) => {
            if (isContabilidade)
                Usuario_1.UsuarioModel.find({
                    IdContabilidade: new mongoose.Types.ObjectId(id),
                    isDeleted: false
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                }).populate('IdContabilidade').collation({ locale: "en_US", strength: 1 }).sort({ Nome: 1, normalizedName: 1 });
            else
                Usuario_1.UsuarioModel.find({
                    IdEstabelecimento: new mongoose.Types.ObjectId(id),
                    isDeleted: false
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                }).populate('IdEstabelecimento').collation({ locale: "en_US", strength: 1 }).sort({ Nome: 1, normalizedName: 1 });
        });
    }
}
exports.default = Usuario;
