import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/volunteers", label: "Volunteers", icon: "👥" },
  { to: "/resources", label: "Resources", icon: "📦" },
  { to: "/relief-camps", label: "Relief Camps", icon: "🏕" },
  { to: "/tasks", label: "Tasks", icon: "📋" },
  { to: "/notifications", label: "Notifications", icon: "🔔" },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-dot" />
        <span>
          Relief<span className="logo-accent">Ops</span>
        </span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <span className="sidebar-icon">🚪</span>
        <span className="sidebar-text">Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;