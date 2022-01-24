import React, { useEffect, useState } from "react";
import * as API from "./BooksAPI";
import "./App.css";
import BookShilf from "./components/bookShelf";
import BookSearch from "./components/bookSearch";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [allbooks, setAllBooks] = useState([]);

  useEffect(() => {
    API.getAll().then((books) => {
      setAllBooks(books);
    });
  }, []);

  const changeBookShelf = (book, shelf) => {
    API.update(book, shelf).then((books) => {
      if (book.shelf === "none" && shelf !== "none") {
        const addedBooks = [...allbooks, book];
        setAllBooks(addedBooks);
        console.log("addedBooks", addedBooks);
      }
    });

    const updatedAllBooks = allbooks.map((selectedBook) => {
      if (selectedBook.id === book.id) {
        selectedBook.shelf = shelf;
      }
      return selectedBook;
    });

    setAllBooks(updatedAllBooks);

    // delete book when choose none
    if (shelf === "none") {
      const filterBooks = allbooks.filter(
        (deletedBook) => deletedBook.id !== book.id
      );
      setAllBooks(filterBooks);
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShilf
                  books={allbooks}
                  title="Currently Reading"
                  shelfName="currentlyReading"
                  shelfChanger={changeBookShelf}
                />
                <BookShilf
                  books={allbooks}
                  title="Want To Read"
                  shelfName="wantToRead"
                  shelfChanger={changeBookShelf}
                />
                <BookShilf
                  books={allbooks}
                  title="Read"
                  shelfName="read"
                  shelfChanger={changeBookShelf}
                />
              </div>
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <BookSearch books={allbooks} shelfChanger={changeBookShelf} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
