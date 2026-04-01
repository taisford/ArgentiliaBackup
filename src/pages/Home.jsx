import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import {
    Users,
    BarChart3,
    Settings,
    HardDrive,
    Database,
    Zap,
    Globe,
    Shield,
    ShieldCheck,
} from "lucide-react";
import { mockDashboardStats } from "../data/mockData";

function Home() {
    const navigate = useNavigate();

    const modules = [
        {
            name: "Administrativo",
            path: "/administratives",
            icon: ShieldCheck,
            description: "Gestiona permisos y administradores",
            color: "from-rose-500 to-rose-600",
            real: true,
        },
        {
            name: "Usuarios",
            path: "/users",
            icon: Users,
            description: "Gestiona usuarios del sistema",
            color: "from-orange-500 to-orange-600",
            real: true,
        },
        {
            name: "Respaldos",
            path: "/backups",
            icon: BarChart3,
            description: "Monitorea respaldos activos",
            color: "from-amber-500 to-amber-600",
            real: true,
        },
        {
            name: "Conexión",
            path: "/devices",
            icon: HardDrive,
            description: "Conecta nuevos dispositivos",
            color: "from-sky-500 to-sky-600",
            real: true,
        },
        {
            name: "Configuración",
            path: "/settings",
            icon: Settings,
            description: "Ajusta preferencias del sistema",
            color: "from-cyan-500 to-cyan-600",
            real: true,
        },
        {
            name: "Seguridad",
            icon: Shield,
            description: "Opciones de seguridad",
            color: "from-red-500 to-red-600",
            real: false,
        },
        {
            name: "Base de Datos",
            icon: Database,
            description: "Gestión de datos",
            color: "from-cyan-500 to-cyan-600",
            real: false,
        },
        {
            name: "Red",
            icon: Globe,
            description: "Configuración de red",
            color: "from-indigo-500 to-indigo-600",
            real: false,
        },
        {
            name: "Recursos",
            path: "/system",
            icon: Zap,
            description: "Estado del sistema y métricas",
            color: "from-yellow-500 to-yellow-600",
            real: true,
        },
    ];

    return (
        <Layout>
            <div>
                {/* Header */}
                <div className="mb-8">
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                        <p className="text-slate-500 text-sm font-semibold mb-2">
                            BACKUPS HITOS
                        </p>
                        <p className="text-3xl font-black text-slate-800">
                            {mockDashboardStats.successfulBackups} /{" "}
                            {mockDashboardStats.totalBackups}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                            {Math.round(
                                (mockDashboardStats.successfulBackups /
                                    mockDashboardStats.totalBackups) *
                                    100,
                            )}
                            % exitosos
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                        <p className="text-slate-500 text-sm font-semibold mb-2">
                            ALMACENAMIENTO
                        </p>
                        <p className="text-3xl font-black text-slate-800">
                            {mockDashboardStats.usedStorage}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                            Usado de {mockDashboardStats.totalStorage}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                        <p className="text-slate-500 text-sm font-semibold mb-2">
                            EQUIPOS
                        </p>
                        <p className="text-3xl font-black text-slate-800">
                            {mockDashboardStats.totalBackups}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                            Equipos monitorizados
                        </p>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        Módulos
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {modules.map((mod, i) => {
                        const Icon = mod.icon;
                        return (
                            <div
                                key={i}
                                onClick={() => mod.real && navigate(mod.path)}
                                className={`rounded-2xl p-6 border-2 transition-all duration-300 cursor-default
                                    ${
                                        mod.real
                                            ? "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
                                            : "bg-slate-100 border-slate-200 opacity-60"
                                    }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold bg-gradient-to-br ${mod.color} ${
                                        mod.real
                                            ? "group-hover:scale-110 transition-transform"
                                            : ""
                                    }`}
                                >
                                    <Icon size={24} />
                                </div>
                                <h3
                                    className={`font-bold mb-2 text-sm ${mod.real ? "text-slate-800" : "text-slate-600"}`}
                                >
                                    {mod.name}
                                </h3>
                                <p
                                    className={`text-xs ${mod.real ? "text-slate-500" : "text-slate-400"}`}
                                >
                                    {mod.description}
                                </p>
                                {!mod.real && (
                                    <span className="text-xs font-bold text-slate-400 mt-2 inline-block">
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default Home;
