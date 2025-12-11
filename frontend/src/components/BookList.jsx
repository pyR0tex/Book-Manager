import BookCard from './BookCard.jsx';

function BookList({ books, onEdit, onDelete }) {
  if (!books || books.length === 0) {
    return <p className="empty-state">No books found. Try adding one!</p>;
  }

  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default BookList;
