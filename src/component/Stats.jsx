export default function Stats({ items }) {
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
