function SearchBar() {
  return (
    <div className="search-bar">
      <label htmlFor="search">Search by title or author</label>
      <input
        id="search"
        type="text"
        placeholder="Search books..."
      />
    </div>
  );
}

export default SearchBar;
