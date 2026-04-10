import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Success message
      setMessage("Login successful!");
      setIsSuccess(true);

      // ✅ Redirect after 1.5 sec
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err: any) {
      console.error(err.response?.data);

      setMessage(err.response?.data?.message || "Invalid credentials");
      setIsSuccess(false);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      {message && (
        <p
          style={{
            color: isSuccess ? "green" : "red",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <form className="form" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
}