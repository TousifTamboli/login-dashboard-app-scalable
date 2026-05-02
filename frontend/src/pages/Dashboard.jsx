import { useAuth } from "../context/useAuth";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await API.post("/api/auth/logout");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Welcome {user?.name}</h1>
          </div>

          <button className="secondary-button" onClick={logout}>
            Logout
          </button>
        </header>

        <div className="dashboard-grid">
          <article className="stat-card">
            <span className="stat-label">Session</span>
            <strong>Active</strong>
            <p className="muted">Your protected dashboard is ready.</p>
          </article>

          <article className="stat-card">
            <span className="stat-label">Account</span>
            <strong>{user?.email || "Verified"}</strong>
            <p className="muted">Signed in with secure cookies.</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
