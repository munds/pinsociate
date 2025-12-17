import React, { useState } from "react";
import { addToCart } from "../utils/cart";

export default function AddToCart({ product }) {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`Added ${quantity} ${product.name}(s) to cart!`);
        setQuantity(1); // Reset after adding
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-semibold text-gray-700">
                    Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded">
                    <button
                        onClick={handleDecrement}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold border-r border-gray-300"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        readOnly
                        className="w-12 text-center border-none focus:ring-0 appearance-none m-0"
                    />
                    <button
                        onClick={handleIncrement}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold border-l border-gray-300"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>
            <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md w-full md:w-auto"
            >
                Add to Cart
            </button>
        </div>
    );
}
