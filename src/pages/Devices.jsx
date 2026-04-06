import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { mockDevices } from "../data/mockData";
import { Plus, Wifi, WifiOff, Search } from "lucide-react";

function Devices() {
    const [query, setQuery] = useState("");
    const [connectModalOpen, setConnectModalOpen] = useState(false);
    const [newDevice, setNewDevice] = useState({
        name: "",
        owner: "",
        os: "Windows 10",
        ipAddress: "",
        macAddress: "",
        location: "Oficina central",
        network: "LAN Corporativa",
        serial: "",
        notes: "",
    });

    const handleDeviceInput = (field, value) => {
        setNewDevice((prev) => ({ ...prev, [field]: value }));
    };

    const handleDeviceSave = () => {
        setConnectModalOpen(false);
        setNewDevice({
            name: "",
            owner: "",
            os: "Windows 10",
            ipAddress: "",
            macAddress: "",
            location: "Oficina central",
            network: "LAN Corporativa",
            serial: "",
            notes: "",
        });
    };

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
                    <button
                        onClick={() => setConnectModalOpen(true)}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-bold shadow-lg"
                    >
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
                        <li>Completa los datos del dispositivo en el formulario</li>
                        <li>Verifica la dirección IP y el propietario</li>
                        <li>El equipo quedará registrado en la lista</li>
                    </ol>
                </div>

                {connectModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4">
                        <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Conectar nuevo dispositivo</h2>
                                    <p className="text-sm text-slate-500">Ingresa los datos detallados para poder vincularlo.</p>
                                </div>
                                <button
                                    onClick={() => setConnectModalOpen(false)}
                                    className="text-slate-500 hover:text-slate-900 transition"
                                >
                                    Cerrar
                                </button>
                            </div>
                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-slate-700">Nombre del equipo</label>
                                    <input
                                        value={newDevice.name}
                                        onChange={(e) => handleDeviceInput("name", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="GA-123"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Propietario</label>
                                    <input
                                        value={newDevice.owner}
                                        onChange={(e) => handleDeviceInput("owner", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Nombre del usuario"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Sistema operativo</label>
                                    <input
                                        value={newDevice.os}
                                        onChange={(e) => handleDeviceInput("os", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Windows 10"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Dirección IP</label>
                                    <input
                                        value={newDevice.ipAddress}
                                        onChange={(e) => handleDeviceInput("ipAddress", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="192.168.1.100"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-slate-700">Dirección MAC</label>
                                    <input
                                        value={newDevice.macAddress}
                                        onChange={(e) => handleDeviceInput("macAddress", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="00:1A:2B:3C:4D:5E"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Ubicación física</label>
                                    <input
                                        value={newDevice.location}
                                        onChange={(e) => handleDeviceInput("location", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Red</label>
                                    <input
                                        value={newDevice.network}
                                        onChange={(e) => handleDeviceInput("network", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Notas adicionales</label>
                                    <textarea
                                        value={newDevice.notes}
                                        onChange={(e) => handleDeviceInput("notes", e.target.value)}
                                        className="w-full min-h-[120px] rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Por ejemplo: requiere acceso VPN o configuración especial"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 px-6 py-5 bg-slate-50 border-t border-slate-200">
                                <button
                                    onClick={() => setConnectModalOpen(false)}
                                    className="rounded-2xl px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDeviceSave}
                                    className="rounded-2xl px-6 py-3 bg-green-600 text-white hover:bg-green-700 transition"
                                >
                                    Guardar dispositivo
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Devices;
