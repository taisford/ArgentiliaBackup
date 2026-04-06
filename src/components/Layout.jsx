import { useNavigate, useLocation } from "react-router-dom";
import { Menu, LogOut, Home, Users, Inbox, HardDrive, Settings, BarChart3, Terminal, FileText } from "lucide-react";
import { useState } from "react";

export function Layout({ children, hideNav = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { label: "Home", path: "/home", icon: Home },
        { label: "Usuarios", path: "/users", icon: Users },
        { label: "Respaldos", path: "/backups", icon: BarChart3 },
        { label: "Recursos", path: "/system", icon: BarChart3 },
        { label: "Conexión", path: "/devices", icon: Inbox },
        { label: "Consola", path: "/terminal", icon: Terminal },
        { label: "Logs", path: "/logs", icon: FileText },
        { label: "Archivos", path: "/files", icon: HardDrive },
        { label: "Configuración", path: "/settings", icon: Settings },
    ];

    const isActive = (path) => location.pathname === path;

    // Si es login, no mostrar navegación
    if (hideNav || location.pathname === "/") {
        return children;
    }

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-20"
                } text-white transition-all duration-300 flex flex-col overflow-hidden shadow-2xl`}
                style={{ background: "#5c1515" }}
            >
                {/* Header Sidebar */}
                <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className={`${sidebarOpen ? "block" : "hidden"} flex items-center gap-3`}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg" style={{ background: "#8C1F1F" }}>
                            🔒
                        </div>
                        <div>
                            <p className="font-black text-lg">Grupo</p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Argentilia</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-slate-800 rounded-lg transition"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all`}
                                style={active ? { background: "#8C1F1F", boxShadow: "0 10px 20px rgba(140, 31, 31, 0.3)" } : { color: "rgba(255,255,255,0.7)" }}
                                onMouseEnter={(e) => !active && (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                                onMouseLeave={(e) => !active && (e.currentTarget.style.background = "transparent")}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                <span className={`${sidebarOpen ? "block" : "hidden"} font-semibold`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)", e.currentTarget.style.color = "#ff6b6b")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent", e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        <span className={`${sidebarOpen ? "block" : "hidden"} font-semibold`}>Salir</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Top Bar */}
                <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
                    <h1 className="text-xl font-black text-slate-800">Panel de Sistema</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "#f5e6e6", color: "#8C1F1F" }}>
                            👤
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-800">Admin</p>
                            <p className="text-xs text-slate-400">Administrador</p>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-8">{children}</div>
            </div>
        </div>
    );
}
