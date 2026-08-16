import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("https://disaster-relief-management-system-bcio.onrender.com/tasks/")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this task?")) return;
    axios
      .delete(`https://disaster-relief-management-system-bcio.onrender.com/tasks/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  const filtered =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

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
            onClick={() => navigate("/add-task")}
          >
            + Add Task
          </button>

          <button className="dash-logout" onClick={handleLogout}>
            Logout ↗
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>Tasks Overview</h1>
        <p>All relief tasks and their progress</p>
      </section>

      <section className="metrics">
        <div className="metric-card glow-total">
          <div className="metric-icon">📋</div>
          <div>
            <div className="metric-value">{tasks.length}</div>
            <div className="metric-label">Total Tasks</div>
          </div>
        </div>

        <div className="metric-card glow-active">
          <div className="metric-icon">⏳</div>
          <div>
            <div className="metric-value">{pendingCount}</div>
            <div className="metric-label">Pending</div>
          </div>
        </div>

        <div className="metric-card glow-resolved">
          <div className="metric-icon">✅</div>
          <div>
            <div className="metric-value">{completedCount}</div>
            <div className="metric-label">Completed</div>
          </div>
        </div>
      </section>

      <section className="filter-row">
        {["all", "pending", "in_progress", "completed"].map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? "chip-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1).replace("_", " ")}
          </button>
        ))}
      </section>

      <section className="timeline">
        {filtered.map((t, i) => (
          <div
            className="timeline-item"
            key={t.id}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div
              className={`timeline-dot ${
                t.status === "completed" ? "dot-resolved" : "dot-active"
              }`}
            />

            <div className="timeline-card">
              <div className="tl-top">
                <span className="tl-icon">📋</span>
                <span className="tl-title">{t.title}</span>
                <span
                  className={`tl-badge ${
                    t.status === "completed" ? "b-resolved" : "b-active"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div className="tl-location">
                👤 Assigned to Volunteer ID: {t.assigned_to}
              </div>

              <div className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-task/${t.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(t.id)}
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

export default Tasks;