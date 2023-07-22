import React from "react";

function TransactionData({ date, description, category, amount }) {
  return (
    <tbody>
      <tr>
        <td>{date}</td>
        <td>{description}</td>
        <td>{category}</td>
        <td>{amount}</td>
        <button>Delete</button>
      </tr>
    </tbody>
  );
}

export default TransactionData;
