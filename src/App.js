import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const createBook = (title) => {
    const updatedBooks = [
      ...books,
      {
        id: Math.round(Math.random() * 9999),
        title,
      },
    ];

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
      <BookList books={books} onEdit={editBook} onDelete={deleteBook} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
