const express = require("express");
const app = express();
const db = require("./config/database");

const PORT = 3000;

app.use(express.json());

//Ejercicio 1
//Creando base de datos
app.get("/createdb", (req, res) => {
  const sql = "CREATE DATABASE expressconSQL";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send("Database created...");
  });
});

//creando tablas Products && Categories
app.get("/createCategoriesTable", (req, res) => {
  const sql =
    "CREATE TABLE categories(id int AUTO_INCREMENT,categorie_name VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send("Categories table created...");
  });
});

app.get("/createProductsTable", (req, res) => {
  const sql =
    "CREATE TABLE products(id int AUTO_INCREMENT,product_name VARCHAR(255), description VARCHAR(255), price int(50), categories_id int, PRIMARY KEY(id), FOREIGN KEY (categories_id) REFERENCES categories(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send("Products table created...");
  });
});

//Ejercicio 2
//crear nueva categoria
app.post("/newCategory", (req, res) => {
  const { categorie_name } = req.body;
  const sql = `INSERT INTO categories (categorie_name) values ('${categorie_name}');`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send("Categorie added...");
  });
});

//crear nuevo producto
app.post("/newProduct", (req, res) => {
  const { product_name, description, price, categories_id } = req.body;
  if (!product_name || !description || !price || !categories_id)
    return res.status(400).send("Error: Falta algún campo por rellenar");
  const sql = `INSERT INTO products (product_name, description, price, categories_id) values ('${product_name}', '${description}', '${price}', '${categories_id}');`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send("Product added...");
  });
});

//Ejercicio 3
//modificando categoria
app.put("/categories/id/:id", (req, res) => {
  const id = req.params.id;
  const categorie_name = req.body.categorie_name;
  const updateCategory = `UPDATE categories SET categorie_name = '${categorie_name}' WHERE id = ${id}`;
  db.query(updateCategory, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//modificando producto
app.put("/products/id/:id", (req, res) => {
  const id = req.params.id;
  const { product_name, description } = req.body;
  const updateProduct = `UPDATE products SET product_name = '${product_name}', description = '${description}' WHERE id = ${id}`;
  db.query(updateProduct, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(PORT, () => console.log(`server started at port ${PORT}`));

//Ejercicio 4
//ver productos
app.get("/seeAllProducts", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const arrayproducts = [];
    result.forEach((p) => {
      arrayproducts.push(p.product_name);
    });
    res.status(200).send(arrayproducts);
  });
});

//ver categorias
app.get("/seeAllCategories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const arraycategories = [];
    result.forEach((p) => {
      arraycategories.push(p.categorie_name);
    });
    res.status(200).send(arraycategories);
  });
});

//productos con categoria
app.get("/seeAllProductswithCategories", (req, res) => {
  const sql =
    "SELECT products.product_name, categories.categorie_name FROM products inner join `categories` on products.`categories_id` = categories.`id`";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const arrayproductsandcategories = [];

    result.forEach((p) => {
      arrayproductsandcategories.push(p);
    });
    res.status(200).send(arrayproductsandcategories);
  });
});

//Ver por ID producto
app.get("/products/id/:id", (req, res) => {
  const idreq = req.params.id;
  const sql = `SELECT * FROM products WHERE id = ${idreq}`;
  db.query(sql, (err, result) => {
    const err1 = "No existe producto con este ID";
    if (result.length == 0) {
      res.status(400).send(err1);
    } else {
      res.status(200).send(result);
    }
  });
});

//Descendente
app.get("/seeAllProductsdescendent", (req, res) => {
  const sql =
    "SELECT products.product_name, categories.categorie_name FROM products inner join `categories` on products.`categories_id` = categories.`id` ORDER BY `product_name` DESC";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const arrayproductsandcategories = [];

    result.forEach((p) => {
      arrayproductsandcategories.push(p);
    });
    res.status(200).send(arrayproductsandcategories);
  });
});

//Ver por ID categoria
app.get("/categories/id/:id", (req, res) => {
  const idreq = req.params.id;
  const sql = `SELECT * FROM categories WHERE id = ${idreq}`;
  db.query(sql, (err, result) => {
    const err1 = "No existe categoria con este ID";
    if (result.length == 0) {
      res.status(400).send(err1);
    } else {
      res.status(200).send(result);
    }
  });
});

//select por nombre
app.get("/products/name/:name", (req, res) => {
  const namereq = req.params.name;

  const sql = `SELECT * FROM products WHERE product_name = "${namereq}"`;
  db.query(sql, (err, result) => {
    const err1 = "No existe producto con este nombre";
    if (result == 0) {
      res.status(400).send(err1);
    } else {
      res.status(200).send(result);
    }
  });
});

//delete por id
app.delete("/products/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM products WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Producto borrado...");
  });
});
