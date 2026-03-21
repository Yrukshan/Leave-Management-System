import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // default
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/register", form);
      alert("Registration successful!");
      nav("/login"); 
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* BACK BUTTON ADDED */}
        <div style={styles.back} onClick={() => nav("/")}>
          ← Back
        </div>

        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select
          style={styles.input}
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="employee">Employee</option>
        </select>

        <button style={styles.button} onClick={register}>
          Register
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => nav("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #020617, #0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    position: "relative", 
    background: "rgba(30, 41, 59, 0.9)",
    padding: "30px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  /* NEW STYLE */
  back: {
    position: "absolute",
    top: "10px",
    left: "15px",
    color: "#3b82f6",
    cursor: "pointer",
    fontSize: "14px",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "white",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  loginText: {
    marginTop: "10px",
    textAlign: "center",
    color: "#94a3b8",
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
  },
};

export default Register;