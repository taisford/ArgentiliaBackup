import { Layout } from "../components/Layout";
import { Terminal as TerminalIcon, Circle, Cpu, Server } from "lucide-react";

const terminalLines = [
    { command: "ssh admin@192.168.1.100", output: "Authenticating...\nPassword: ********\nWelcome to Servidor-Backup" },
    { command: "sudo systemctl status backup.service", output: "● backup.service - Backup Scheduler\n     Loaded: loaded (/etc/systemd/system/backup.service; enabled)\n     Active: active (running) since Thu 2024-04-04 02:00:12; 2 days ago\n       Docs: https://example.com/backup-docs" },
    { command: "tail -n 8 /var/log/backup.log", output: "[2024-04-06 14:28:04] INFO: Respaldo completo para GA-103\n[2024-04-06 14:27:12] WARN: Latencia de red 220ms\n[2024-04-06 14:26:01] INFO: Inicio de escaneo de archivos" },
    { command: "df -h /backup", output: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda2       1.0T  652G  348G  66% /backup" },
    { command: "exit", output: "logout\nConnection to 192.168.1.100 closed." },
];

function Terminal() {
    return (
        <Layout>
            <div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 mb-2">Consola de Administración</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 text-slate-700">
                            <Server size={16} /> srv-backup
                        </span>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 bg-slate-900 border-b border-slate-800">
                        <p className="text-sm text-slate-400 ml-3">Terminal: admin@192.168.7.1</p>
                    </div>
                    <div className="p-6 font-mono text-sm leading-6 space-y-4">
                        {terminalLines.map((entry, idx) => (
                            <div key={idx}>
                                <p><span className="text-emerald-400">admin@backup</span>:<span className="text-sky-400">~</span>$ {entry.command}</p>
                                <pre className="mt-2 whitespace-pre-wrap text-slate-300">{entry.output}</pre>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Terminal;
