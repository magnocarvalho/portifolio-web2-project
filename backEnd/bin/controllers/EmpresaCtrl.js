"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Empresa_1 = require("./../model/definitions/Empresa");
const fs = require('fs');
class EmpresaCtrl {
    static create(req, res, next) {
        var obj = req.body;
        Empresa_1.EmpresaModel.create(obj, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
    static putDadosEmpresa(req, res, next) {
        var obj = req.body;
        var firebase = obj.firebase;
        if (obj.logo) {
            var base64Data = obj.logo.replace(/^data:image\/[a-z]+;base64,/, "");
            obj.logo = firebase + ".png";
            fs.writeFile("./bin/assets/" + firebase + ".png", base64Data, 'base64', function (err) {
                if (err)
                    console.log("err = " + err);
            });
        }
        Empresa_1.EmpresaModel.findOneAndUpdate({ firebase: firebase }, obj, (err, data) => {
            if (err)
                next(err);
            else {
                res.json(data);
            }
        });
    }
    static getDadosEmpresa(req, res, next) {
        var obj = req.params.id;
        EmpresaCtrl.getById(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static getById(id) {
        return new Promise((resolve, reject) => {
            Empresa_1.EmpresaModel.findOne({ isDeleted: false, firebase: id }, (err, data) => {
                if (err || data === null)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.default = EmpresaCtrl;
