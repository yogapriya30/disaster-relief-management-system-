import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Volunteers.css";

const getIcon = (skill = "") => {
  const s = skill.toLowerCase();

  if (s.includes("medical") || s.includes("first aid")) return "🩹";
  if (s.includes("cook")) return "🍲";
  if (s.includes("driv")) return "🚗";
  if (s.includes("rescue")) return "🛟";
  if (s.includes("counsel")) return "🗣️";

  return "🙋";
};

function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("https://disaster-relief-management-system-bcio.onrender.com/volunteers/")
      .then((res) => setVolunteers(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this volunteer?")) return;
    axios
      .delete(`https://disaster-relief-management-system-bcio.onrender.com/volunteers/${id}`)
      .then(() => {
        setVolunteers((prev) => prev.filter((v) => v.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const availableCount = volunteers.filter(
    (v) => v.availability === "available"
  ).length;

  const unavailableCount = volunteers.filter(
    (v) => v.availability !== "available"
  ).length;

  const filtered =
    filter === "all"
      ? volunteers
      : volunteers.filter((v) => v.availability === filter);

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
            onClick={() => navigate("/add-volunteer")}
          >
            + Add Volunteer
          </button>

          <button className="dash-logout" onClick={handleLogout}>
            Logout ↗
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>Volunteers Overview</h1>
        <p>All registered volunteers and their availability</p>
      </section>

      <section className="metrics">
        <div className="metric-card glow-total">
          <div className="metric-icon">📊</div>
          <div>
            <div className="metric-value">{volunteers.length}</div>
            <div className="metric-label">Total Volunteers</div>
          </div>
        </div>

        <div className="metric-card glow-active">
          <div className="metric-icon">✅</div>
          <div>
            <div className="metric-value">{availableCount}</div>
            <div className="metric-label">Available</div>
          </div>
        </div>

        <div className="metric-card glow-resolved">
          <div className="metric-icon">🚫</div>
          <div>
            <div className="metric-value">{unavailableCount}</div>
            <div className="metric-label">Unavailable</div>
          </div>
        </div>
      </section>

      <section className="filter-row">
        {["all", "available", "unavailable"].map((f) => (
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
        {filtered.map((v, i) => (
          <div
            className="timeline-item"
            key={v.id}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div
              className={`timeline-dot ${
                v.availability === "available" ? "dot-active" : "dot-resolved"
              }`}
            />

            <div className="timeline-card">
              <div className="tl-top">
                <span className="tl-icon">{getIcon(v.skill)}</span>

                <span className="tl-title">{v.name}</span>

                <span
                  className={`tl-badge ${
                    v.availability === "available"
                      ? "b-active"
                      : "b-resolved"
                  }`}
                >
                  {v.availability}
                </span>
              </div>

              <div className="tl-location">📞 {v.phone}</div>
              <div className="tl-location">✉️ {v.email}</div>
              <div className="tl-location">🛠️ {v.skill}</div>

              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-volunteer/${v.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(v.id)}
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

export default Volunteers;