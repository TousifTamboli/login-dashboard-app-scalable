import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/api/auth/login", form);
      const res = await API.get("/api/user/profile");
      setUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-panel">
          <div className="auth-copy">
            <p className="eyebrow">Secure access</p>
            <h1>Welcome back</h1>
            <p className="muted">
              Sign in to continue to your dashboard.
            </p>
          </div>

          {error && <p className="error-message">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>

            <button className="primary-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button className="text-button" onClick={() => navigate("/register")}>
            Don't have an account? Register
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
