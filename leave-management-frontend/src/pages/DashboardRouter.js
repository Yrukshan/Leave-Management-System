import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";

function DashboardRouter() {
  const role = localStorage.getItem("role");

  if (role === "admin") return <AdminDashboard />;
  if (role === "employee") return <EmployeeDashboard />;
  if (role === "manager") return <ManagerDashboard />;

  return <h2>Unauthorized</h2>;
}

export default DashboardRouter;