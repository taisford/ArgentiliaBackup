import { useNavigate, useLocation } from "react-router-dom";
import { Menu, LogOut, Home, Users, Inbox, HardDrive, Settings, BarChart3 } from "lucide-react";
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
                } bg-slate-900 text-white transition-all duration-300 flex flex-col overflow-hidden shadow-2xl`}
            >
                {/* Header Sidebar */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className={`${sidebarOpen ? "block" : "hidden"} flex items-center gap-3`}>
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-black text-lg">
                            🔒
                        </div>
                        <div>
                            <p className="font-black text-lg">Backup</p>
                            <p className="text-xs text-slate-400">Pro</p>
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
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                                    active
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
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
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all"
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
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg font-bold text-blue-600">
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
