import React, {useState} from "react";

function AddTransaction({onFormSubmit}) {
    const [newTransaction, setTransaction] = useState({
        date: "",
        description: "",
        amount: "",
        category: "",
      });
      function handleField(e) {
        const { name, value } = e.target;
        setTransaction({ ...newTransaction, [name]: value });
      }
    

  return (
    <form
      onSubmit={(e) => {
        //e.preventDefault();
        onFormSubmit(newTransaction);
      }}
      className="new-form"
    >
      <label>
        Date:{" "}
        <input
          value={newTransaction.date}
          onChange={handleField}
          type="date"
          name="date"
        />
      </label>
      <label>
        Description:{" "}
        <input
          value={newTransaction.description}
          onChange={handleField}
          type="text"
          name="description"
        />
      </label>
      <label>
        Amount:{" "}
        <input
          value={newTransaction.amount}
          onChange={handleField}
          type="number"
          name="amount"
        />
      </label>
      <label>
        Category:{" "}
        <input
          value={newTransaction.category}
          onChange={handleField}
          type="text"
          name="category"
        />
      </label>
      <input type="submit" value="Add Transaction" />
    </form>
  );
}

export default AddTransaction;
