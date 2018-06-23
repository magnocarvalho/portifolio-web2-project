"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Candidato_1 = require("./../model/definitions/Candidato");
class CandidatoCtrl {
    static create(req, res, next) {
        var obj = req.body;
        Candidato_1.CandidatoModel.create(obj, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
    static putDadosCandidato(req, res, next) {
        var obj = req.body;
        var firebase = obj.firebase;
        Candidato_1.CandidatoModel.findOneAndUpdate({ firebase: firebase }, obj, (err, data) => {
            if (err)
                next(err);
            else {
                res.json(data);
            }
        });
    }
    static getDadoscandidato(req, res, next) {
        let obj = req.params.id;
        CandidatoCtrl.getById(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static getById(id) {
        return new Promise((resolve, reject) => {
            Candidato_1.CandidatoModel.findOne({ isDeleted: false, firebase: id }, (err, data) => {
                if (err || data === null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.default = CandidatoCtrl;
