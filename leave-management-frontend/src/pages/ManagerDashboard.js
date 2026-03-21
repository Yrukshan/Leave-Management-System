import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function ManagerDashboard() {
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
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
  
            <span>
              Page {currentPage} / {totalPages || 1}
            </span>
  
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
  
          {/* QUICK ACTIONS */}
          <div style={styles.actions}>
            <button>Manage Users</button>
            <button>Manage Leaves</button>
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
  
      
      height: "calc(100vh - 60px)",
      overflow: "hidden",
      boxSizing: "border-box",
    },
  
    title: {
      marginBottom: "20px",
    },
  
    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
    },
  
    card: {
      background: "#1e293b",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    },
  
    tableWrapper: {
      marginTop: "15px",
      overflowY: "auto", 
      maxHeight: "250px",
    },
  
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "#1e293b",
    },
  
    th: {
      padding: "10px",
      border: "1px solid #334155",
      background: "#020617",
    },
  
    td: {
      padding: "10px",
      border: "1px solid #334155",
    },
  
    pagination: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
  
    actions: {
      marginTop: "20px",
      display: "flex",
      gap: "10px",
    },
  };
  

export default ManagerDashboard;