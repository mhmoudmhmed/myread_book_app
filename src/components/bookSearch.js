import React, { useState } from "react";
import Back from "./backHome";
import * as API from "../BooksAPI";
import Book from "./book";
import propTypes from "prop-types";

const BookSearch = ({ shelfChanger, books }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log("searchResults", searchResults);

  const handleChange = (e) => {
    const selectedShelf = e.target.value;
    // setQuery(selectedShelf).debounceTime(200);
    setQuery(selectedShelf);

    API.search(selectedShelf)
      .then((books) => {
        if (books.error) {
          setSearchResults([]);
        } else {
          setSearchResults(books);
        }
      })
      .catch(setSearchResults([]));
  };

  searchResults.map((searchedBook) => {
    books.map((book) => {
      if (book.id === searchedBook.id) {
        searchedBook.shelf = book.shelf;
      }
    });
    if (!searchedBook.shelf) {
      searchedBook.shelf = "none";
    }
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Back />
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book book={book} shelfChanger={shelfChanger} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookSearch.propTypes = {
  shelfChanger: propTypes.func.isRequired,
  books: propTypes.array.isRequired,
};

export default BookSearch;
