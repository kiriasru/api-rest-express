const express = require("express");
const app = express();
const PORT = 3000;

// Simular base con libros
let libros = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        anioPublicacion: 1967
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Distopía",
        anioPublicacion: 1949
    },
    {
        id: 3,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        genero: "Aventura",
        anioPublicacion: 1605
    },
    {
        id: 4,
        titulo: "Orgullo y prejuicio",
        autor: "Jane Austen",
        genero: "Romance",
        anioPublicacion: 1813
    },
    {
        id: 5,
        titulo: "El señor de los anillos",
        autor: "J. R. R. Tolkien",
        genero: "Fantasía",
        anioPublicacion: 1954
    },
    {
        id: 6,
        titulo: "Fahrenheit 451",
        autor: "Ray Bradbury",
        genero: "Ciencia ficción",
        anioPublicacion: 1953
    },
    {
        id: 7,
        titulo: "Crimen y castigo",
        autor: "Fiódor Dostoyevski",
        genero: "Drama psicológico",
        anioPublicacion: 1866
    },
    {
        id: 8,
        titulo: "Los juegos del hambre",
        autor: "Suzanne Collins",
        genero: "Distopía",
        anioPublicacion: 2008
    },
    {
        id: 9,
        titulo: "El código Da Vinci",
        autor: "Dan Brown",
        genero: "Misterio",
        anioPublicacion: 2003
    },
    {
        id: 10,
        titulo: "It",
        autor: "Stephen King",
        genero: "Terror",
        anioPublicacion: 1986
    }
];

// Middleware
app.use(express.json());

// GET - Obtener todos los libros
app.get("/api/books", (req, res) => {
    try {
        console.log("Solicitud para obtener todos los libros");
        
        res.status(200).json({
            success: true,
            data: libros,
            count: libros.length,
            message: `Se encontraron ${libros.length} libros`
        });
        
    } catch (error) {
        console.error("Error al obtener libros:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener los libros"
        });
    }
});


// GET - Obtener un libro por su ID
app.get("/api/books/:id", (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        console.log(`Solicitud para obtener el libro con ID: ${bookId}`);               

        const libro = libros.find(b => b.id === bookId);
        if (!libro) {
            return res.status(404).json({
                success: false,
                message: "Libro no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: libro,
            message: `Se encontró el libro con ID: ${bookId}`
        });

    } catch (error) {
        console.error("Error al obtener el libro:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener el libro"
        });
    }
});


// POST - Agregar un nuevo libro


// PUT - Actualizar un libro existente.


// DELETE - Eliminar un libro por su ID


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});