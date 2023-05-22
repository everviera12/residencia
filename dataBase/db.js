const mysql = require("mysql");
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conexion.connect((error) => {
  if (error) {
    console.log("Error en la conexion a la base de datos " + error);
    return;
  }
  console.log("\x1b[33m%s\x1b[0m", "Conectado a la base de datos");
});

module.exports = conexion;
