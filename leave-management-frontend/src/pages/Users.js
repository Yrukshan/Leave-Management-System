import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // pagination
  const itemsPerPage = 6;

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      if (form.id) {
        await api.put(`/users/${form.id}`, form);
        alert("User updated");
      } else {
        await api.post("/register", form);
        alert("User created");
      }

      setForm({ id: null, name: "", email: "", password: "", role: "employee" });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const editUser = (user) => {
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowForm(true);
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <Layout>
      <div style={styles.container}>
        <h2>User Management</h2>

        <button style={styles.addBtn} onClick={() => setShowForm(true)}>
          + Add User
        </button>

        {/* MODAL */}
        {showForm && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>{form.id ? "Update User" : "Create User"}</h3>

              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>

              <div style={styles.modalActions}>
                <button onClick={handleSubmit}>
                  {form.id ? "Update" : "Create"}
                </button>

                <button
                  onClick={() => {
                    setShowForm(false);
                    setForm({ id: null, name: "", email: "", password: "", role: "employee" });
                  }}
                  style={{ background: "gray" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>
                    <button onClick={() => editUser(user)}>Edit</button>
                    <button
                      style={{ marginLeft: "10px", background: "red", color: "white" }}
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
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
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  addBtn: {
    marginBottom: "15px",
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    width: "100%",
    maxWidth: "200px",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    minWidth: "600px",
    borderCollapse: "collapse",
    background: "#1e293b",
  },

  th: {
    padding: "12px",
    border: "1px solid #334155",
    textAlign: "left",
    background: "#0f172a",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "12px",
    border: "1px solid #334155",
    whiteSpace: "nowrap",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },

  modal: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  },

  // PAGINATION STYLE
  pagination: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
};

export default Users;