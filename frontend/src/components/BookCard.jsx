function BookCard({ book }) {
  const { title, author, year, genre } = book;

  return (
    <article className="book-card">
      <h3 className="book-title">{title}</h3>
      <p className="book-author">{author}</p>
      <p className="book-meta">
        <span>{year}</span> · <span>{genre}</span>
      </p>
      <div className="book-actions">
        <button>Edit</button>
        <button className="delete-button">Delete</button>
      </div>
    </article>
  );
}

export default BookCard;
