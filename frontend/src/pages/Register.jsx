import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/auth/register", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-panel">
          <div className="auth-copy">
            <p className="eyebrow">Create account</p>
            <h1>Start fresh</h1>
            <p className="muted">
              Set up your account and jump into the dashboard.
            </p>
          </div>

          {error && <p className="error-message">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input
                placeholder="Your name"
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="Create a password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>

            <button className="primary-button">Register</button>
          </form>

          <button className="text-button" onClick={() => navigate("/login")}>
            Already have an account? Login
          </button>
        </div>
      </section>
    </main>
  );
};

export default Register;
