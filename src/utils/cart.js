export function getCart() {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function setCart(cart) {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product, quantity = 1) {
    const currentCart = getCart();
    const newItems = Array(quantity).fill(product);
    const nextCart = [...currentCart, ...newItems];
    setCart(nextCart);
    window.dispatchEvent(new Event("cart-updated")); // Optional: for reacting to updates elsewhere
    return nextCart;
}
