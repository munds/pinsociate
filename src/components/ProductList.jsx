import React, { useState } from "react";
import PRODUCTS from "../data/products";
import { addToCart, getCart } from "../utils/cart";

function groupByCategory(products) {
  return products.reduce((out, product) => {
    (out[product.category] = out[product.category] || []).push(product);
    return out;
  }, {});
}

export default function ProductList({ currentCategory }) {
  const [cart, setCartState] = useState(getCart());

  // Helper to sync local state if needed, though addToCart handles localStorage
  function handleAddToCart(e, product) {
    e.preventDefault(); // Prevent navigation if clicking the button
    e.stopPropagation();
    const nextCart = addToCart(product);
    setCartState(nextCart);
    alert(`${product.name} added to cart!`);
  }

  // Filter products if a specific category is requested
  const filteredProducts = currentCategory
    ? PRODUCTS.filter(p => p.category === currentCategory)
    : PRODUCTS;

  const groups = groupByCategory(filteredProducts);
  const categoryOrder = [...new Set(filteredProducts.map(p => p.category))];

  return (
    <div>
      {categoryOrder.map(category =>
        groups[category] ? (
          <section className="mb-12" key={category}>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groups[category]
                .slice(0, 15) // up to 5 rows per category
                .map(prod => (
                  <a
                    href={`/product/${prod.id}`}
                    key={prod.id}
                    className="block bg-white rounded p-4 flex flex-col items-center shadow hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-32 h-32 object-contain mb-4"
                      style={{ background: "#F8F7F4", borderRadius: 16 }}
                    />
                    <h4 className="text-xl font-semibold text-center">{prod.name}</h4>
                    <p className="my-2 text-lg text-gray-600">${prod.price.toFixed(2)}</p>
                    <button
                      className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors z-10 relative"
                      onClick={(e) => handleAddToCart(e, prod)}
                    >
                      Add to Cart
                    </button>
                  </a>
                ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
