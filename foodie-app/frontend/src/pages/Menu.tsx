// src/pages/Menu.tsx
import { useEffect, useState } from "react";
import API from "../api";
import { useCart } from "../context/CartContext";

type FoodItem = {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  image?: string;
};

export default function Menu() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const staticData: FoodItem[] = [
    { id: 1, name: "Pizza", price: 250, image: "" },
    { id: 2, name: "Burger", price: 150, image: "" },
    { id: 3, name: "Pasta", price: 200, image: "" },
    { id: 4, name: "Sandwich", price: 120, image: "" },
    { id: 5, name: "Fries", price: 100, image: "" },
    { id: 6, name: "Noodles", price: 180, image: "" },
    { id: 7, name: "Paneer Tikka", price: 220, image: "" },
    { id: 8, name: "Ice Cream", price: 90, image: "" },
  ];

  useEffect(() => {
    API.get("/foods")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setFoods(res.data);
        } else {
          setFoods(staticData);
        }
      })
      .catch(() => setFoods(staticData))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>
    );

  return (
    <div className="container">
      <h1 className="hero-text">Menu</h1>
      <div className="grid">
        {foods.map((food) => (
          <div className="card" key={food._id || food.id}>
            <div className="card-image">
              <img
                src={food.image || "https://via.placeholder.com/250"}
                alt={food.name}
                className="food-img"
              />
            </div>
            <div className="card-content">
              <h3>{food.name}</h3>
              <p className="price">₹{food.price}</p>
              <button className="button" onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}