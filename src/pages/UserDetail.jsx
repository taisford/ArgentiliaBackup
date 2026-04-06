import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { getUserDetail } from "../data/mockData";
import { ArrowLeft, Download, Share2 } from "lucide-react";

function UserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getUserDetail(id);
    const [userState, setUserState] = useState(user);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "",
        status: user?.status || "Activo",
        joinDate: user?.joinDate || "",
        pcName: user?.pcInfo?.pcName || "",
        os: user?.pcInfo?.os || "",
        processor: user?.pcInfo?.processor || "",
        ram: user?.pcInfo?.ram || "",
        storage: user?.pcInfo?.storage || "",
        ipAddress: user?.pcInfo?.ipAddress || "",
    });

    if (!user) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-96">
                    <p className="text-xl text-slate-600">Usuario no encontrado</p>
                </div>
            </Layout>
        );
    }

    const storagePercentage = (userState.storageStats.used / userState.storageStats.total) * 100;

    const handleInputChange = (field, value) => {
        setEditData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        setUserState((prev) => ({
            ...prev,
            name: editData.name,
            email: editData.email,
            role: editData.role,
            status: editData.status,
            joinDate: editData.joinDate,
            pcInfo: {
                ...prev.pcInfo,
                pcName: editData.pcName,
                os: editData.os,
                processor: editData.processor,
                ram: editData.ram,
                storage: editData.storage,
                ipAddress: editData.ipAddress,
            },
        }));
        setIsEditModalOpen(false);
    };

    return (
        <Layout>
            <div>
                {/* Header con botón atrás */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-800">Perfil del Usuario</h1>
                        <p className="text-slate-600 mt-1">ID: #{user.id}</p>
                    </div>
                </div>

                {/* Info del usuario */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Card principal */}
                    <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl mb-4 shadow-md">
                                {userState.avatar || userState.name?.charAt(0)}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">{userState.name}</h2>
                            <p className="text-slate-500 mt-1">{userState.email}</p>

                            <div className="w-full mt-6 space-y-3">
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Rol</p>
                                    <p className="font-bold text-slate-800">{userState.role}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Estado</p>
                                    <p className={`font-bold ${userState.status === "Activo" ? "text-green-600" : "text-red-600"}`}>
                                        {userState.status}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Registro</p>
                                    <p className="font-bold text-slate-800">{userState.joinDate}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-bold"
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </div>

                    {/* Información del PC */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Información del Equipo</h3>

                        <div className="space-y-4">
                            {Object.entries(userState.pcInfo).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between pb-4 border-b border-slate-100">
                                    <p className="text-slate-600 font-semibold capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </p>
                                    <p className="font-bold text-slate-800">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Almacenamiento */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                            <p className="font-bold text-slate-800 mb-3">Almacenamiento Usado</p>
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm text-slate-600">
                                    {userState.storageStats.used} GB / {userState.storageStats.total} GB
                                </p>
                                <p className="text-sm font-bold text-slate-800">{userState.storageStats.percentage}%</p>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                                    style={{ width: `${storagePercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Archivos */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
                        <h3 className="text-lg font-bold text-slate-800">Archivos Almacenados ({userState.files.length})</h3>
                    </div>
                    <div className="divide-y divide-slate-200">
                        {userState.files.map((file) => (
                            <div key={file.id} className="p-6 hover:bg-slate-50 transition flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-bold">
                                        📄
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-slate-800 truncate">{file.name}</p>
                                        <p className="text-sm text-slate-500">
                                            {file.type} • {file.size} • {file.uploadDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 ml-4">
                                    <button className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600">
                                        <Share2 size={18} />
                                    </button>
                                    <button className="p-2 hover:bg-green-100 rounded-lg transition text-green-600">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Historial de backups */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
                        <h3 className="text-lg font-bold text-slate-800">Historial de Respaldos</h3>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {userState.backupHistory.map((backup, idx) => (
                            <div key={idx} className="p-6 hover:bg-slate-50 transition flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-800">{backup.date}</p>
                                    <p className="text-sm text-slate-500">{backup.filesCount} archivos respaldados</p>
                                </div>
                                <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-bold text-sm border border-green-200">
                                    {backup.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
                        <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Editar datos del usuario</h2>
                                    <p className="text-sm text-slate-500">Modifica la información y guarda los cambios.</p>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-slate-500 hover:text-slate-900 transition"
                                >
                                    Cerrar
                                </button>
                            </div>
                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-slate-700">Nombre completo</label>
                                    <input
                                        value={editData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Email</label>
                                    <input
                                        value={editData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Rol</label>
                                    <input
                                        value={editData.role}
                                        onChange={(e) => handleInputChange("role", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Estado</label>
                                    <select
                                        value={editData.status}
                                        onChange={(e) => handleInputChange("status", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Activo</option>
                                        <option>Inactivo</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-slate-700">Fecha de registro</label>
                                    <input
                                        value={editData.joinDate}
                                        onChange={(e) => handleInputChange("joinDate", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Nombre del equipo</label>
                                    <input
                                        value={editData.pcName}
                                        onChange={(e) => handleInputChange("pcName", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">IP del equipo</label>
                                    <input
                                        value={editData.ipAddress}
                                        onChange={(e) => handleInputChange("ipAddress", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="block text-sm font-semibold text-slate-700">Sistema operativo</label>
                                    <input
                                        value={editData.os}
                                        onChange={(e) => handleInputChange("os", e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 px-6 py-5 bg-slate-50 border-t border-slate-200">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="rounded-2xl px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="rounded-2xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default UserDetail;
