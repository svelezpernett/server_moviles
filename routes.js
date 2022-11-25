const express    = require("express");
const { check } = require('express-validator');
const controller = require("./controllers.js");
const { ValidarCampos } = require('./middleweres.js');

const router = express.Router();

router.post ("/vendedor",[
                check("idvend","es obligatorio el numero").not(),
                check("nombre","el nombre es obligatorio").matches(/^[a-zA-Z]+$/),
                check("apellido","el apellido es obligatorio").matches(/^[a-zA-Z]+$/),
                check('correoe','el correo no es valido').isEmail()
            ],
            ValidarCampos,
            controller.postVendedor)

router.get("/vendedor",controller.getVendedor)

router.post("/venta",[
        check("idvend","el idvend es obligatorio"),
        check("zona","la zona es obligatorio"),
        check("fecha","fecha es obliogatorio"),
        check("valorventa","valorventa es obligatorio")
],
ValidarCampos
 ,controller.postVenta)

router.get("/getventa/:id",controller.getVenta)



module.exports = router;
