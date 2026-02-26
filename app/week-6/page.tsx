"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import { useState } from "react";

export default function Page() {
  const [items, setItems] = useState(itemsData.map(({ id, ...rest }) => rest));
  const handleAddItem = (item: {
    name: string;
    quantity: number;
    category: string;
  }) => {
    setItems([...items, item]);
  };
  return (
    <main className="bg-[#141515] text-white flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
      <h1 className="text-4xl font-bold pb-8">Shopping List</h1>
      <div className="flex flex-col gap-2 justify-center items-center">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
