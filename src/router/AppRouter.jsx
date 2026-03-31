import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Backups from "../pages/Backup";
import Devices from "../pages/Devices";
import Settings from "../pages/Settings";
import Files from "../pages/Files";
import SystemMetrics from "../pages/SystemMetrics";
import Administrative from "../pages/Administrative";
import UserDetail from "../pages/UserDetail";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/backups" element={<Backups />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/files" element={<Files />} />
                <Route path="/system" element={<SystemMetrics />} />
                <Route path="/administratives" element={<Administrative />} />
                <Route path="/user/:id" element={<UserDetail />} />
                {/* Rutas por defecto */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;