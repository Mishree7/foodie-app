import { useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addFood = async () => {
    await API.post("/foods", { name, price, image });

    alert("Product Added Successfully ✅");

    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <div>
      <h2>Admin</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Image" onChange={(e) => setImage(e.target.value)} />

      <button onClick={addFood}>Add Food</button>
    </div>
  );
}