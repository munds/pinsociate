import React, { useState, useEffect } from "react";

function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function CartSummary() {
  const [cart, setCartState] = useState([]);

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function removeItem(idx) {
    const nextCart = cart.filter((_, i) => i !== idx);
    setCartState(nextCart);
    setCart(nextCart);
  }

  if (cart.length === 0) {
    return <p className="text-lg">Your cart is empty. <a href="/products" className="underline">Shop now?</a></p>;
  }

  return (
    <div>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx} className="mb-4 flex items-center justify-between bg-white rounded p-3 shadow">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-4" />
              <span>{item.name} – ${item.price.toFixed(2)}</span>
            </div>
            <button onClick={() => removeItem(idx)} className="text-red-600 hover:text-red-900 ml-4">Remove</button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
      <a href="/checkout" className="block mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-800 w-max">Proceed to Checkout</a>
    </div>
  );
}
