import { Layout } from "../components/Layout";
import { mockSettings } from "../data/mockData";
import { Save, RefreshCw, Shield, Globe, Bell, Database } from "lucide-react";
import { useState } from "react";

function Settings() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    const SettingSection = ({ title, icon, children }) => (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b border-slate-200 px-8 py-6 flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            </div>
            <div className="p-8">{children}</div>
        </div>
    );

    const SettingItem = ({ label, value }) => (
        <div className="pb-6 border-b border-slate-100 last:border-0 last:pb-0 flex items-center justify-between">
            <div>
                <p className="font-semibold text-slate-800">{label}</p>
                <p className="text-sm text-slate-500 mt-1">Valor actual del sistema</p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-700 text-sm">{value}</p>
            </div>
        </div>
    );

    return (
        <Layout>
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 mb-2">Configuración del Sistema</h1>
                        <p className="text-slate-600">Ajusta las preferencias y parámetros globales</p>
                    </div>
                </div>

                {/* Configuración de Respaldos */}
                <SettingSection title="Respaldos" icon={<Database size={20} className="text-slate-600" />}>
                    <div className="space-y-6">
                        <SettingItem label="Frecuencia de Respaldo" value={mockSettings.backup.frequency} />
                        <SettingItem label="Hora de Ejecución" value={mockSettings.backup.time} />
                        <SettingItem label="Retención de Datos" value={mockSettings.backup.retention} />
                        <SettingItem label="Compresión" value={mockSettings.backup.compression} />
                    </div>
                </SettingSection>

                {/* Configuración de Seguridad */}
                <SettingSection title="Seguridad" icon={<Shield size={20} className="text-slate-600" />}>
                    <div className="space-y-6 mb-6">
                        <SettingItem label="Cifrado" value={mockSettings.security.encryption} />
                        <SettingItem label="Autenticación Doble Factor" value={mockSettings.security.twoFactor} />
                        <SettingItem label="Política de Contraseña" value={mockSettings.security.passwordPolicy} />
                        <SettingItem label="Tiempo de Sesión" value={mockSettings.security.sessionTimeout} />
                    </div>
                </SettingSection>

                {/* Configuración de Red */}
                <SettingSection title="Red" icon={<Globe size={20} className="text-slate-600" />}>
                    <div className="space-y-6 mb-6">
                        <SettingItem label="Límite de Ancho de Banda" value={mockSettings.network.bandwidthLimit} />
                        <SettingItem label="Protocolo" value={mockSettings.network.protocol} />
                        <SettingItem label="Proxies" value={mockSettings.network.proxies} />
                        <SettingItem label="Servidor DNS" value={mockSettings.network.dns} />
                    </div>
                </SettingSection>

                {/* Configuración de Notificaciones */}
                <SettingSection title="Notificaciones" icon={<Bell size={20} className="text-slate-600" />}>
                    <div className="space-y-6">
                        {[
                            { label: "Notificaciones por Email", key: "email" },
                            { label: "Alertas de Backup", key: "backup" },
                            { label: "Alertas de Error", key: "errors" },
                            { label: "Informe Semanal", key: "summary" },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between pb-6 border-b border-slate-100 last:border-0">
                                <div>
                                    <p className="font-semibold text-slate-800">{item.label}</p>
                                    <p className="text-sm text-slate-500 mt-1">Recibir notificaciones por este canal</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        defaultChecked={mockSettings.notifications[item.key]}
                                        className="w-6 h-6 rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </SettingSection>

                {/* Botones de acción */}
                <div className="mt-8 flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition ${
                            isSaving ? "bg-green-600 hover:bg-green-700 opacity-80" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        <Save size={20} />
                        {isSaving ? "Guardando..." : "Guardar Cambios"}
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition">
                        <RefreshCw size={20} />
                        Restaurar Predeterminados
                    </button>
                </div>

                {/* Nota */}
                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <p className="text-amber-900 text-sm">
                        <span className="font-bold">⚠️ Nota importante:</span> Algunos cambios requieren reiniciar el servicio para aplicarse. Haz clic en "Guardar Cambios" para aplicar cualquier modificación.
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Settings;
