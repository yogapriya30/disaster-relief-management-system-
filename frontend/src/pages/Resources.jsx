import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/resources/")
      .then((res) => setResources(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this resource?")) return;
    axios
      .delete(`http://127.0.0.1:8000/resources/${id}`)
      .then(() => {
        setResources((prev) => prev.filter((r) => r.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const totalQuantity = resources.reduce(
    (sum, r) => sum + (r.quantity || 0),
    0
  );

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
            onClick={() => navigate("/add-resource")}
          >
            + Add Resource
          </button>

          <button className="dash-logout" onClick={handleLogout}>
            Logout ↗
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>Resources Overview</h1>
        <p>All tracked relief resources and their quantities</p>
      </section>

      <section className="metrics">
        <div className="metric-card glow-total">
          <div className="metric-icon">📦</div>
          <div>
            <div className="metric-value">{resources.length}</div>
            <div className="metric-label">Total Resource Types</div>
          </div>
        </div>

        <div className="metric-card glow-active">
          <div className="metric-icon">🔢</div>
          <div>
            <div className="metric-value">{totalQuantity}</div>
            <div className="metric-label">Total Quantity</div>
          </div>
        </div>
      </section>

      <section className="timeline">
        {resources.map((r, i) => (
          <div
            className="timeline-item"
            key={r.id}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="timeline-dot dot-active" />

            <div className="timeline-card">
              <div className="tl-top">
                <span className="tl-icon">📦</span>
                <span className="tl-title">{r.name}</span>
              </div>

              <div className="tl-location">
                🔢 {r.quantity} {r.unit}
              </div>
              <div className="tl-location">📍 {r.location}</div>

              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-resource/${r.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {resources.length === 0 && (
          <div className="empty">Nothing to show here right now.</div>
        )}
      </section>
    </div>
  );
}

export default Resources;