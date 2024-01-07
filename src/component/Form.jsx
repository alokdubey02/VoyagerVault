import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //e here when onSubmit button hit it will call handleSubmit function then it will pass into the function the event(e) object
  function handleSubmit(e) {
    e.preventDefault(); //it is used to prevent the reload of the page while submit

    if (!description) return; //it is used to prevent from adding without description

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription(""); //it is used to back to the default value or initial state when we hit enter or on adding.
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍 ??</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* {method 1 to add options } */}
        {/* <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option> */}
        {/* {method 2 using array map method in javascript} */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((numObj) => (
          <option value={numObj} key={numObj}>
            {numObj}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      {/* {we can also use onClick function in button but using onClick it only works when button is clicked and here using onSubmit function in form can work in both condition on clicking the button and hitting the enter button also thats why i use here onSubmit } */}
      <button>Add</button>
    </form>
  );
}
