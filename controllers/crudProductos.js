const conexion = require("../dataBase/db");

// agregar productos
exports.save = (req, res) => {
  const proveedor = req.body.proveedor;
  const num_part = req.body.num_part;
  const nom_prod = req.body.nom_prod;
  const made_in = req.body.made_in;
  const cantidad = req.body.cantidad;
  const prod_desc = req.body.prod_desc;
  const prod_app = req.body.prod_app;
  const row_material = req.body.row_material;

  conexion.query(
    "INSERT INTO productos SET ?",
    {
      proveedor: proveedor,
      num_part: num_part,
      nom_prod: nom_prod,
      made_in: made_in,
      cantidad: cantidad,
      prod_app: prod_app,
      row_material: row_material,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/productos");
      }
    }
  );
};

// editar el producto
exports.update = (req, res) => {
  const id_producto = req.body.id_producto;
  const proveedor = req.body.proveedor;
  const num_part = req.body.num_part;
  const nom_prod = req.body.nom_prod;
  const made_in = req.body.made_in;
  const cantidad = req.body.cantidad;
  const prod_desc = req.body.prod_desc;
  const prod_app = req.body.prod_app;
  const row_material = req.body.row_material;

  conexion.query(
    "UPDATE productos SET ? WHERE id_producto = ?",
    [
      {
        proveedor,
        num_part,
        nom_prod,
        made_in,
        cantidad,
        prod_desc,
        prod_app,
        row_material,
      },
      id_producto,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/productos");
      }
    }
  );
};

