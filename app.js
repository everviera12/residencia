// EXPRESS
const express = require("express");
const app = express();

// DOTENV
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

// Modulo de la base de datos
const conexion = require("./dataBase/db");

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

/* ============================================================== */
/* ======================== REGISTRO =========================== */
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
          alertTitle: "Editado",
          alertMessage: "Edit exitoso",
          alertIcon: "success",
          showConfirmButton: true,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});
/* ============================================================== */
/* ======================== FIN REGISTRO =========================== */
/* ============================================================== */

/* ============================================================== */
/* ======================== LOGIN =========================== */
/* ============================================================== */
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
            alertMessage: "Usuario o contraseña incorrectos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: "/",
          });
        } else {
          req.session.loggedin = true;
          req.session.nombre = results[0].nombre;
          res.render("productos", {
            alert: true,
            alertTitle: "Conectado",
            alertMessage: "Bienvenido: " + usuario,
            alertIcon: "success",
            showConfirmButton: false,
            timer: 15000,
            ruta: "./views/productos.ejs",
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
      ruta: "/",
    });
  }
});

/* ============================================================== */
/* ======================== FIN LOGIN =========================== */
/* ============================================================== */

/* ============================================================== */
/* ======================== PRODUCTOS =========================== */
/* ============================================================== */
// ruta para ver los productos
app.get("/productos", (req, res) => {
  conexion.query("SELECT * FROM productos", (error, results) => {
    if (error) {
      console.log("EL ERROR ES " + error);
    } else {
      res.render("productos", { results: results });
    }
  });
});

// ruta para crear productos
app.get("/newProduct", (req, res) => {
  res.render("newProduct");
});

// ruta para editar productos
app.get("/edit/:id_producto", (req, res) => {
  const id_producto = req.params.id_producto;
  conexion.query(
    "SELECT * FROM productos WHERE id_producto = ?",
    [id_producto],
    (error, results) => {
      if (error) {
        console.log("EL ERROR ES " + error);
      } else {
        res.render("edit", { productos: results[0] });
      }
    }
  );
});

// ruta para eliminar productos
app.get("/delete/:id_producto", (req, res) => {
  const id_producto = req.params.id_producto;
  conexion.query(
    "DELETE FROM productos WHERE id_producto = ?",
    [id_producto],
    (error, results) => {
      if (error) {
        console.log("EL ERROR ES " + error);
      } else {
        res.redirect("/productos");
      }
    }
  );
});

// metodos del crud alojados en la ruta mostrada para interactuar con el formulario
const crud = require("./controllers/crudProductos");
app.post("/save", crud.save);
app.post("/update", crud.update);

/* ============================================================== */
/* ======================== FIN PRODUCTOS =========================== */
/* ============================================================== */

/* ========== RUTAS ========== */
// ruta de login
app.get("/", (req, res) => {
  res.render("login");
});

// ruta de registro
app.get("/registro", (req, res) => {
  res.render("registro");
});

//logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

/* ========== SERVIDOR ========== */
app.listen(3030, (req, res) => {
  console.log("Servidor corriendo http://127.0.0.1:3030");
});
