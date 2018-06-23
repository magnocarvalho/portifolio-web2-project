"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vaga_1 = require("./../model/definitions/Vaga");
class VagaCtrl {
    static create(req, res, next) {
        var obj = req.body;
        Vaga_1.VagaModel.create(obj, (err, data) => {
            if (err) {
                console.log(err);
                next(err);
            }
            else
                res.json(data);
        });
    }
}
exports.default = VagaCtrl;
