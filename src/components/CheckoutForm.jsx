import React, { useState } from "react";

function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", "[]");
}

export default function CheckoutForm() {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      clearCart();
      setStep("success");
    }, 1200);
  }

  if (cart.length === 0 && step === "form") {
    return <p className="text-lg">No items in cart. <a href="/products" className="underline">Browse our shop!</a></p>;
  }

  if (step === "success") {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-3">Thank you for your order!</h3>
        <p>Your vintage treasures are on their way (in your imagination 🕺).</p>
        <a href="/products" className="block mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-800 w-max mx-auto">Continue Shopping</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white shadow rounded p-6 space-y-5 max-w-md mx-auto">
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input name="name" required className="w-full border px-3 py-2 rounded" value={form.name} onChange={handleChange} />
      </div>
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input name="email" required type="email" className="w-full border px-3 py-2 rounded" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label className="block font-medium mb-1">Shipping Address</label>
        <textarea name="address" required rows="2" className="w-full border px-3 py-2 rounded" value={form.address} onChange={handleChange}></textarea>
      </div>
      <div className="font-bold">Order Total: ${total.toFixed(2)}</div>
      <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-900 w-full">
        {step === "processing" ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}
