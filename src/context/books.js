import axios from 'axios';
import { createContext, useState } from 'react';

const BooksContext = createContext();

function Provider({ children }) {
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

  const editBook = async (id, title) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title,
    });

    const updatedBooks = books.map((book) => {
      if (book.id !== id) {
        return book;
      }

      return {
        ...book,
        ...response.data,
      };
    });

    setBooks(updatedBooks);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const remainingBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(remainingBooks);
  };

  const valueToShare = {
    books,
    fetchBooks,
    createBook,
    editBook,
    deleteBook,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
