import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { mockLogs } from "../data/mockData";
import { Search, Database, Server, ShieldCheck } from "lucide-react";

function Logs() {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("Todos");

    const filteredLogs = useMemo(() => {
        const q = query.toLowerCase().trim();
        return mockLogs.filter((log) => {
            const matchesFilter = filter === "Todos" || log.source === filter;
            const matchesQuery =
                !q ||
                log.message.toLowerCase().includes(q) ||
                log.source.toLowerCase().includes(q) ||
                log.timestamp.toLowerCase().includes(q);
            return matchesFilter && matchesQuery;
        });
    }, [filter, query]);

    const badges = {
        info: "bg-slate-100 text-slate-700 border-slate-200",
        success: "bg-emerald-100 text-emerald-700 border-emerald-200",
        warning: "bg-amber-100 text-amber-700 border-amber-200",
        error: "bg-red-100 text-red-700 border-red-200",
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2">Logs del Sistema</h1>
                    <p className="text-slate-600">Registros en tiempo real de la plataforma, el servidor y los respaldos.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-2xl hover:bg-slate-800 transition">
                        <Server size={18} /> Ver servidor
                    </button>
                    <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-2xl hover:bg-slate-800 transition">
                        <ShieldCheck size={18} /> Ver seguridad
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-700 mb-4">
                        <Database size={18} />
                        <p className="font-bold">Total de entradas</p>
                    </div>
                    <p className="text-4xl font-black text-slate-900">{mockLogs.length}</p>
                    <p className="text-sm text-slate-500 mt-2">Últimas 24 horas</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-700 mb-4">
                        <ShieldCheck size={18} />
                        <p className="font-bold">Eventos críticos</p>
                    </div>
                    <p className="text-4xl font-black text-red-600">{mockLogs.filter((log) => log.level === "error").length}</p>
                    <p className="text-sm text-slate-500 mt-2">Errores y fallos</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-700 mb-4">
                        <Server size={18} />
                        <p className="font-bold">Respaldo</p>
                    </div>
                    <p className="text-4xl font-black text-blue-600">{mockLogs.filter((log) => log.source === "Respaldo").length}</p>
                    <p className="text-sm text-slate-500 mt-2">Eventos de backup</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-6 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-3 text-slate-700">
                        <Search size={18} />
                        <p className="font-semibold">Filtrar registros</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        { ["Todos", "Sistema", "Servidor", "Respaldo"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${filter === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                            >
                                {item}
                            </button>
                        )) }
                    </div>
                </div>
                <div className="p-6">
                    <div className="relative max-w-md mb-6">
                        <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar mensaje, fuente o timestamp"
                            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                    <th className="py-3 px-4">Hora</th>
                                    <th className="py-3 px-4">Origen</th>
                                    <th className="py-3 px-4">Evento</th>
                                    <th className="py-3 px-4">Severidad</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50 transition">
                                        <td className="py-4 px-4 text-sm text-slate-600">{log.timestamp}</td>
                                        <td className="py-4 px-4 text-sm font-bold text-slate-800">{log.source}</td>
                                        <td className="py-4 px-4 text-sm text-slate-700">{log.message}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badges[log.level]}`}>
                                                {log.level.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logs;
