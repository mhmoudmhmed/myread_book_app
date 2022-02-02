import propTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Book from "./book";

const BookShilf = ({ title, shelfName, books, shelfChanger }) => {
  const myBooks = books
    .filter((book) => book.shelf === shelfName)
    .map((book) => (
      <li key={book.id}>
        <Book book={book} shelf={shelfName} shelfChanger={shelfChanger} />
      </li>
    ));

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{myBooks}</ol>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button />
        </Link>
      </div>
    </div>
  );
};

BookShilf.propTypes = {
  title: propTypes.string.isRequired,
  shelfName: propTypes.string.isRequired,
  books: propTypes.array.isRequired,
  shelfChanger: propTypes.func.isRequired,
};

export default BookShilf;
