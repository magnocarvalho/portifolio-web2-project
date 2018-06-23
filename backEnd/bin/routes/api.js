"use strict";
const express = require("express");
const UsuarioCtrl_1 = require("../controllers/UsuarioCtrl");
var router = express.Router();
router.post('/salvarUsuario', UsuarioCtrl_1.default.create);
module.exports = router;
