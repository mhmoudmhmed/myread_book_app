import React, { useState } from "react";
import propTypes from "prop-types";

const BookShelfChanger = ({ book, onChangeShelf }) => {
  const [shelfValue, setShelfValue] = useState(book.shelf);

  const changeShelf = (e) => {
    console.log("e.target.value", e.target.value);
    setShelfValue(e.target.value);
    onChangeShelf(book, e.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select value={shelfValue} onChange={changeShelf}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

BookShelfChanger.propTypes = {
  book: propTypes.object.isRequired,
  onChangeShelf: propTypes.func.isRequired,
};

export default BookShelfChanger;
