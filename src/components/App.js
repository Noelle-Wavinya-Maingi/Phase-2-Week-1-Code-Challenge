import React, { useState } from "react";
import "./App.css";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";
import SearchTransaction from "./SearchTransaction";
import SortTransaction from "./SortTransaction";

function App() {
  const [trans, setTrans] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("category"); // Default sorting by category

  function AddNewTransaction(newTrans) {
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrans),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not okay");
      })
      .then((data) => {
        setTrans([...trans, data]);
      })
      .catch((error) => {
        console.error("Error Adding New Transaction", error);
      });
  }

  function handleDeleteTransaction(id) {
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not okay");
      })
      .then(() => {
        setTrans((transactions) =>
          transactions.filter((transaction) => transaction.id !== id)
        );
      });
  }

  const filterTransactions = trans.filter((transaction) => {
    const searchTerm = searchInput.trim().toLowerCase();
    return (
      searchTerm === "" ||
      transaction.description.toLowerCase().includes(searchTerm)
    );
  });

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Sort transactions based on the selected option
  const sortedTransactions = filterTransactions.slice().sort((a, b) => {
    if (sortOption === "category") {
      return a.category.localeCompare(b.category);
    } else {
      return a.description.localeCompare(b.description);
    }
  });

  return (
    <div>
      <div>
        <h1> BANK OF FLATIRON </h1>
      </div>
      <SearchTransaction searchValue={setSearchInput} />
      <SortTransaction sortValue={handleSortChange} />
      <Transactions
        transactions={sortedTransactions} // Use the sorted transactions here
        handleDeleteTransaction={handleDeleteTransaction}
      />
      <AddTransaction onFormSubmit={AddNewTransaction} />
    </div>
  );
}

export default App;
