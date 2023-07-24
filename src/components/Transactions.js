import { useEffect, useState } from "react";
import TransactionData from "./TransactionData";
import SearchTransaction from "./SearchTransaction";

function Transactions({handleDeleteTransaction}) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
      const results = transactions.filter(item => item.description.includes(search ) || item.category.includes(search))
    
  //const Content = results?. lenght ? results : <p>No Result found</p>
  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not okay");
      })
      .then((transactions) => setTransactions(transactions))
      .catch((error) => console.error("Error Fetching data:", error));
  }, []);

  return (
    <div>
      <SearchTransaction handleSearchChange={handleSearchChange} />
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
        <TransactionData transactions={results} handleDeleteTransaction={handleDeleteTransaction} />
        {/* <main>{Content}</main> */}
      </table>
    </div>
  );
}

export default Transactions;
