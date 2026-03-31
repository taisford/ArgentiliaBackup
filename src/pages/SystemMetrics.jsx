import { Layout } from "../components/Layout";
import { mockSystemMetrics } from "../data/mockData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function SystemMetrics() {
    return (
        <Layout>
            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-800 mb-2">Recursos del Sistema</h1>
                    <p className="text-slate-600">Monitoreo de uso de CPU, memoria y disco en los últimos 24 horas</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
                    <h3 className="font-bold text-slate-800 mb-4">Uso de CPU y Memoria</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={mockSystemMetrics}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
                            <Legend />
                            <Line type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={2} name="CPU %" dot={{ fill: "#ef4444" }} />
                            <Line type="monotone" dataKey="memory" stroke="#3b82f6" strokeWidth={2} name="Memoria %" dot={{ fill: "#3b82f6" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Uso de Disco</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={mockSystemMetrics}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
                            <Legend />
                            <Line type="monotone" dataKey="disk" stroke="#22c55e" strokeWidth={2} name="Disco %" dot={{ fill: "#22c55e" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Layout>
    );
}

export default SystemMetrics;
