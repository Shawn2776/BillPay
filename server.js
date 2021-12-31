const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const { append } = require("express/lib/response");

const AuthorsRoutes = require("./routes/authors");
const BooksRoutes = require("./routes/books");

const app = express();
app.use(bodyParser.json());

app.use("/authors", AuthorsRoutes);
app.use("/books", BooksRoutes);



app.listen(3000);