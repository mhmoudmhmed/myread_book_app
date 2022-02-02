import React from "react";
import * as API from "./BooksAPI";
import "./App.css";
import BookShilf from "./components/bookShelf";
import BookSearch from "./components/bookSearch";
import { Routes, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    API.getAll().then((books) => {
      this.setState({ books });
    });
  }

  changeBookShelf = async (book, shelf) => {
    await API.update(book, shelf).then((books) => {
      if (book.shelf === "none" && shelf !== "none") {
        this.setState((prevState) => {
          const addNewBooks = prevState.books.concat(book);
          return { books: addNewBooks };
        });
      }
    });

    const updatedAllBooks = this.state.books.map((selectedBook) => {
      if (selectedBook.id === book.id) {
        selectedBook.shelf = shelf;
      }
      return selectedBook;
    });

    // delete book when choose none
    if (shelf === "none") {
      this.setState((prevState) => {
        const filteredBooks = prevState.books.filter(
          (deletedBook) => deletedBook.id !== book.id
        );
        return { books: filteredBooks };
      });
    }

    this.setState({
      books: updatedAllBooks,
    });
    console.log("updatedAllBooks", updatedAllBooks);
  };

  render() {
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
                    books={this.state.books}
                    title="Currently Reading"
                    shelfName="currentlyReading"
                    shelfChanger={this.changeBookShelf}
                  />
                  <BookShilf
                    books={this.state.books}
                    title="Want To Read"
                    shelfName="wantToRead"
                    shelfChanger={this.changeBookShelf}
                  />
                  <BookShilf
                    books={this.state.books}
                    title="Read"
                    shelfName="read"
                    shelfChanger={this.changeBookShelf}
                  />
                </div>
              </div>
            }
          />
          <Route
            path="/search"
            element={
              <BookSearch
                books={this.state.books}
                shelfChanger={this.changeBookShelf}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
