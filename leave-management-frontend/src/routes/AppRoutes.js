import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Leaves from "../pages/Leaves";
import Users from "../pages/Users";

import ProtectedRoute from "./ProtectedRoute";
import DashboardRouter from "../pages/DashboardRouter";
import Home from "../pages/Home";
import Register from "../pages/Registre";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "employee", "manager"]}>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaves"
          element={
            <ProtectedRoute allowedRoles={["admin", "employee", "manager"]}>
              <Leaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;