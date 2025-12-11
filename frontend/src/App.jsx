import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

const API_URL = 'http://localhost:3001/books'; 

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError('Error loading books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
    );
  });

  const handleAddBook = async (formData) => {
    try {
      setError('');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to add book');
      }
      const newBook = await res.json();
      setBooks((prev) => [...prev, newBook]);
    } catch (err) {
      console.error(err);
      setError('Error adding book.');
    }
  };

  const handleUpdateBook = async (id, formData) => {
    try {
      setError('');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to update book');
      }
      const updated = await res.json();
      const updatedBook = updated.edited || updated;

      setBooks((prev) =>
        prev.map((b) => (b.id === id ? updatedBook : b))
      );
      setEditingBook(null);
    } catch (err) {
      console.error(err);
      setError('Error updating book.');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      setError('');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete book');
      }
      await res.json(); 
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error deleting book.');
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <section className="top-section">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </section>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading books...</p>
        ) : (
          <BookList
            books={filteredBooks}
            onEdit={handleEditClick}
            onDelete={handleDeleteBook}
          />
        )}

        <section className="form-section">
          <BookForm
            key={editingBook ? editingBook.id : 'new'}
            editingBook={editingBook}
            onAdd={handleAddBook}
            onUpdate={handleUpdateBook}
            onCancelEdit={handleCancelEdit}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
