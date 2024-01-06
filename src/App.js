import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Soc", quantity: 12, packed: false },
//   { id: 4, description: "ks", quantity: 12, packed: true },
// ];

export default function App() {
  // this useState is used for adding the new data added in the storage or in array so we have to declare the state in parents component
  // const [items, setItems] = useState(initialItems); here initialItems is an example for the default value array as defined above
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // this function is used for checking the packed item
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      {/*passing the items array to the child , so that the data from child to parent can transfer*/}
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>💪 VoyagerVault</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            itemObj={item}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ itemObj, onDeleteItems, onToggleItem }) {
  // function Item(props) {
  // return <li>{props.item.description}</li>;
  return (
    <div>
      <li>
        <input
          type="checkbox"
          value={itemObj.packed}
          onChange={() => onToggleItem(itemObj.id)}
        />
        <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
          {itemObj.quantity} {itemObj.description}
        </span>
        {/* if i use onDeleteItems(itemObj.id) then it calls the function immediately and delete all items. so not forget to use ()=>and then call the function with passing id to delete the item with the right id not all the element at once*/}
        <button onClick={() => onDeleteItems(itemObj.id)}>❌</button>
      </li>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );
  const noOfItems = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  return (
    <footer className="stats">
      <em>
        {/* math.round is used to roundup the value */}
        {noOfItems === itemsPacked
          ? "You got everything! ready to go✈️"
          : `
        👜 You have ${noOfItems} items on your list, and you already packed
        ${itemsPacked}(${Math.round((itemsPacked / noOfItems) * 100)}%)`}
      </em>
    </footer>
  );
}
