function SearchBar({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <label htmlFor="search">Search by title or author</label>
      <input
        id="search"
        type="text"
        placeholder="Search books..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
