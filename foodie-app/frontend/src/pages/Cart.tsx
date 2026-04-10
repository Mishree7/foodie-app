// src/pages/Cart.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CartItem = {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  image?: string;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);
  }, []);

  // Remove item from cart
  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1 className="hero-text">Your Cart</h1>

      {items.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Cart is empty
        </p>
      ) : (
        <div className="grid">
          {items.map((item, index) => (
            <div className="card" key={item._id || item.id || index}>
              <div className="card-image">
                <img
                  src={item.image || "https://via.placeholder.com/250"}
                  alt={item.name}
                  className="food-img"
                />
              </div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <button className="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <h3>Total: ₹{total}</h3>
          <button className="button" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}