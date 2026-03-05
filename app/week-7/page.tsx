"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import { useState } from "react";
import MealIdeas from "./meal-ideas";
import stripEmojis from "emoji-stripper";

export default function Page() {
  const [items, setItems] = useState(itemsData.map(({ id, ...rest }) => rest)); //remove id from itemsData
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const handleAddItem = (newItem: {
    name: string;
    quantity: number;
    category: string;
  }) => {
    setItems([...items, newItem]);
  };
  const handleItemSelect = (name: string) => {
    setSelectedItemName(
      stripEmojis(name).trim().toLowerCase().split(",")[0].replace(/s$/, ""),
    );
  };
  return (
    <main className="bg-[#141515] text-white min-h-screen pt-8 pb-8">
      <div className="flex flex-col items-center gap-12 w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 items-center w-full max-w-md">
          <h1 className="text-4xl font-bold pb-4">Shopping List</h1>
          <NewItem handleAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-4xl font-bold pb-4 text-center">Meal Ideas</h1>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
