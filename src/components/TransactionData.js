import React from "react";

function TransactionData({ transactions, handleDeleteTransaction }) {
  return (
    <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction.id}>
          <td>{transaction.date}</td>
          <td>{transaction.description}</td>
          <td>{transaction.category}</td>
          <td>{transaction.amount}</td>
          <td>
            <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TransactionData;
