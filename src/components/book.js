import propTypes from "prop-types";
import React from "react";
import BookShelfChanger from "./bookShelfChanger";

const Book = ({ book, key, shelfChanger, shelf }) => {
  return (
    <div className="bookshelf-books" key={key}>
      <ol className="books-grid">
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: book.imageLinks
                    ? `url(${book.imageLinks.thumbnail})`
                    : "none",
                }}
              ></div>
              <BookShelfChanger
                book={book}
                onChangeShelf={shelfChanger}
                shelf={shelf}
              />
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors &&
              book.authors.map((author) => (
                <div className="book-authors" key={author}>
                  {author}
                </div>
              ))}
          </div>
        </li>
      </ol>
    </div>
  );
};

Book.prototype = {
  book: propTypes.array.isRequired,
  shelfChanger: propTypes.func.isRequired,
};

export default Book;
