interface ItemProps {
    name: string;
    quantity: number;
    category: string;
}

export default function Item({name, quantity, category}: ItemProps) {
    return (
        <li className="font-bold text-white">
            {category.toUpperCase()}: {quantity} {name.charAt(0).toUpperCase() + name.slice(1)}
        </li>
    );
}