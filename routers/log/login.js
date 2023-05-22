// // login.js
// const express = require("express");
// const bcryptjs = require("bcryptjs");
// const conexion = require("../../dataBase/db");

// const login = express();

// login.post("/auth", async (req, res) => {
//   const usuario = req.body.usuario;
//   const clave = req.body.clave;
//   let passwordHash = await bcryptjs.hash(clave, 8);
//   if (usuario && clave) {
//     conexion.query(
//       "SELECT * FROM usuarios WHERE usuario = ?",
//       [usuario],
//       async (error, results) => {
//         if (
//           results.length === 0 ||
//           (await bcryptjs.compare(clave, results[0].clave))
//         ) {
//           res.render("login", {
//             alert: true,
//             alertTitle: "Error",
//             alertMessage: "Usuarios o contraseña incorrectos",
//             alertIcon: "error",
//             showConfirmButton: true,
//             timer: 1500,
//             ruta: "login",
//           });
//         } else {
//           req.session.loggedin = true;
//           req.session.nombre = results[0].nombre;
//           res.render("login", {
//             alert: true,
//             alertTitle: "Conectado",
//             alertMessage: "Bienvenido: " + usuario,
//             alertIcon: "success",
//             showConfirmButton: false,
//             timer: 1500,
//             ruta: "",
//           });
//         }
//       }
//     );
//   } else {
//     res.render("login", {
//       alert: true,
//       alertTitle: "Advertencia",
//       alertMessage: "Ingresa tus credenciales",
//       alertIcon: "warning",
//       showConfirmButton: true,
//       timer: 15000,
//       ruta: "login",
//     });
//   }
// });
// /* ============================================================== */
// /* ======================== FIN LOGIN =========================== */
// /* ============================================================== */
// module.exports = login;
