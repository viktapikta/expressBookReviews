const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book == undefined)
    res.status(404).json({ message: "Book not found." });

  res.send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const authorToFilter = req.params.author;

    const matchingId = Object.keys(books).filter(id => 
        books[id].author.toLowerCase().includes(authorToFilter.toLowerCase())
    );

    const matchingBooks = matchingId.map(id => books[id]);
    res.send(matchingBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const titleToFilter = req.params.title;

    const matchingId = Object.keys(books).filter(id => 
        books[id].title.toLowerCase().includes(titleToFilter.toLowerCase())
    );

    const matchingBooks = matchingId.map(id => books[id]);
    res.send(matchingBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book == undefined) {
        res.status(404).json({ message: "Book not found." });
    }
    else {
        res.send(book.reviews);
    }
});

module.exports.general = public_users;
