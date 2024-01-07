export default function Item({ itemObj, onDeleteItems, onToggleItem }) {
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
