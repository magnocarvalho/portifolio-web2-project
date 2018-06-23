import { photosModel } from './../model/definitions/Photo';


const fs = require("fs");

class PhotoCtlr{

    static create(req, res, next) {
        var obj = req.body;    
        photosModel.create(obj, (err, data) => {
          if (err) next(err);
          else res.json(data);
        });
      }
      static putPhotos(req, res, next) {
        var obj = req.body;
        var id = obj.id;
        if (obj.logo) {
          var base64Data = obj.logo.replace(/^data:image\/[a-z]+;base64,/, "");
          obj.logo = id + ".png";
          fs.writeFile(
            "./bin/assets/" + id + ".png",
            base64Data,
            "base64",
            function(err) {
              if (err) console.log("err = " + err);
            }
          );
        }
    }

}
export default PhotoCtlr;



