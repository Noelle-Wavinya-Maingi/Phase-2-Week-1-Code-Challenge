import React, { useState } from "react";
import "./App.css";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";

function App() {
  const [trans, setTrans] = useState([]);

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
  function handleDeleteTransaction( id ) {
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
  return (
    <div>
      <div>
        <h1> BANK OF FLATIRON </h1>
      </div>
      <Transactions
        transactions={trans}
        handleDeleteTransaction={handleDeleteTransaction}
      />
      <AddTransaction onFormSubmit={AddNewTransaction} />
    </div>
  );
}

export default App;
