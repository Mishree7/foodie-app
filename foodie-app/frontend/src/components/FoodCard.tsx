type FoodCardProps = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export default function FoodCard({ _id, name, price, image }: FoodCardProps) {




  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({ _id, name, price });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart ✅");
  };

  return (
    <div className="card">
      <img src={image} alt={name} className="food-img" />

      <h3>{name}</h3>
      <p>₹{price}</p>

      <button onClick={addToCart}>Add</button>
    </div>
  );
}