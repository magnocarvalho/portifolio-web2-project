"use strict";
const express = require("express");
const UsuarioCtrl_1 = require("../controllers/UsuarioCtrl");
const photoCtlr_1 = require("../controllers/photoCtlr");
var router = express.Router();
router.post('/salvarUsuario', UsuarioCtrl_1.default.create);
router.post('/loginUser', UsuarioCtrl_1.default.login);
router.post('/salvarFotos', photoCtlr_1.default.create);
module.exports = router;
