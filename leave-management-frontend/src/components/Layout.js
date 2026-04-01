import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <Sidebar />
      <div
        style={{
          ...styles.content,
          ...(isMobile && { marginLeft: 0, paddingTop: "70px" }), // ✅ space for mobile topbar
        }}
      >
        {children}
      </div>
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
    transition: "0.3s",
  },
};

export default Layout;