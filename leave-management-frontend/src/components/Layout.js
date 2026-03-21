import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
};

export default Layout;