const express = require("express");

const app = express();
const puerto = 3000;
app.listen(`${puerto}`, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});

//Mensaje de bienvenida...
app.get("/", (req, res) => {
  res.send("hola, bienvenido");
});

//Parte de los productos:
app.get("/Productos", (req, res) => {
  res.send("Listado de productos");
});

app.post("/Productos", (req, res) => {
  res.send("crear producto");
});

app.put("/Productos", (req, res) => {
  res.send("Actualizar producto");
});

app.delete("/Productos", (req, res) => {
  res.send("Borrar producto");
});

//Parte de los Usuarios:
app.get("/Usuarios", (req, res) => {
  res.send("Listado de Usuarios");
});

app.post("/Usuarios", (req, res) => {
  res.send("crear usuario");
});

app.put("/Usuarios", (req, res) => {
  res.send("Actualizar usuario");
});

app.delete("/Usuarios", (req, res) => {
  res.send("Borrar usuario");
});
