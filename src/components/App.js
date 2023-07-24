import React, { useEffect, useState } from "react";
import "./App.css";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";

function App() {
  const [trans, setTrans] = useState([]);

  const fetchData=() =>{
    fetch("http://localhost:3000/transactions")
      .then(res =>{
        if(!res.ok){
          throw new Error('Failed')
        }
        return res.json()
      })
      .then((data) =>{
        setTrans(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

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

   const [transact ,settransact] = useState([]);
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
      .then((data) => {
        console.log(data)
         const handledata = transact.filter((item)=> item.id !==id)
         settransact(handledata)
         fetchData()
      });
  }
 
 

  return (
    <div>
      <div>
        <h1> BANK OF FLATIRON </h1>
      </div>
      <AddTransaction onFormSubmit={AddNewTransaction} />
      <Transactions handleDeleteTransaction={handleDeleteTransaction} />
    </div>
  );
}

export default App;
