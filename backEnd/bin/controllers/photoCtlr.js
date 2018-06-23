"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Photo_1 = require("./../model/definitions/Photo");
const fs = require("fs");
class PhotoCtlr {
    static create(req, res, next) {
        var obj = req.body;
        Photo_1.photosModel.create(obj, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
    static putPhotos(req, res, next) {
        var obj = req.body;
        var nomeAlbum = obj.nome;
        var nomePhoto = obj.photos[0];
        var userId = obj.userID;
        if (obj.photos[0]) {
            var base64Data = obj.photos.replace(/^data:image\/[a-z]+;base64,/, "");
            obj.photos[0] = nomePhoto + ".png";
            fs.writeFile("./bin/assets/" + userId + "/" + nomeAlbum + "/" + nomePhoto + ".png", base64Data, "base64", function (err) {
                if (err)
                    console.log("err = " + err);
            });
        }
    }
}
exports.default = PhotoCtlr;
