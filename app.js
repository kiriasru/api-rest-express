const express = require("express");
const app = express();
const PORT = 3000;

// Simular base con libros
let libros = [];

// Middleware
app.use(express.json());

// GET - Obtener todos los libros


// GET - Obtener un libro por su ID


// POST - Agregar un nuevo libro


// PUT - Actualizar un libro existente.


// DELETE - Eliminar un libro por su ID


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});