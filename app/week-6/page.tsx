"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import { useState } from "react";

export default function Page() {
  const [items, setItems] = useState(itemsData.map(({ id, ...rest }) => rest)); //remove id from itemsData
  const handleAddItem = (newItem: {
    name: string;
    quantity: number;
    category: string;
  }) => {
    setItems([...items, newItem]);
  };
  return (
    <main className="bg-[#141515] text-white flex flex-col items-center justify-center min-h-screen pt-8 pb-8">
      <h1 className="text-4xl font-bold pb-8">Shopping List</h1>
      <div className="flex flex-col justify-center items-center gap-2">
        <NewItem handleAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
