import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { mockUsers } from "../data/mockData";
import { Trash2, Edit2, UserPlus, Search } from "lucide-react";

function Users() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const getStatusColor = (status) => {
        return status === "Activo"
            ? "bg-green-100 text-green-700 border-green-200"
            : "bg-red-100 text-red-700 border-red-200";
    };

    const getAreaBadgeColor = (area) => {
        if (area === "Directores") return "bg-purple-100 text-purple-700 border-purple-200";
        if (area === "Sistemas") return "bg-blue-100 text-blue-700 border-blue-200";
        if (area === "Contabilidad") return "bg-teal-100 text-teal-700 border-teal-200";
        if (area === "Diseño") return "bg-pink-100 text-pink-700 border-pink-200";
        if (area === "Arquitectura") return "bg-indigo-100 text-indigo-700 border-indigo-200";
        if (area === "Soporte") return "bg-orange-100 text-orange-700 border-orange-200";
        if (area === "Redes") return "bg-cyan-100 text-cyan-700 border-cyan-200";
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    const filteredUsers = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return mockUsers;
        return mockUsers.filter((usr) =>
            usr.name.toLowerCase().includes(q) ||
            usr.email.toLowerCase().includes(q) ||
            usr.area.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <Layout>
            <div>
                {/* Header con botón */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 mb-2">Gestión de Usuarios</h1>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-bold shadow-lg">
                        <UserPlus size={20} />
                        Agregar Usuario
                    </button>
                </div>

                {/* Buscador */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar por nombre, email o área"
                            className="pl-10 pr-4 py-3 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Tabla */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Header tabla */}
                    <div className="bg-slate-50 border-b border-slate-200">
                        <div className="grid grid-cols-12 gap-4 p-6 font-bold text-sm text-slate-600 uppercase tracking-widest">
                            <div className="col-span-4">Usuario</div>
                            <div className="col-span-3">Email</div>
                            <div className="col-span-2">Área</div>
                            <div className="col-span-2">Estado</div>
                            <div className="col-span-1">Acciones</div>
                        </div>
                    </div>

                    {/* Filas */}
                    <div className="divide-y divide-slate-200">
                        {mockUsers.map((user) => (
                            <div key={user.id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-slate-50 transition">
                                {/* Usuario */}
                                <div className="col-span-4">
                                    <p className="font-bold text-slate-800">{user.name}</p>
                                    <p className="text-xs text-slate-400">ID: {user.id}</p>
                                </div>

                                {/* Email */}
                                <div className="col-span-3">
                                    <p className="text-slate-700 font-medium text-sm">{user.email}</p>
                                </div>

                                {/* Área */}
                                <div className="col-span-2">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${getAreaBadgeColor(
                                            user.area
                                        )}`}
                                    >
                                        {user.area}
                                    </span>
                                </div>

                                {/* Estado */}
                                <div className="col-span-2">
                                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </div>

                                {/* Acciones */}
                                <div className="col-span-1 flex items-center gap-2">
                                    <button
                                        onClick={() => navigate(`/user/${user.id}`)}
                                        className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                                        title="Ver detalles"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button className="p-2 hover:bg-red-100 rounded-lg transition text-red-600" title="Eliminar">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer con info */}
                <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                    <p>Usuarios encontrados: <span className="font-bold text-slate-800">{filteredUsers.length}</span></p>
                    <p>Activos: <span className="font-bold text-green-600">{mockUsers.filter(u => u.status === "Activo").length}</span></p>
                </div>
            </div>
        </Layout>
    );
}

export default Users;
