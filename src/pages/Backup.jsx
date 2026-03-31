import { Layout } from "../components/Layout";
import { mockBackups } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { AlertCircle, CheckCircle, Clock, HardDrive } from "lucide-react";

function Backups() {
    const navigate = useNavigate();

    const getStatusIcon = (status) => {
        if (status === "Actualizado") return <CheckCircle size={18} className="text-green-500" />;
        if (status === "Actualizando") return <Clock size={18} className="text-blue-500 animate-spin" />;
        if (status === "Error") return <AlertCircle size={18} className="text-red-500" />;
        return <Clock size={18} className="text-yellow-500" />;
    };

    const getStatusBg = (status) => {
        if (status === "Actualizado") return "bg-green-100 text-green-700 border-green-200";
        if (status === "Actualizando") return "bg-blue-100 text-blue-700 border-blue-200";
        if (status === "Error") return "bg-red-100 text-red-700 border-red-200";
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    };

    // Datos para pie chart (estado de backups)
    const backupStatus = [
        { name: "Actualizado", value: mockBackups.filter((b) => b.status === "Actualizado").length, color: "#22c55e" },
        { name: "Actualizando", value: mockBackups.filter((b) => b.status === "Actualizando").length, color: "#3b82f6" },
        { name: "Error", value: mockBackups.filter((b) => b.status === "Error").length, color: "#ef4444" },
    ];

    return (
        <Layout>
            <div>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-800 mb-2">Gestión de Respaldos</h1>
                    <p className="text-slate-600">Monitoreo de backups activos y estado de equipos</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">TOTAL RESPALDOS</p>
                        <p className="text-3xl font-black text-slate-800">{mockBackups.length}</p>
                        <p className="text-xs text-slate-400 mt-2">Equipos monitoreados</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">EXITOSOS</p>
                        <p className="text-3xl font-black text-green-600">
                            {mockBackups.filter((b) => b.status === "Actualizado").length}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Último 24 horas</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">EN PROCESO</p>
                        <p className="text-3xl font-black text-blue-600">
                            {mockBackups.filter((b) => b.status === "Actualizando").length}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">En ejecución</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">ERRORES</p>
                        <p className="text-3xl font-black text-red-600">
                            {mockBackups.filter((b) => b.status === "Error").length}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Requieren atención</p>
                    </div>
                </div>

                {/* Gráfico de estado */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
                    <h3 className="font-bold text-slate-800 mb-4">Estado de Backups</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={backupStatus}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {backupStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Tabla de respaldos */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <HardDrive size={20} />
                            Equipos Conectados
                        </h3>
                    </div>

                    <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                        {mockBackups.map((backup) => (
                            <div
                                key={backup.id}
                                onClick={() => navigate(`/user/${backup.id}`)}
                                className="p-6 hover:bg-slate-50 transition cursor-pointer border-l-4 border-transparent hover:border-blue-500"
                            >
                                {/* Header fila */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl font-bold">
                                            🖥️
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{backup.pcName}</p>
                                            <p className="text-sm text-slate-500">{backup.userName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(backup.status)}
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusBg(backup.status)}`}>
                                            {backup.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Barra de progreso */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs text-slate-600 font-semibold">Progreso</p>
                                        <p className="text-xs font-bold text-slate-800">{backup.progress}%</p>
                                    </div>
                                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-300 ${
                                                backup.progress === 100 ? "bg-green-500" : "bg-blue-500"
                                            }`}
                                            style={{ width: `${backup.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Información adicional */}
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Archivos</p>
                                        <p className="font-bold text-slate-800">{backup.files}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Almacenamiento</p>
                                        <p className="font-bold text-slate-800">{backup.storageUsed}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">CPU</p>
                                        <p className="font-bold text-slate-800">{backup.cpuUsage}%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Memoria</p>
                                        <p className="font-bold text-slate-800">{backup.memoryUsage}%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Última actualización</p>
                                        <p className="font-bold text-slate-800 text-sm">{backup.lastBackup}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Backups;
