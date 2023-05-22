// EXPRESS
const express = require("express");
const app = express();

// DOTENV
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

// capturamos datos de formulario y datos tipo json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Motor de plantillas ejs
app.set("view engine", "ejs");

// bcryptjs para la encriptacion de contraseñas
const bcryptjs = require("bcryptjs");

// variables de sesion
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// habilitamos la carpeta public
app.use("/recursos", express.static("public"));
app.use("/recursos", express.static(__dirname + "/public"));

// Modulo de la base de datos
const conexion = require("./dataBase/db");

/* ============================================================== */
/* ======================== LOGIN =========================== */
/* ============================================================== */
app.post("/registro", async (req, res) => {
  const nombre = req.body.nombre;
  const usuario = req.body.usuario;
  const clave = req.body.clave;
  let passwordHaash = await bcryptjs.hash(clave, 8);
  conexion.query(
    "INSERT INTO usuarios SET ?",
    {
      nombre: nombre,
      usuario: usuario,
      clave: passwordHaash,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        // res.send("ALTA MAMALONA");
        res.render("registro", {
          alert: true,
          alertTitle: "Registro",
          alertMessage: "Regitro exitoso",
          alertIcon: "success",
          showConfirmButton: true,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});

app.post("/auth", async (req, res) => {
  const usuario = req.body.usuario;
  const clave = req.body.clave;
  let passwordHash = await bcryptjs.hash(clave, 8);
  if (usuario && clave) {
    conexion.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario],
      async (error, results) => {
        if (
          results.length === 0 ||
          !(await bcryptjs.compare(clave, results[0].clave))
        ) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuarios o contraseña incorrectos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: "login",
          });
        } else {
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
/* ============================================================== */
/* ======================== FIN LOGIN =========================== */
/* ============================================================== */

/* ========== RUTAS ========== */
// ruta de login
app.get("/login", (req, res) => {
  res.render("login");
});

// ruta de registro
app.get("/registro", (req, res) => {
  res.render("registro");
});

app.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.render("index", {
      login: true,
      nombre: req.session.nombre,
    });
  } else {
    res.render("index", {
      login: false,
      name: "Debe iniciar sesión",
    });
  }
});

//logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

/* ========================== */
// SERVIDOR
app.listen(3030, (req, res) => {
  console.log("Servidor corriendo http://127.0.0.1:3030");
});
