const express = require("express");

const app = express();
const puerto = 3000;
app.listen(`${puerto}`, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});

const JSON = {
  description: "Productos",
  items: [
    { id: 1, nombre: "Taza de Harry Potter", precio: 300 },
    { id: 2, nombre: "FIFA 22 PS5", precio: 1000 },
    { id: 3, nombre: "Figura Goku Super Saiyan", precio: 100 },
    { id: 4, nombre: "Zelda Breath of the Wild", precio: 200 },
    { id: 5, nombre: "Skin Valorant", precio: 120 },
    { id: 6, nombre: "Taza de Star Wars", precio: 220 },
  ],
};

//get productos
app.get("/products", (req, res) => {
  res.send(JSON);
});

//post new product
app.post("/products/newproduct", (req, res) => {
  const newProduct = {
    id: JSON.items.length + 1,
    nombre: "Crazy taxi",
    precio: 125,
  };
  JSON.items.push(newProduct);
  res.send(JSON);
});

//Actualizar Producto
app.put("/products/modify/:id", (req, res) => {
  const found = req.params;
  JSON.items.forEach((f) => {
    if (f.id == found.id) {
      res.send("Update the product: " + f.nombre);
    }
  });
});

//Eliminar Producto
app.delete("/products/delete/:id", (req, res) => {
  const productsarray = JSON.items;
  const filterbyID = productsarray.filter((f) => f.id !== +req.params.id);
  console.log("Deleted by Id: " + req.params.id);
  res.status(200).send(filterbyID);
});
