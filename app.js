const express = require("express");
const app = express();
const PORT = 3000;

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

app.use(express.json());

app.get("/api/books", (req, res) => {
    try {
        
        res.status(200).json({
            success: true,
            data: libros,
            count: libros.length,
            message: `Se encontraron ${libros.length} libros`
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener los libros"
        });
    }
});

app.get("/api/books/:id", (req, res) => {
    try {
        const bookId = parseInt(req.params.id);               

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
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener el libro"
        });
    }
});

app.post("/api/books", (req, res) => {
    const libro = req.body;
    const existe = libros.some(libr => libr.id === libro.id);

    if (existe) {
        res.status(409).json({status: 409, message: "ID duplicado"});
    } else {
        libros.push(libro);
        res.json({status: 200, message: "Success", data: libros});
    }

});

app.put ('/api/book/:id', (req, res) => {
    const id = req.params.id;
    const libro = req.body;
    let exist = false;
    
    libros.forEach(lbook =>{
        if(lbook.id == id){
            exist = true;
            lbook.titulo = libro.titulo;
            lbook.autor = libro.autor;
            lbook.genero = libro.genero;
            lbook.anioPublicacion = libro.anioPublicacion;  
        }
    });
    if(exist){
        res.status(200).send({message: 'Libro actualizado correctamente'});
    }else{
        res.status(404).send({message: 'Libro no encontrado'});
    }
});

app.delete("/api/books/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const filtroLibros = libros.filter(libro => libro.id !== id);

    if (filtroLibros.length !== libros.length) {
        libros = filtroLibros;
        res.json({status: 200, message: "Libro eliminado exitosamente"});
    } else {
        res.status(404).json({status: 404, message: "Libro no encontrado"});
    }

});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});