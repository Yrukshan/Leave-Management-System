import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>LeaveSys</h2>

        <div style={styles.navActions}>
          <button style={styles.registerBtn} onClick={() => nav("/register")}>
            Register
          </button>

          <button style={styles.loginBtn} onClick={() => nav("/login")}>
            Login
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Smart Leave Management System</h1>
        <p style={styles.subtitle}>
          Manage employee leaves efficiently with real-time tracking,
          approvals, and insights.
        </p>

        <div style={styles.actions}>
          <button style={styles.primaryBtn} onClick={() => nav("/register")}>
            Get Started
          </button>

          <button style={styles.secondaryBtn} onClick={() => nav("/login")}>
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>📋 Easy Leave Apply</h3>
          <p>Employees can apply leaves quickly with simple forms.</p>
        </div>

        <div style={styles.card}>
          <h3>✅ Manager Approval</h3>
          <p>Managers can approve or reject requests instantly.</p>
        </div>

        <div style={styles.card}>
          <h3>📊 Analytics</h3>
          <p>Track leave trends and employee activity easily.</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p>© 2026 LeaveSys. All rights reserved.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #020617, #0f172a)",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    flexWrap: "wrap",
    gap: "10px",
  },

  logo: {
    fontWeight: "bold",
  },

  navActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  registerBtn: {
    padding: "8px 15px",
    background: "#22c55e",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  loginBtn: {
    padding: "8px 15px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    marginTop: "80px",
    padding: "0 20px",
  },

  title: {
    fontSize: "42px",
    marginBottom: "15px",
  },

  subtitle: {
    color: "#94a3b8",
    maxWidth: "600px",
    margin: "auto",
  },

  actions: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "12px 20px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  secondaryBtn: {
    padding: "12px 20px",
    background: "#1e293b",
    border: "1px solid #334155",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "60px 40px",
  },

  card: {
    background: "rgba(30, 41, 59, 0.8)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },

  footer: {
    marginTop: "auto",
    textAlign: "center",
    padding: "20px",
    color: "#94a3b8",
  },

  // Responsive adjustments
  "@media (max-width: 768px)": {
    navbar: {
      padding: "15px 20px",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    title: {
      fontSize: "28px",
    },
    subtitle: {
      fontSize: "14px",
      maxWidth: "100%",
    },
    features: {
      padding: "40px 20px",
      gap: "15px",
    },
    card: {
      padding: "15px",
    },
    primaryBtn: {
      fontSize: "14px",
      padding: "10px 16px",
    },
    secondaryBtn: {
      fontSize: "14px",
      padding: "10px 16px",
    },
  },
};

export default Home;