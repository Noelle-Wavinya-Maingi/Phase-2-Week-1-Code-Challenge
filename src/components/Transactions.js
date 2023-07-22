import { useEffect, useState } from "react";
import TransactionData from "./TransactionData";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not okay");
        }
        return res.json();
      })
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.error("Error Fetching data:", error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <TransactionData transactions={transactions}  />
      </table>
    </div>
  );
}

export default Transactions;
