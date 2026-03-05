interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}

export default function Item({
  name,
  quantity,
  category,
  onSelect,
}: ItemProps) {
  return (
    <li
      className="font-bold text-white hover: cursor-pointer"
      onClick={() => onSelect()}
    >
      {category.toUpperCase()}: {""}
      <span className="font-medium">
        {quantity} {name.charAt(0).toUpperCase() + name.slice(1)}
      </span>
    </li>
  );
}
