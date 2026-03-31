import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { mockDevices } from "../data/mockData";
import { Plus, Wifi, WifiOff, Search } from "lucide-react";

function Devices() {
    const [query, setQuery] = useState("");

    const filteredDevices = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return mockDevices;
        return mockDevices.filter((device) =>
            device.name.toLowerCase().includes(q) ||
            device.owner.toLowerCase().includes(q) ||
            device.os.toLowerCase().includes(q) ||
            device.ipAddress.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <Layout>
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 mb-2">Conexión de Equipos</h1>
                        <p className="text-slate-600">Administra los equipos conectados al sistema</p>
                    </div>
                    <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-bold shadow-lg">
                        <Plus size={20} />
                        Conectar Equipo
                    </button>
                </div>

                {/* Buscador */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar equipos por nombre, propietario, IP o OS"
                            className="pl-10 pr-4 py-3 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">EQUIPOS TOTALES</p>
                        <p className="text-3xl font-black text-slate-800">{mockDevices.length}</p>
                        <p className="text-xs text-slate-400 mt-2">Registrados en el sistema</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">EN LÍNEA</p>
                        <p className="text-3xl font-black text-green-600">
                            {mockDevices.filter((d) => d.status === "En línea").length}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Conectados ahora</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">DESCONECTADOS</p>
                        <p className="text-3xl font-black text-red-600">
                            {mockDevices.filter((d) => d.status === "Desconectado").length}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Inactivos</p>
                    </div>
                </div>

                {/* Tabla de equipos */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                        <h3 className="font-bold text-slate-800">Equipos Registrados</h3>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {filteredDevices.map((device) => (
                            <div key={device.id} className="p-6 hover:bg-slate-50 transition">
                                <div className="flex items-center justify-between">
                                    {/* Info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                                            device.status === "En línea"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-slate-100 text-slate-600"
                                        }`}>
                                            PC
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <p className="font-bold text-slate-800">{device.name}</p>
                                                {device.status === "En línea" ? (
                                                    <Wifi size={16} className="text-green-500" />
                                                ) : (
                                                    <WifiOff size={16} className="text-slate-400" />
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1">
                                                {device.os} • IP: {device.ipAddress}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Estado y usuario */}
                                    <div className="flex items-center gap-6 ml-4">
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500">Propietario</p>
                                            <p className="font-bold text-slate-800">{device.owner}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500">Última conexión</p>
                                            <p className="font-bold text-slate-800">{device.lastSeen}</p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-lg font-bold text-sm border whitespace-nowrap ${
                                            device.status === "En línea"
                                                ? "bg-green-100 text-green-700 border-green-200"
                                                : "bg-slate-100 text-slate-700 border-slate-200"
                                        }`}>
                                            {device.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instrucciones */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <p className="font-bold text-blue-900 mb-2">Cómo conectar un nuevo equipo</p>
                    <ol className="text-sm text-blue-800 space-y-2 ml-4 list-decimal">
                        <li>Haz clic en el botón "Conectar Equipo"</li>
                        <li>Sigue las instrucciones del asistente de configuración</li>
                        <li>El equipo aparecerá en esta lista una vez vinculado</li>
                        <li>Asigna el equipo a un usuario administrativo</li>
                    </ol>
                </div>
            </div>
        </Layout>
    );
}

export default Devices;
