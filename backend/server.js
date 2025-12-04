const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// middleware
app.use(cors());
app.use(express.json());

// in memory database
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'Scott F. Fitzgerald', year: '1925', genre: 'Fiction' }
];
let next_id = 2;
// Routes
app.get('/', (req, res) => {
    res.send('book-manager api is up and running');
});

// GET /books
app.get('/books', (req, res) => {
    console.log(`GET /books`);
    res.send(books);
});

// POST /books
app.post('/books', (req, res) => {
    // get data and assign to variables
    const data = req.body;
    console.log(`POST /books\n`, data);
    const title = data.title;
    const author = data.author;
    const year = data.year;
    const genre = data.genre;

    // check if all fields are valid
    if(!title || !author || !year || !genre){
        return res.status(400).send({error: 'Missing required fields'});
    }

    // create new book item
    const new_book = {
        id: next_id++,
        title: title,
        author: author,
        year: year,
        genre: genre
    }

    books.push(new_book);
    return res.status(201).send(new_book);
});

// PUT /books/:id
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    console.log(`PUT /books/:${id}\n`, data);

    //find the book by id
    const book = books.find(b => b.id === id);
    if(!book) {
        return res.status(404).send({error: "book not found"});
    }
    if (data.title != undefined){
        book.title = data.title;
    }
    if (data.author != undefined){
        book.author = data.author;
    }
    if (data.year != undefined){
        book.year = data.year;
    }
    if (data.genre != undefined){
        book.genre = data.genre;
    }

    return res.send({message: "edited", edited: book});
});

// DELETE /books/:id
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    // find the book by id
    const book = books.find(b => b.id === id);
    if(!book){
        return res.status(404).send({error: "book not found"});
    }
    // find the index of the book
    const book_idx = books.indexOf(book);
    books.splice(book_idx, 1);

    return res.send({message: `deleted`, deleted: book});
});

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
