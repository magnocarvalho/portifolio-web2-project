import * as express from 'express';
import UsuarioCtrl from '../controllers/UsuarioCtrl';
import { photosModel } from '../model/definitions/Photo';
import PhotoCtlr from '../controllers/photoCtlr';

var router = express.Router();

router.post('/salvarUsuario', UsuarioCtrl.create);
router.post('/loginUser', UsuarioCtrl.login);

router.post('/salvarFotos', PhotoCtlr.create);

export = router;