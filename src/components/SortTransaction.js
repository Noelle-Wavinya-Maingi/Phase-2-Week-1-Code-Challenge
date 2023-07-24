function SortTransaction({sortValue}) {
    function handleSortChange(e){
        sortValue(e.target.value)
    }

    return (
        <div className="sort-container">
        <label className="sort-label">Sort By:</label>
        <select className="sort-select" onChange={handleSortChange}>
          <option value="category">Category</option>
          <option value="description">Description</option>
        </select>
      </div>
    )
}

export default SortTransaction