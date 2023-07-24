import { useEffect, useState } from "react";

function SearchTransaction({ searchValue }) {
const [searchInput, setSearchInput] = useState("")

  function handleSearch(e) {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    searchValue(searchInput)
  }, [searchInput, searchValue])

  return (
    <div className="search-container">
      <input
        type="text"
        name="search-bar"
        placeholder="Search here...."
        onChange={handleSearch}
        value={searchInput}
      />
      <button onClick={()=> searchValue(searchInput)}>Search</button>
    </div>
  );
}

export default SearchTransaction;
