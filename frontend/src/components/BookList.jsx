import BookCard from './BookCard.jsx';

function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p className="empty-state">No books to display.</p>;
  }

  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
}

export default BookList;
