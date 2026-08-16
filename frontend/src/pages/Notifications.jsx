import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/notifications/")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this notification?")) return;
    axios
      .delete(`http://127.0.0.1:8000/notifications/${id}`)
      .then(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      })
      .catch((err) => console.log(err));
  };

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
            onClick={() => navigate("/add-notification")}
          >
            + Add Notification
          </button>

          <button className="dash-logout" onClick={handleLogout}>
            Logout ↗
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>Notifications Overview</h1>
        <p>All relief coordination notifications</p>
      </section>

      <section className="metrics">
        <div className="metric-card glow-total">
          <div className="metric-icon">🔔</div>
          <div>
            <div className="metric-value">{notifications.length}</div>
            <div className="metric-label">Total Notifications</div>
          </div>
        </div>
      </section>

      <section className="timeline">
        {notifications.map((n, i) => (
          <div
            className="timeline-item"
            key={n.id}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="timeline-dot dot-active" />

            <div className="timeline-card">
              <div className="tl-top">
                <span className="tl-icon">🔔</span>
                <span className="tl-title">{n.message}</span>
              </div>

              <div className="tl-location">👤 To: {n.recipient}</div>
              <div className="tl-location">🆔 User ID: {n.user_id}</div>

              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-notification/${n.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(n.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="empty">Nothing to show here right now.</div>
        )}
      </section>
    </div>
  );
}

export default Notifications;