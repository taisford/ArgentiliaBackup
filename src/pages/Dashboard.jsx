import { Layout } from "../components/Layout";
import { mockDashboardStats, mockActivityLog, mockBackups } from "../data/mockData";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const StatCard = ({ label, value, subtext, color, icon }) => (
        <div className={`bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-md transition ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">{label}</p>
                    <p className="text-3xl font-black mt-2 text-slate-800">{value}</p>
                    {subtext && <p className="text-xs text-slate-500 mt-2">{subtext}</p>}
                </div>
                <span className="text-4xl opacity-20">{icon}</span>
            </div>
        </div>
    );

    return (
        <Layout>
            <div>
                {/* Welcome Banner */}
                <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                    <h1 className="text-4xl font-black mb-2">👋 Bienvenido de vuelta</h1>
                    <p className="text-blue-100 text-lg">Sistema funcionando con normalidad • Todos los backups activos</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        label="Usuarios Activos"
                        value={mockDashboardStats.activeUsers}
                        subtext={`de ${mockDashboardStats.totalUsers} registrados`}
                        icon="👥"
                    />
                    <StatCard
                        label="Respaldos Exitosos"
                        value={mockDashboardStats.successfulBackups}
                        subtext={`de ${mockDashboardStats.totalBackups} totales`}
                        icon="✅"
                    />
                    <StatCard
                        label="Almacenamiento"
                        value={mockDashboardStats.usedStorage}
                        subtext={`${mockDashboardStats.storagePercentage}% de ${mockDashboardStats.totalStorage}`}
                        icon="💾"
                    />
                    <StatCard
                        label="Errores Activos"
                        value={mockDashboardStats.failedBackups}
                        subtext="Requieren atención"
                        color={mockDashboardStats.failedBackups > 0 ? "border-red-200 bg-red-50" : ""}
                        icon="⚠️"
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <button
                        onClick={() => navigate("/users")}
                        className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition text-left"
                    >
                        <p className="text-2xl mb-2">👥</p>
                        <p className="font-bold text-slate-800">Gestionar Usuarios</p>
                        <p className="text-sm text-slate-500 mt-2">Ver y editar usuarios del sistema</p>
                    </button>
                    <button
                        onClick={() => navigate("/backups")}
                        className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-lg transition text-left"
                    >
                        <p className="text-2xl mb-2">💾</p>
                        <p className="font-bold text-slate-800">Ver Respaldos</p>
                        <p className="text-sm text-slate-500 mt-2">Monitoreo de equipos conectados</p>
                    </button>
                    <button
                        onClick={() => navigate("/devices")}
                        className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg transition text-left"
                    >
                        <p className="text-2xl mb-2">🔌</p>
                        <p className="font-bold text-slate-800">Equipos Conectados</p>
                        <p className="text-sm text-slate-500 mt-2">Administra conexiones activas</p>
                    </button>
                </div>

                {/* Actividad Reciente */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
                        <h3 className="text-lg font-bold text-slate-800">Actividad Reciente</h3>
                    </div>

                    <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                        {mockActivityLog.map((log) => (
                            <div key={log.id} className="p-6 hover:bg-slate-50 transition flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                                        log.status === 'success'
                                            ? 'bg-green-100 text-green-600'
                                            : log.status === 'error'
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                        {log.status === 'success' ? '✓' : log.status === 'error' ? '✕' : '⚠'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{log.action}</p>
                                        <p className="text-xs text-slate-500 mt-1">{log.user} • {log.timestamp}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                                    log.status === 'success'
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : log.status === 'error'
                                        ? 'bg-red-100 text-red-700 border-red-200'
                                        : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                }`}>
                                    {log.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
