import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const BASE_URL = "https://disaster-relief-management-system-bcio.onrender.com";

function Dashboard() {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchDisasters = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`${BASE_URL}/disasters/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDisasters(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  };

  useEffect(() => {
    fetchDisasters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this disaster?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}/disasters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setDisasters((prev) => prev.filter((d) => d.id !== id));
      })
      .catch(() => {
        alert("Failed to delete disaster. Please try again.");
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-disaster/${id}`);
  };

  const handleResolve = (id) => {
    const token = localStorage.getItem("token");
    const disaster = disasters.find((d) => d.id === id);
    if (!disaster) return;

    axios
      .put(
        `${BASE_URL}/disasters/${id}`,
        {
          title: disaster.title || disaster.name,
          description: disaster.description,
          location: disaster.location,
          status: "resolved",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setDisasters((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: "resolved" } : d))
        );
      })
      .catch(() => {
        alert("Failed to update status. Please try again.");
      });
  };

  const activeCount = disasters.filter((d) => d.status === "active").length;
  const resolvedCount = disasters.filter((d) => d.status === "resolved").length;
  const totalCount = disasters.length;

  const filteredDisasters =
    filter === "all" ? disasters : disasters.filter((d) => d.status === filter);

  return (
    <div className="dash">
      <div className="dash-nav">
        <div className="dash-logo">
          <span className="logo-dot" />
          Relief<span className="logo-accent">Ops</span>
        </div>
        <div>
          <Link to="/add-disaster">
            <button className="add-disaster-btn">+ Add Disaster</button>
          </Link>
          <button className="dash-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="hero">
        <h1>Disaster Response Dashboard</h1>
        <p>Real-time overview of ongoing and resolved disasters</p>
      </div>

      <div className="metrics">
        <div className="metric-card glow-active">
          <span className="metric-icon">🔥</span>
          <div>
            <div className="metric-value">{activeCount}</div>
            <div className="metric-label">Active</div>
          </div>
        </div>
        <div className="metric-card glow-resolved">
          <span className="metric-icon">✅</span>
          <div>
            <div className="metric-value">{resolvedCount}</div>
            <div className="metric-label">Resolved</div>
          </div>
        </div>
        <div className="metric-card glow-total">
          <span className="metric-icon">📊</span>
          <div>
            <div className="metric-value">{totalCount}</div>
            <div className="metric-label">Total</div>
          </div>
        </div>
      </div>

      <div className="filter-row">
        <button
          className={`filter-chip ${filter === "all" ? "chip-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-chip ${filter === "active" ? "chip-active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`filter-chip ${filter === "resolved" ? "chip-active" : ""}`}
          onClick={() => setFilter("resolved")}
        >
          Resolved
        </button>
      </div>

      <div className="timeline">
        {loading && <p className="empty">Loading...</p>}
        {!loading && filteredDisasters.length === 0 && (
          <p className="empty">No disasters found.</p>
        )}
        {filteredDisasters.map((d) => (
          <div className="timeline-item" key={d.id}>
            <div
              className={`timeline-dot ${
                d.status === "active" ? "dot-active" : "dot-resolved"
              }`}
            />
            <div className="timeline-card">
              <div className="tl-top">
                <span className="tl-icon">⚠️</span>
                <span className="tl-title">{d.title || d.name}</span>
                <span
                  className={`tl-badge ${
                    d.status === "active" ? "b-active" : "b-resolved"
                  }`}
                >
                  {d.status}
                </span>
              </div>
              <p>{d.description}</p>
              {d.location && <p className="tl-location">📍 {d.location}</p>}

              <div className="tl-actions">
                <button className="edit-btn" onClick={() => handleEdit(d.id)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </button>
                {d.status === "active" && (
                  <button
                    className="resolve-btn"
                    onClick={() => handleResolve(d.id)}
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;