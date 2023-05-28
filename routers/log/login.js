const express = require("express");
const login = express();

const conexion = require("../../dataBase/db");

login.post("/auth", async (req, res) => {
  const usuario = req.body.usuario;
  const clave = req.body.clave;
  // let passwordHash = await bcryptjs.hash(clave, 8);
  if (usuario && clave) {
    conexion.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario],
      async (error, results) => {
        if (results[0].usuario === usuario && results[0].clave === clave) {
          console.log(results[0]);
          console.log(error);

          req.session.loggedin = true;
          req.session.nombre = results[0].nombre;
          res.render("login", {
            alert: true,
            alertTitle: "Conectado",
            alertMessage: "Bienvenido: " + usuario,
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "",
          });
        } else {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuarios o contraseña incorrectos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: "login",
          });
        }
      }
    );
  } else {
    res.render("login", {
      alert: true,
      alertTitle: "Advertencia",
      alertMessage: "Ingresa tus credenciales",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: 15000,
      ruta: "login",
    });
  }
});

module.exports = login;
