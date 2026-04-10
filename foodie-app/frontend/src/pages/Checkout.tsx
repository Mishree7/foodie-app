import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);

    const sum = cart.reduce((acc: number, item: any) => acc + item.price, 0);
    setTotal(sum);
  }, []);

  const placeOrder = async () => {
    if (!address) {
      alert("Enter address");
      return;
    }

    try {
      await API.post("/orders", {
        items: items.map((i) => ({
          food: i._id,
          quantity: 1
        })),
        total
      });

      localStorage.removeItem("cart");

      alert("Order placed successfully 🎉");

      navigate("/menu");
    } catch {
      alert("Order failed ❌");
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>

      <p>Total: ₹{total}</p>

      <input
        placeholder="Enter address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}