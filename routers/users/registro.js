// const express = require("express");
// const user = express();
// const bcryptjs = require("bcryptjs");
// const conexion = require("../../dataBase/db");

// user.post("/registro", async (req, res) => {
//   const nombre = req.body.nombre;
//   const usuario = req.body.usuario;
//   const clave = req.body.clave;
//   let passwordHaash = await bcryptjs.hash(clave, 8);
//   conexion.query(
//     "INSERT INTO usuarios SET ?",
//     {
//       nombre: nombre,
//       usuario: usuario,
//       clave: passwordHaash,
//     },
//     async (error, results) => {
//       if (error) {
//         console.log(error);
//       } else {
//         res.render("registro", {
//           alert: true,
//           alertTitle: "Registro",
//           alertMessage: "Registro exitoso",
//           alertIcon: "success",
//           showConfirmButton: true,
//           time: 1500,
//           ruta: "registro",
//         });
//       }
//     }
//   );
// });

// module.exports = user;
