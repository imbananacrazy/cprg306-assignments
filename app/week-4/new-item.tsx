"use client";

import React, { useState } from "react";

export default function NewItem () {
    const [name, setName] = useState<String>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [category, setCategory] = useState<String>("Produce");
    const [nameTouched, setNameTouched] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim() || name.length < 2) return;

        const item = {
            name,
            quantity,
            category
        };

        console.log(item);
        alert(`${item.name}: ${item.quantity} ${item.category}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <div>
                        <input
                        name="name"
                        type="text"
                        value={name.toString()}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {setName(event.target.value)}}
                        required
                        className={`bg-white text-gray-500 p-1 w-75 rounded-md border-2 ${nameTouched && (!name.trim() || name.length < 2) ? "border-red-500" : "border-white"}`}
                        placeholder="Enter name"
                        onBlur={()=>{setNameTouched(true)}}
                        onFocus={()=>{setNameTouched(false)}}
                    />
                </div>
                    {nameTouched && (!name.trim() || name.length < 2) ? <p className="text-red-500">Invalid name (min 2 characters)</p> : null}
                </div>
                <div>
                    <input
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {setQuantity(parseInt(event.target.value))}}
                        required
                        className="bg-white text-gray-500 p-1 w-75 rounded-md border-2 border-white"
                        placeholder="Enter quantity"
                        min={1}
                        max={99}
                    />
                </div>
                <div>
                    <select 
                        value={category.toString()} 
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>)=> {setCategory(event.target.value)}}
                        required
                        className="bg-white text-gray-500 p-1 w-75 rounded-md border-2 border-white">
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Produce</option>
                        <option value="frozen-foods">Frozen Foods</option>
                        <option value="canned-goods">Canned Goods</option>
                        <option value="dry-goods">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button 
                    type="submit"
                    className="self-center bg-white text-black p-1 w-25 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
                    disabled={!name.trim() || name.length < 2}>
                    Submit
                </button>
            </div>
        </form>
    )
}