import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [form, setForm] = useState({
    leave_type: "",
    from_date: "",
    to_date: "",
    reason: "",
  });

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      // FIX: Role-based API call
      let url = "/leaves";

      if (role === "employee") {
        url = "/leaves/my";
      }

      const res = await api.get(url);

      setLeaves(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.leave_type || !form.from_date || !form.to_date || !form.reason) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/leaves", {
        leave_type: form.leave_type,
        reason: form.reason,
        from_date: new Date(form.from_date).toISOString(),
        to_date: new Date(form.to_date).toISOString(),
      });

      alert("Leave applied");

      setForm({
        leave_type: "",
        from_date: "",
        to_date: "",
        reason: "",
      });

      setShowForm(false);
      fetchLeaves();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
    }
  };

  const approve = async (id) => {
    await api.put(`/admin/approve/${id}`);
    fetchLeaves();
  };

  const reject = async (id) => {
    await api.put(`/admin/reject/${id}`);
    fetchLeaves();
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentLeaves = leaves.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(leaves.length / itemsPerPage);

  return (
    <Layout>
      <div style={styles.container}>
        <h2>Leave Management</h2>

        <button style={styles.addBtn} onClick={() => setShowForm(true)}>
          + Apply Leave
        </button>

        {/* FORM */}
        {showForm && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>Apply Leave</h3>

              <input
                name="leave_type"
                placeholder="Leave Type"
                value={form.leave_type}
                onChange={handleChange}
              />

              <input
                type="date"
                name="from_date"
                value={form.from_date}
                onChange={handleChange}
              />

              <input
                type="date"
                name="to_date"
                value={form.to_date}
                onChange={handleChange}
              />

              <input
                name="reason"
                placeholder="Reason"
                value={form.reason}
                onChange={handleChange}
              />

              <div style={styles.modalActions}>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>From</th>
                    <th style={styles.th}>To</th>
                    <th style={styles.th}>Reason</th>

                    {/* USER ID COLUMN */}
                    <th style={styles.th}>User ID</th>

                    <th style={styles.th}>Status</th>

                    {(role === "admin" || role === "manager") && (
                      <th style={styles.th}>Actions</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(currentLeaves) && currentLeaves.length > 0 ? (
                    currentLeaves.map((l) => (
                      <tr key={l.id}>
                        <td style={styles.td}>{l.id}</td>
                        <td style={styles.td}>{l.leave_type}</td>
                        <td style={styles.td}>{l.from_date?.slice(0, 10)}</td>
                        <td style={styles.td}>{l.to_date?.slice(0, 10)}</td>
                        <td style={styles.td}>{l.reason}</td>

                        <td style={styles.td}>{l.user_id}</td>

                        <td style={styles.td}>{l.status}</td>

                        {(role === "admin" || role === "manager") && (
                          <td style={styles.td}>
                            <button onClick={() => approve(l.id)}>
                              Approve
                            </button>

                            <button
                              style={{ marginLeft: "10px", color: "red" }}
                              onClick={() => reject(l.id)}
                            >
                              Reject
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={styles.td}>
                        No leaves found
                      </td>
                    </tr>
                  )}
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
          </>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#0f172a",
    color: "white",
  },
  addBtn: {
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    background: "#1e293b",
    minWidth: "600px",
  },
  th: {
    padding: "12px",
    border: "1px solid #334155",
    textAlign: "left",
    background: "#020617",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px",
    border: "1px solid #334155",
    whiteSpace: "nowrap",
  },
  pagination: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  modal: {
    background: "#1e293b",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "500px",
    maxWidth: "95%",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  },
};

export default Leaves;