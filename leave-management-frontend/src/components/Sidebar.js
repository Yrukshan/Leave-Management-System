import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Leave Management</h2>

      <Link style={styles.boxLink} to="/dashboard">Dashboard</Link>
      <Link style={styles.boxLink} to="/leaves">Leaves</Link>

      {role === "admin" && (
        <Link style={styles.boxLink} to="/users">Users</Link>
      )}

      <button
        style={styles.logout}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #020617, #1e293b)", 
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    color: "white",
    marginBottom: "20px",
  },

  // BOX STYLE LINKS
  boxLink: {
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "8px",
    background: "#334155",
    textAlign: "center",
    transition: "0.3s",
  },

  // hover effect (inline workaround using onMouseEnter if needed)
  logout: {
    marginTop: "auto",
    background: "#ef4444",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Sidebar;