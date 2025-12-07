import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

const SAMPLE_BOOKS = [
  { id: 0, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', genre: 'Fiction' },
  { id: 1, title: '1984', author: 'George Orwell', year: '1949', genre: 'Dystopian' },
];

function App() {
  const books = SAMPLE_BOOKS; // static for now

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <section className="top-section">
          <SearchBar />
        </section>

        <section className="list-section">
          <BookList books={books} />
        </section>

        <section className="form-section">
          <BookForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;