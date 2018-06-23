"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const City_1 = require("../model/definitions/City");
class CityCtrl {
    static getCitiesByUf(req, res, next) {
        let uf = req.params.uf;
        City_1.CityModel.find({ uf: uf }).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static getCitiesId(req, res, next) {
        console.log(req.params.id);
        let id = req.params.id;
        CityCtrl.getById(id).then(data => {
            res.json(data);
            console.error(data);
        }, err => {
            next(err);
            console.error(err);
        });
    }
    static getById(id) {
        return new Promise((resolve, reject) => {
            City_1.CityModel.findOne({ _id: id }, (err, data) => {
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
exports.default = CityCtrl;
