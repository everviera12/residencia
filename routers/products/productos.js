// const express = require("express");
// const productos = express.Router();
// const conexion = require("../../dataBase/db");

// // MUESTRA TODOS LOS PRODUCTOS DE LA BASE DE DATOS
// productos.get("/productos", (req, res) => {
//   conexion.query("SELECT * FROM productos", (error, results) => {
//     if (error) {
//       console.log("EL ERROR ES " + error);
//     } else {
//       res.render("productos", { results: results });
//     }
//   });
// });


// module.exports = productos;
