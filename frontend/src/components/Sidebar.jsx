import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const menuItems = [
    { key: "dashboard", label: "🏠 Dashboard" },
    { key: "resources", label: "📦 Resources" },
    { key: "volunteers", label: "👥 Volunteers" },
    { key: "relief-camps", label: "🏕 Relief Camps" },
    { key: "tasks", label: "📋 Tasks" },
    { key: "notifications", label: "🔔 Notifications" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Relief Admin</h2>
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`sidebar-link ${activePage === item.key ? "active" : ""}`}
          onClick={() => setActivePage(item.key)}
        >
          {item.label}
        </button>
      ))}
      <button className="sidebar-link logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;