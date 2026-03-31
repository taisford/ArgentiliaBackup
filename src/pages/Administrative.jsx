import { Layout } from "../components/Layout";
import { mockAdministrators } from "../data/mockData";
import { useState } from "react";
import { ShieldCheck, Trash2, Plus } from "lucide-react";

function Administrative() {
    const [search, setSearch] = useState("");

    const filteredAdmins = mockAdministrators.filter((admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-800 mb-2">Administrativo</h1>
                    <p className="text-slate-600">Gestión de perfil y permisos de administradores</p>
                </div>

                <div className="flex items-center justify-between gap-4 mb-6">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar administrador por nombre, correo o rol"
                        className="flex-1 border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 transition">
                        <Plus size={16} /> Agregar
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-5 gap-4 p-4 border-b border-slate-200 text-slate-500 text-xs uppercase">
                        <div className="col-span-2">Nombre</div>
                        <div>Correo</div>
                        <div>Rol</div>
                        <div className="text-center">Acciones</div>
                    </div>
                    <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                        {filteredAdmins.map((admin) => (
                            <div key={admin.id} className="grid grid-cols-5 gap-4 p-4 items-center">
                                <div className="col-span-2">
                                    <p className="font-bold text-slate-900">{admin.name}</p>
                                    <p className="text-xs text-slate-400">{admin.area}</p>
                                </div>
                                <p>{admin.email}</p>
                                <p>{admin.role}</p>
                                <div className="text-center flex justify-center gap-2">
                                    <button className="text-blue-600 hover:text-blue-700" title="Editar permisos">
                                        <ShieldCheck size={16} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-700" title="Eliminar administrador">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Administrative;
