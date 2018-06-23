"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../model/definitions/Usuario");
const fs = require('fs');
class UsuarioCtrl {
    static create(req, res, next) {
        var obj = req.body;
        UsuarioCtrl.getByEmail(obj.email).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
        if (res) {
            return;
        }
        else {
            Usuario_1.UsuarioModel.create(obj, (err, data) => {
                if (err)
                    next(err);
                else
                    res.json(data);
            });
        }
    }
    static putDadosUsuario(req, res, next) {
        var obj = req.body;
        var id = obj.id;
        if (obj.logo) {
            var base64Data = obj.logo.replace(/^data:image\/[a-z]+;base64,/, "");
            obj.logo = id + ".png";
            fs.writeFile("./bin/assets/" + id + ".png", base64Data, 'base64', function (err) {
                if (err)
                    console.log("err = " + err);
            });
        }
        Usuario_1.UsuarioModel.findOneAndUpdate({ id: id }, obj, (err, data) => {
            if (err)
                next(err);
            else {
                res.json(data);
            }
        });
    }
    static getDadosUsuario(req, res, next) {
        var obj = req.params.id;
        UsuarioCtrl.getById(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static getById(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({ isDeleted: false, id: id }, (err, data) => {
                if (err || data === null)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
    static getByEmail(email) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({ isDeleted: false, email: email }, (err, data) => {
                if (err || data === null)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.default = UsuarioCtrl;