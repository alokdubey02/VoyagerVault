import { useState } from "react";
import Form from "./component/Form";
import Logo from "./component/Logo";
import PackingList from "./component/PackingList";
import Stats from "./component/Stats";

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

  function handleClearList() {
    // it is a part of web api
    const confirmedObj = window.confirm(
      "Are you sure want to delete all items?"
    );

    if (confirmedObj) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      {/*passing the items array to the child , so that the data from child to parent can transfer*/}
      <Stats items={items} />
    </div>
  );
}
