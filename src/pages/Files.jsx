import { Layout } from "../components/Layout";
import { mockActivityLog } from "../data/mockData";
import { FileText, Eye } from "lucide-react";

function Files() {
    const masterFiles = [
        { name: "config_sistema.json", size: "24 KB", modified: "2024-03-28", type: "JSON" },
        { name: "database_backup.sql", size: "456 MB", modified: "2024-03-28", type: "SQL" },
        { name: "users_export.xlsx", size: "12.4 MB", modified: "2024-03-27", type: "Excel" },
        { name: "logs_sistema_2024.zip", size: "234 MB", modified: "2024-03-26", type: "ZIP" },
        { name: "certificados_ssl.pem", size: "8 KB", modified: "2024-03-25", type: "PEM" },
        { name: "procedimientos_backup.pdf", size: "2.1 MB", modified: "2024-03-24", type: "PDF" },
    ];

    return (
        <Layout>
            <div>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-800 mb-2">Archivos Maestros del Sistema</h1>
                    <p className="text-slate-600">Administra los archivos críticos de respaldo y configuración</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">ARCHIVOS MAESTROS</p>
                        <p className="text-3xl font-black text-slate-800">{masterFiles.length}</p>
                        <p className="text-xs text-slate-400 mt-2">En el sistema</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">ESPACIO USADO</p>
                        <p className="text-3xl font-black text-slate-800">736 MB</p>
                        <p className="text-xs text-slate-400 mt-2">De almacenamiento</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-sm font-semibold mb-2">ÚLTIMA ACTUALIZACIÓN</p>
                        <p className="text-3xl font-black text-slate-800">Hoy</p>
                        <p className="text-xs text-slate-400 mt-2">2024-03-28 14:30</p>
                    </div>
                </div>

                {/* Tabla de archivos */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <FileText size={20} />
                            Archivos Disponibles
                        </h3>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {masterFiles.map((file, idx) => (
                            <div key={idx} className="p-6 hover:bg-slate-50 transition flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl font-bold">
                                        <FileText size={18} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">{file.name}</p>
                                        <p className="text-sm text-slate-500">
                                            {file.type} • {file.size} • Modificado: {file.modified}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 ml-4">
                                    <button className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600">
                                        <Eye size={18} />
                                    </button>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200">
                                        {file.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Log de Actividad */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                        <h3 className="font-bold text-slate-800">Historial de Actividad</h3>
                    </div>

                    <div className="divide-y divide-slate-200 max-h-64 overflow-y-auto">
                        {mockActivityLog.map((log) => (
                            <div key={log.id} className="p-6 hover:bg-slate-50 transition flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-800">{log.action}</p>
                                    <p className="text-sm text-slate-500">
                                        {log.user} • {log.timestamp}
                                    </p>
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

export default Files;
