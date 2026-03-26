"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import { useState, useEffect, use } from "react";
import MealIdeas from "./meal-ideas";
import stripEmojis from "emoji-stripper";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const [items, setItems] = useState<
    Array<{ id: string; name: string; quantity: number; category: string }>
  >([]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const { user, firebaseSignOut, gitHubSignIn } = useUserAuth();
  const handleAddItem = async (newItem: {
    name: string;
    quantity: number;
    category: string;
  }) => {
    if (!user) return;

    const itemToSave = {
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
    };

    const returnedId = await addItem(user.uid, itemToSave);
    const savedItem = { ...itemToSave, id: returnedId };

    setItems((prevItems) => [...prevItems, savedItem]);
  };
  const handleItemSelect = (name: string) => {
    setSelectedItemName(
      stripEmojis(name).trim().toLowerCase().split(",")[0].replace(/s$/, ""),
    );
  };
  async function loadItems() {
    if (!user) return;
    const items = await getItems(user.uid);
    setItems(items);
  }

  useEffect(() => {
    loadItems();
  }, [user]);
  return user ? (
    <main className="bg-[#141515] text-white min-h-screen pt-8 pb-8">
      <div className="fixed right-8">
        <button
          className="w-50 h-15 text-xl font-bold rounded-lg hover:cursor-pointer bg-[#192830]"
          onClick={async () => {
            await firebaseSignOut();
            window.location.href = "/week-10";
          }}
        >
          Sign Out
        </button>
      </div>
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
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-[#141515] text-white gap-4">
      <h1 className="text-3xl font-bold">
        Please sign in to view your shopping list.
      </h1>
      <button
        className="w-80 h-20 text-xl font-bold rounded-lg hover:cursor-pointer bg-[#192830]"
        onClick={async () => await gitHubSignIn()}
      >
        Sign In with GitHub
      </button>
    </div>
  );
}
