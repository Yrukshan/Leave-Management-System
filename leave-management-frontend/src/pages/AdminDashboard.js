import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [users, setUsers] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchData = async () => {
    try {
      const [leaveRes, userRes] = await Promise.all([
        api.get("/leaves"),
        api.get("/users"),
      ]);

      setLeaves(Array.isArray(leaveRes.data) ? leaveRes.data : []);
      setUsers(Array.isArray(userRes.data) ? userRes.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalLeaves = leaves.length;
  const pendingLeaves = leaves.filter((l) => l.status === "pending").length;
  const approvedLeaves = leaves.filter((l) => l.status === "approved").length;

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentLeaves = leaves.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(leaves.length / itemsPerPage);

  return (
    <Layout>
      <div style={styles.container}>

        <h2 style={styles.title}>Administrators Dashboard</h2>

        {/* CARDS */}
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>

          <div style={styles.card}>
            <h3>Total Leaves</h3>
            <p>{totalLeaves}</p>
          </div>

          <div style={styles.card}>
            <h3>Pending</h3>
            <p>{pendingLeaves}</p>
          </div>

          <div style={styles.card}>
            <h3>Approved</h3>
            <p>{approvedLeaves}</p>
          </div>
        </div>

        {/* TABLE */}
        <h3 style={{ marginTop: "20px" }}>Leaves</h3>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {currentLeaves.map((l) => (
                <tr key={l.id}>
                  <td style={styles.td}>{l.id}</td>
                  <td style={styles.td}>{l.leave_type}</td>
                  <td style={styles.td}>{l.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          <button
            style={styles.button}
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} / {totalPages || 1}
          </span>

          <button
            style={styles.button}
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div style={styles.actions}>
          <button style={styles.button}>Manage Users</button>
          <button style={styles.button}>Manage Leaves</button>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
    paddingTop: "80px",
    background: "#0f172a",
    color: "white",
    minHeight: "calc(100vh - 60px)",
    overflowY: "auto", // allow scroll on mobile
    boxSizing: "border-box",
  },

  title: {
    marginBottom: "20px",
    fontSize: "clamp(18px, 4vw, 24px)", // responsive text
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
  },

  tableWrapper: {
    marginTop: "15px",
    overflowX: "auto", // horizontal scroll
    overflowY: "auto",
    maxHeight: "250px",
  },

  table: {
    width: "100%",
    minWidth: "400px", // prevent breaking
    borderCollapse: "collapse",
    background: "#1e293b",
  },

  th: {
    padding: "10px",
    border: "1px solid #334155",
    background: "#020617",
    fontSize: "14px",
  },

  td: {
    padding: "10px",
    border: "1px solid #334155",
    fontSize: "14px",
  },

  pagination: {
    marginTop: "15px",
    display: "flex",
    flexWrap: "wrap", // mobile wrap
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    textAlign: "center",
  },

  actions: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap", // stack on small screens
    gap: "10px",
    justifyContent: "center",
  },

  button: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },
};

export default AdminDashboard;