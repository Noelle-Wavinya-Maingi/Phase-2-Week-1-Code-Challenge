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
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionData
              key={transaction.id}
              date={transaction.date}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
