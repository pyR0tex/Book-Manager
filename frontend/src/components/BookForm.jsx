function BookForm() {
  return (
    <div className="book-form-container">
      <h2>Add or Edit Book</h2>
      <form className="book-form">
        <label>
          Title
          <input name="title" type="text" />
        </label>

        <label>
          Author
          <input name="author" type="text" />
        </label>

        <label>
          Year
          <input name="year" type="text" />
        </label>

        <label>
          Genre
          <input name="genre" type="text" />
        </label>

        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
