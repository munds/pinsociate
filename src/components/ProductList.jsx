import React, { useState } from "react";

// Use SVG filenames
const PRODUCTS = [
  { id: 1, name: "1970s Polaroid Camera", price: 89.99, image: "/polaroid.svg" },
  { id: 2, name: "Mid-century Teak Desk Lamp", price: 129.99, image: "/lamp.svg" },
  { id: 3, name: "Retro Vinyl Record Player", price: 159.99, image: "/record-player.svg" },
];

function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function ProductList() {
  const [cart, setCartState] = useState(getCart());

  function addToCart(product) {
    const nextCart = [...cart, product];
    setCartState(nextCart);
    setCart(nextCart);
    alert(`${product.name} added to cart!`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PRODUCTS.map((prod) => (
        <div className="bg-white rounded p-4 flex flex-col items-center shadow" key={prod.id}>
          <img src={prod.image} alt={prod.name} className="w-32 h-32 object-cover mb-4" />
          <h3 className="text-xl font-semibold">{prod.name}</h3>
          <p className="my-2 text-lg">${prod.price.toFixed(2)}</p>
          <button
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={() => addToCart(prod)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
