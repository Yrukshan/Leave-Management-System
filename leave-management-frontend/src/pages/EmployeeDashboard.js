import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      // ONLY OWN LEAVES
      const res = await api.get("/leaves/my");
      setLeaves(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const total = leaves.length;
  const approved = leaves.filter((l) => l.status === "approved").length;
  const pending = leaves.filter((l) => l.status === "pending").length;
  const rejected = leaves.filter((l) => l.status === "rejected").length;

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>Employee Dashboard</h2>

        {/* STATS CARDS */}
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h3>Total Leaves</h3>
            <p>{total}</p>
          </div>

          <div style={styles.card}>
            <h3>Approved</h3>
            <p style={{ color: "#22c55e" }}>{approved}</p>
          </div>

          <div style={styles.card}>
            <h3>Pending</h3>
            <p style={{ color: "#facc15" }}>{pending}</p>
          </div>

          <div style={styles.card}>
            <h3>Rejected</h3>
            <p style={{ color: "#ef4444" }}>{rejected}</p>
          </div>
        </div>

        {/* QUICK ACTION */}
        <div style={styles.actionBox}>
          <h3>Quick Actions</h3>
          <button style={styles.button}>+ Apply Leave</button>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "linear-gradient(to right, #020617, #0f172a)",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    marginBottom: "20px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "rgba(30, 41, 59, 0.8)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  actionBox: {
    marginTop: "30px",
    padding: "20px",
    background: "rgba(30, 41, 59, 0.8)",
    borderRadius: "12px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default EmployeeDashboard;