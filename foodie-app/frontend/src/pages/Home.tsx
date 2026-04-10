
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://plus.unsplash.com/premium_photo-1680883415362-238794b19dde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWVzdGhldGljfGVufDB8fDB8fHww",
    title: "Delicious Food Delivered",
    text: "Experience the best meals at your doorstep"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjb9UDSjjlab-myVHaVTXD_PHrZa0vpzpIg&s",
    title: "Fresh & Tasty",
    text: "Prepared with love and fresh ingredients"
  },
  {
    image: "/images/slide3.jpg",
    title: "Fast Delivery",
    text: "Hot food delivered in minutes"
  }
];
export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">

      {/* HERO TEXT */}
      <div className="hero-text">
        <h1>Delicious Food Delivered to You</h1>
        <p>
          Discover the best meals from top restaurants near you.
          Fresh ingredients, fast delivery, and amazing taste —
          all at your fingertips.
        </p>

        <Link to="/menu">
          <button className="button">Explore Menu</button>
        </Link>
      </div>

      {/* CAROUSEL */}
      <div className="carousel">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="carousel-slide"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <img src={slide.image} alt={slide.title} />

            <div className="carousel-overlay"></div>

            <div className="carousel-content">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`carousel-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            ></div>
          ))}
        </div>
      </div>

    </div>
  );
}