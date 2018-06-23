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
        var nomeAlbum = obj.nome;
        var nomePhoto = obj.photos;
        var userId = obj.userID;
        console.log(userId);
        if (obj.photos) {
          var base64Data = obj.photos.replace(/^data:image\/[a-z]+;base64,/, "");
          obj.photos = userId + ".png";
          fs.mkdirSync("./bin/assets/"+userId+"/" + nomeAlbum + "/");
          fs.writeFile("./bin/assets/" + userId  +"/"+ nomeAlbum + "/foto.png", base64Data, 'base64', function (err) {
              if (err)
                  console.log("err = " + err);
          });
      }
        photosModel.create(obj, (err, data) => {
          if (err) next(err);
          else res.json(data);
        });
    }
}
export default PhotoCtlr;



