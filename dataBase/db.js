const mysql = require("mysql");
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
});

conexion.connect((error) => {
  if (error) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Error en la conexión a la base de datos: " + error
    );
    return;
  }
  console.log("\x1b[33m%s\x1b[0m", "Conectado a la base de datos");
});

// Realizar consulta para obtener los datos
conexion.query("SELECT * FROM usuarios", (error, results) => {
  if (error) {
    console.log("ERROR AL EJECUTAR LA CONSULTA: " + error);
    return;
  } else {
    // Muestra los datos en la terminal
    console.log("Los datos son: ");
    results.forEach((row) => {
      console.log(row);
    });
  }
});

module.exports = conexion;
