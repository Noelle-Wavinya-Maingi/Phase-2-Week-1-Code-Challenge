import React, { useEffect, useState } from "react";
import "./App.css";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";
import SearchTransaction from "./SearchTransaction";
import SortTransaction from "./SortTransaction";

function App() {
  const [trans, setTrans] = useState([]);
  const [searchResults, setSearchResult] = useState([]);
  const [sortOption, setSortOption] = useState("category"); 
  const [category, setCategory] = useState("All");

 
  useEffect(() => {
    fetch("http://localhost:3000/transactions")
    .then(json => {setTrans(json)
    return json})
    .then(json => {setSearchResult(json)})
    },[])

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

  // const filterTransactions = trans
  //   .filter((transaction) => {
  //     if (category === "All") {
  //       return true;
  //     } else {
  //       return transaction.category === category;
  //     }
  //   })
  //   .filter((transaction) =>
  //     transaction.description.toLowerCase().includes(trans.toLowerCase())
  //   );

  const handleSortChange = (option) => {
    setSortOption(option);
  };


  return (
    <div>
      <div>
        <h1> BANK OF FLATIRON </h1>
      </div>
      <SortTransaction sortValue={handleSortChange} />
      <Transactions
        // sortedTransactions={sortedTransactions} 
        handleDeleteTransaction={handleDeleteTransaction}
      />
      <AddTransaction onFormSubmit={AddNewTransaction} />
    </div>
  );
}

export default App;
