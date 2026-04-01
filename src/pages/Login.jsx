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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-slate-800 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-600 rounded-full blur-3xl"></div>
            </div>

            {/* Card de Login */}
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md border border-gray-300 overflow-hidden">
                {/* Header con gradiente */}
                <div className="px-8 py-2 text-center">
                    <div className="flex justify-center mb-1">
                        <div className="w-100 bg-white rounded-2xl items-center justify-center">
                            <img src="/public/logo-argentilia.jpg" alt="" />
                        </div>
                    </div>
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
                                className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-transparent transition-all bg-slate-50 font-semibold"
                                style={{ focusColor: "#8C1F1F" }}
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
                                className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-transparent transition-all bg-slate-50"
                                style={{ focusColor: "#8C1F1F" }}
                            />
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full text-white py-3 rounded-xl hover:shadow-lg active:scale-95 transition-all font-bold text-lg mt-6 flex items-center justify-center gap-2"
                            style={{ background: "#8C1F1F" }}
                            onMouseEnter={(e) => e.target.style.background = "#6d1717"}
                            onMouseLeave={(e) => e.target.style.background = "#8C1F1F"}
                        >
                            <Lock size={20} />
                            Ingresar al Panel
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <p className="text-center text-slate-500 text-xs">
                            Grupo Argentilia © 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
