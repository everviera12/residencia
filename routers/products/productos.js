const express = require("express");
const router = express.Router();
const conexion = require("../../dataBase/db");

// MUESTRA TODOS LOS PRODUCTOS DE LA BASE DE DATOS
router.get("/productos", (req, res) => {
  conexion.query("SELECT * FROM productos", (error, results) => {
    console.log(results);
    if (error) {
      console.log("EL ERROR ES " + error);
    } else {
      res.render("productos", { results: results });
    }
  });
});

module.exports = router;
