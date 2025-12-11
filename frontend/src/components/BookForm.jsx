import { useEffect, useState } from 'react';

const EMPTY_FORM = {
  title: '',
  author: '',
  year: '',
  genre: '',
};

function BookForm({ editingBook, onAdd, onUpdate, onCancelEdit }) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || '',
        author: editingBook.author || '',
        year: editingBook.year || '',
        genre: editingBook.genre || '',
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.year || !formData.genre) {
      alert('Please fill in all fields.');
      return;
    }

    if (editingBook) {
      onUpdate(editingBook.id, formData);
    } else {
      onAdd(formData);
    }

    setFormData(EMPTY_FORM);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData(EMPTY_FORM);
    onCancelEdit();
  };

  return (
    <div className="book-form-container">
      <h2>{editingBook ? 'Edit Book' : 'Add a New Book'}</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Author
          <input
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
          />
        </label>

        <label>
          Year
          <input
            name="year"
            type="text"
            value={formData.year}
            onChange={handleChange}
          />
        </label>

        <label>
          Genre
          <input
            name="genre"
            type="text"
            value={formData.genre}
            onChange={handleChange}
          />
        </label>

        <div className="form-actions">
          <button type="submit">
            {editingBook ? 'Save Changes' : 'Add Book'}
          </button>
          {editingBook && (
            <button className="secondary-button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
