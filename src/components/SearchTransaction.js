
function SearchTransaction({ handleSearchChange }) {
const handleSubmitSearch = (e) => {
  e.preventDefault()
}

  return (
    <div className="search-container">
      <form onSubmit={handleSubmitSearch}>
      <input
        type="text"
        name="search-bar"
        placeholder="Search here...."
        onChange={handleSearchChange}
      />
      <button className="search-button">Search</button>
      </form>
    </div>
  );
}

export default SearchTransaction;
