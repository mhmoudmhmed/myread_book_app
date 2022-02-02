import propTypes from "prop-types";
import React from "react";
import BookShelfChanger from "./bookShelfChanger";

const Book = ({ book, shelfChanger }) => {
  return (
    <div className="bookshelf-books">
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
              <BookShelfChanger book={book} onChangeShelf={shelfChanger} />
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

Book.propTypes = {
  book: propTypes.object.isRequired,
  shelfChanger: propTypes.func.isRequired,
};

export default Book;
