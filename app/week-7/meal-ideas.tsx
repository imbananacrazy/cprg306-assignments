"use client";

import { useEffect, useState } from "react";

interface MealProperties {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<MealProperties[]>([]);
  useEffect(() => {
    const loadMealIdeas = async () => {
      setMeals([]);
      const data = await fetchMealIdeas(ingredient);
      setMeals(data.meals || []);
    };
    loadMealIdeas();
  }, [ingredient]);
  return (
    <div className="flex flex-col gap-2 bg-[#192830] p-6 rounded-xl items-center">
      {meals.length == 0 || !ingredient ? (
        <p>Select a valid ingredient to see meal ideas</p>
      ) : (
        <ol className="flex flex-row flex-wrap gap-4 justify-center w-full">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="flex flex-row gap-3 font-bold items-center text-white text-lg bg-white/5 p-3 rounded-lg w-full md:w-[48%] lg:w-[31%] shrink-0"
            >
              {meal.strMealThumb && (
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-16 h-16 shrink-0 object-cover rounded-md"
                />
              )}
              <span className="leading-tight">{meal.strMeal}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

async function fetchMealIdeas(ingredient: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    return [];
  }
}
