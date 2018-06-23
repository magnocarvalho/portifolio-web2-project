import * as express from 'express';
import UsuarioCtrl from '../controllers/UsuarioCtrl';

var router = express.Router();

router.post('/salvarUsuario', UsuarioCtrl.create);

export = router;