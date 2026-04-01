import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const role = localStorage.getItem("role");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* MOBILE TOP BAR */}
      {isMobile && (
        <div style={styles.topbar}>
          <button style={styles.menuBtn} onClick={() => setOpen(!open)}>
            ☰
          </button>
          <span style={{ color: "white" }}>Leave Management</span>
        </div>
      )}

      <div
        style={{
          ...styles.sidebar,
          ...(isMobile && {
            position: "fixed",
            top: 0,
            left: open ? 0 : "-100%",
            zIndex: 1000,
            height: "100vh",
          }),
        }}
      >
        {/* TOP MENU (SCROLLABLE) */}
        <div style={styles.menu}>
          <br /> <br />
          <h2 style={styles.title} >Leave Management</h2>

          <Link style={styles.boxLink} to="/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link style={styles.boxLink} to="/leaves" onClick={() => setOpen(false)}>
            Leaves
          </Link>

          {role === "admin" && (
            <Link style={styles.boxLink} to="/users" onClick={() => setOpen(false)}>
              Users
            </Link>
          )}
        </div>

        {/* BOTTOM LOGOUT (ALWAYS VISIBLE) */}
        <div style={styles.footer}>
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
      </div>

      {/* OVERLAY */}
      {isMobile && open && (
        <div style={styles.overlay} onClick={() => setOpen(false)} />
      )}
    </>
  );
}

const styles = {
 
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "linear-gradient(180deg, #020617, #1e293b)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // key fix
  },

  menu: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    overflowY: "auto", // scroll only menu
  },

  footer: {
    padding: "20px",
    background: "#020617",
    borderTop: "1px solid #334155",
  },

  topbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "#020617",
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    gap: "10px",
    zIndex: 1100,
  },

  menuBtn: {
    fontSize: "20px",
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  title: {
    color: "white",
    marginBottom: "10px",
  },

  boxLink: {
    color: "white",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "8px",
    background: "#334155",
    textAlign: "center",
  },

  logout: {
    width: "100%",
    background: "#ef4444",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
};

export default Sidebar;