import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, AlertCircle } from "lucide-react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        // Cualquier usuario/contraseña funciona (es fake)
        if (username.trim() && password.trim()) {
            navigate("/home");
        } else {
            setError("Por favor completa usuario y contraseña");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 font-sans relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
            </div>

            {/* Card de Login */}
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">
                {/* Header con gradiente */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                            🔒
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">Backup Pro</h1>
                    <p className="text-blue-100 text-sm">Sistema de Administración</p>
                </div>

                {/* Formulario */}
                <div className="px-8 py-8">
                    <p className="text-slate-600 text-sm mb-6 text-center font-semibold">Panel Administrativo</p>

                    {error && (
                        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                            <span className="text-red-700 font-semibold text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Usuario */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin"
                                className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 font-semibold"
                            />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50"
                            />
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/40 active:scale-95 transition-all font-bold text-lg mt-6 flex items-center justify-center gap-2"
                        >
                            <Lock size={20} />
                            Ingresar al Panel
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <p className="text-center text-slate-500 text-xs">
                            Sistema de Backup Empresarial © 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
