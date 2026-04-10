// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await API.post("/auth/register", form);

      alert("Registration Successful ✅");

      navigate("/login");
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      {message && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {message}
        </p>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">
          Register
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#e11d48", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}