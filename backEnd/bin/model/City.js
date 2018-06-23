"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("./../services/EmailService");
const City_1 = require("./definitions/City");
class City {
    static create(City, email = true) {
        return new Promise((resolve, reject) => {
            City_1.CityModel.create(City, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (email)
                        EmailService_1.default.emailNovaEmpresa(City);
                    resolve(data);
                }
            });
        });
    }
    static update(id, obj) {
        obj['modifiedon'] = new Date();
        return new Promise((resolve, reject) => {
            this.findById(obj._id).then(c => {
                resolve(c);
            }, err => {
                City.updateCity(resolve, reject, id, obj);
            });
        });
    }
    static deactivate(id) {
        return City.update(id, {
            isDeleted: true
        });
    }
    static updateCity(resolve, reject, id, obj) {
        City_1.CityModel.findByIdAndUpdate(id, obj, {
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
    static get() {
        return new Promise((resolve, reject) => {
            City_1.CityModel.find({ isDeleted: false }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            }).collation({ locale: "en_US", strength: 1 }).sort({ nome: 1, normalizedName: 1 });
        });
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            City_1.CityModel.findById(id, (err, data) => {
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
exports.default = City;
