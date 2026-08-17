import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const BASE_URL = "https://disaster-relief-management-system-bcio.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Wake up the backend as soon as the login page loads
  useEffect(() => {
    axios.get(`${BASE_URL}/docs`).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/users/login`,
        { email, password },
        { timeout: 60000 }
      );
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg-glow" />

      <div className="login-card">
        <div className="login-brand">
          <span className="logo-dot" />
          Relief<span className="logo-accent">Ops</span>
        </div>
        <p className="login-subtitle">Sign in to manage disaster response</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="login-error">⚠ {error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="login-signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;