import React, { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "1970s Polaroid Camera", price: 89.99, image: "/polaroid-camera.svg", category: "Electronics" },
  { id: 2, name: "Teak Desk Lamp", price: 129.99, image: "/teak-desk-lamp.svg", category: "Home Decor" },
  { id: 3, name: "Retro Vinyl Record Player", price: 159.99, image: "/retro-record-player.svg", category: "Electronics" },
  { id: 4, name: "Coca-Cola Sign", price: 59.99, image: "/coca-cola-sign.svg", category: "Collectibles" },
  { id: 5, name: "Classic Rotary Telephone", price: 39.99, image: "/rotary-telephone.svg", category: "Electronics" },
  { id: 6, name: "Antique Brass Alarm Clock", price: 72.50, image: "/brass-alarm-clock.svg", category: "Home Decor" },
  { id: 7, name: "Walkman Cassette Player", price: 78.00, image: "/walkman-cassette.svg", category: "Electronics" },
  { id: 8, name: "Retro Neon Open Sign", price: 110.00, image: "/neon-open-sign.svg", category: "Collectibles" },
  { id: 9, name: "Vintage Globe Bar Cart", price: 205.00, image: "/globe-bar-cart.svg", category: "Home Decor" },
  { id: 10, name: "Classic Typewriter", price: 150.00, image: "/typewriter.svg", category: "Collectibles" },
  { id: 11, name: "Old School Flip Clock", price: 43.20, image: "/flip-clock.svg", category: "Home Decor" },
  { id: 12, name: "Retro Sunglasses", price: 18.00, image: "/retro-sunglasses.svg", category: "Accessories" },
  { id: 13, name: "Messenger Bag", price: 95.00, image: "/messenger-bag.svg", category: "Accessories" },
  { id: 14, name: "Silver Pocket Watch", price: 60.00, image: "/pocket-watch.svg", category: "Accessories" },
  { id: 15, name: "Modern Wall Art", price: 130.00, image: "/modern-wall-art.svg", category: "Home Decor" }
];

function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function groupByCategory(products) {
  return products.reduce((out, product) => {
    (out[product.category] = out[product.category] || []).push(product);
    return out;
  }, {});
}

export default function ProductList() {
  const [cart, setCartState] = useState(getCart());

  function addToCart(product) {
    const nextCart = [...cart, product];
    setCartState(nextCart);
    setCart(nextCart);
    alert(`${product.name} added to cart!`);
  }

  const groups = groupByCategory(PRODUCTS);
  const categoryOrder = ["Electronics", "Home Decor", "Collectibles", "Accessories"];

  return (
    <div>
      {categoryOrder.map(category =>
        groups[category] ? (
          <section className="mb-12" key={category}>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">{category}</h3>
            <div className="grid grid-cols-3 gap-8">
              {groups[category]
                .slice(0, 15) // up to 5 rows per category
                .map(prod => (
                  <div className="bg-white rounded p-4 flex flex-col items-center shadow" key={prod.id}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-32 h-32 object-contain mb-4"
                      style={{ background: "#F8F7F4", borderRadius: 16 }}
                    />
                    <h4 className="text-xl font-semibold text-center">{prod.name}</h4>
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
          </section>
        ) : null
      )}
    </div>
  );
}
