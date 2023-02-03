import { useState } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  };

  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [...books, response.data];

    setBooks(updatedBooks);
  };

  const editBook = (id, title) => {
    const updatedBooks = books.map((book) => {
      if (book.id !== id) {
        return book;
      }

      return {
        ...book,
        title,
      };
    });

    setBooks(updatedBooks);
  };

  const deleteBook = (id) => {
    const remainingBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(remainingBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onEdit={editBook} onDelete={deleteBook} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
