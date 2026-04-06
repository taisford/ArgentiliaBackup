import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { mockLogs } from "../data/mockData";
import { Server, ShieldCheck, Square } from "lucide-react";

function Logs() {
    const [filter, setFilter] = useState("Todos");

    const filteredLogs = useMemo(() => {
        return mockLogs.filter((log) => {
            return filter === "Todos" || log.source === filter;
        });
    }, [filter]);

    return (
        <Layout>
            <div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 mb-2">Logs</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 hidden">
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

                <div className="rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 bg-slate-900 border-b border-slate-800">
                        <p className="text-sm text-slate-400 ml-3">admin@192.168.7.1</p>
                    </div>
                    <div className="p-6 font-mono text-sm leading-6 space-y-2 max-h-[70vh] overflow-y-auto">
                        {filteredLogs.map((log) => (
                            <div key={log.id} className="flex items-start gap-3">
                                <span className="mt-1 text-slate-500"><Square size={10} /></span>
                                <div>
                                    <p className="text-slate-400">{log.timestamp} <span className="text-sky-400">[{log.source}]</span> <span className="text-amber-300">[{log.level.toUpperCase()}]</span></p>
                                    <p className="text-slate-200">{log.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Logs;
