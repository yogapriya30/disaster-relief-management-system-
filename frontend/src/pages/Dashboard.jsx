import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const getIcon = (title = "") => {
  const t = title.toLowerCase();

  if (t.includes("flood")) return "🌊";
  if (t.includes("fire")) return "🔥";
  if (t.includes("earthquake")) return "🌍";
  if (t.includes("cyclone") || t.includes("storm")) return "🌪️";
  if (t.includes("landslide")) return "⛰️";

  return "⚠️";
};

function Dashboard() {
  const [disasters, setDisasters] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/disasters/")
      .then((res) => setDisasters(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this disaster report?")) return;
    axios
      .delete(`http://127.0.0.1:8000/disasters/${id}`)
      .then(() => {
        setDisasters((prev) => prev.filter((d) => d.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const activeCount = disasters.filter((d) => d.status === "active").length;

  const resolvedCount = disasters.filter((d) => d.status !== "active").length;

  const filtered =
    filter === "all"
      ? disasters
      : disasters.filter((d) => d.status === filter);

  return (
    <div className="dash">
      <header className="dash-nav">
        <div className="dash-logo">
          <span className="logo-dot" />
          Relief<span className="logo-accent">Ops</span>
        </div>

        <div>
          <button
            className="add-disaster-btn"
            onClick={() => navigate("/add-disaster")}
          >
            + Add Disaster
          </button>

          <button className="dash-logout" onClick={handleLogout}>
            Logout ↗
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>Situation Overview</h1>
        <p>Live status of reported disasters across regions</p>
      </section>

      <section className="metrics">
        <div className="metric-card glow-total">
          <div className="metric-icon">📊</div>
          <div>
            <div className="metric-value">{disasters.length}</div>
            <div className="metric-label">Total Reports</div>
          </div>
        </div>

        <div className="metric-card glow-active">
          <div className="metric-icon">🚨</div>
          <div>
            <div className="metric-value">{activeCount}</div>
            <div className="metric-label">Active Now</div>
          </div>
        </div>

        <div className="metric-card glow-resolved">
          <div className="metric-icon">✅</div>
          <div>
            <div className="metric-value">{resolvedCount}</div>
            <div className="metric-label">Resolved</div>
          </div>
        </div>
      </section>

      <section className="filter-row">
        {["all", "active", "resolved"].map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? "chip-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </section>

      <section className="timeline">
        {filtered.map((d, i) => (
          <div
            className="timeline-item"
            key={d.id}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div
              className={`timeline-dot ${
                d.status === "active" ? "dot-active" : "dot-resolved"
              }`}
            />

            <div className="timeline-card">
              <div className="tl-top">
                <span className="tl-icon">{getIcon(d.title)}</span>

                <span className="tl-title">{d.title}</span>

                <span
                  className={`tl-badge ${
                    d.status === "active" ? "b-active" : "b-resolved"
                  }`}
                >
                  {d.status}
                </span>
              </div>

              <div className="tl-location">📍 {d.location}</div>

              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-disaster/${d.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty">Nothing to show here right now.</div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;