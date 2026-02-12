"use client";

import Item from "./item";
import { useState } from "react";
import items from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState<string>("name");
  let categories: string[] = [];
  items.forEach((item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  });
  console.log(categories);
  sortBy == "name"
    ? items.sort((a, b) => a.name.localeCompare(b.name))
    : items.sort((a, b) => a.category.localeCompare(b.category));
  return (
    <div className="flex flex-col gap-2">
      {sortBy != "group" ? (
        <ul className="flex flex-col gap-2 bg-[#192830] p-6 rounded-xl items-center">
          {items.map((item, key) => (
            <Item
              key={key}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-2 bg-[#192830] p-6 rounded-xl items-start">
          {categories.map((i, key) => (
            <ol className="font-bold text-white" key={key}>
              {i.toUpperCase()}
              {items.map((j, key) =>
                j.category == i ? (
                  <li className="font-medium" key={key}>
                    - {j.name}
                  </li>
                ) : null,
              )}
            </ol>
          ))}
        </div>
      )}
      <div className="flex flex-row gap-2">
        <button
          className="bg-[#192830] rounded-xl w-50 h-10 hover: cursor-pointer"
          onClick={() => setSortBy("name")}
        >
          Sort by name
        </button>
        <button
          className="bg-[#192830] rounded-xl w-50 h-10 hover: cursor-pointer"
          onClick={() => setSortBy("category")}
        >
          Sort by category
        </button>
        <button
          className="bg-[#192830] rounded-xl w-50 h-10 hover: cursor-pointer"
          onClick={() => setSortBy("group")}
        >
          Group by category
        </button>
      </div>
    </div>
  );
}
