'use client';

import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Key, 
  Activity, 
  Terminal, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const securityLogs = [
  { id: '1', time: '14:25:01', event: 'Intrusion Detection System: Port scan detected', severity: 'high', source: '192.168.1.42', status: 'blocked' },
  { id: '2', time: '14:24:45', event: 'Authentication success: Operator-01', severity: 'low', source: 'Internal', status: 'allowed' },
  { id: '3', time: '14:24:12', event: 'Firewall policy update: Deny all on Port 22', severity: 'medium', source: 'Queen', status: 'applied' },
  { id: '4', time: '14:23:55', event: 'Encryption key rotation: Swarm-Cluster-A', severity: 'medium', source: 'System', status: 'success' },
  { id: '5', time: '14:23:10', event: 'Anomalous traffic pattern: Worker-Gamma', severity: 'high', source: '10.0.0.4', status: 'quarantined' },
  { id: '6', time: '14:22:30', event: 'TLS handshake failure: Node-08', severity: 'low', source: 'External', status: 'rejected' },
];

const SecurityMetric = ({ label, value, status, icon: Icon, color }: any) => (
  <div className="glass-panel p-4 rounded-xl flex items-center gap-4 border border-white/5">
    <div className={cn("p-3 rounded-xl bg-white/5 border border-white/5", color)}>
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">{label}</div>
      <div className="text-lg font-display font-bold text-white tracking-tight">{value}</div>
    </div>
    <div className={cn(
      "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
      status === 'secure' ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-amber/10 text-neon-amber'
    )}>
      {status}
    </div>
  </div>
);

export const SecuritySurface = () => {
  return (
    <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Security Shield <span className="text-neon-cyan text-sm font-mono animate-pulse">● ARMED</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Advanced threat detection and access control management</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors">Audit Logs</button>
          <button className="px-4 py-2 rounded-lg bg-neon-cyan text-black hover:bg-neon-cyan/90 text-xs font-bold uppercase tracking-wider transition-colors glow-cyan">Lockdown Swarm</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SecurityMetric 
          label="Firewall Status" 
          value="Active & Filtering" 
          status="secure" 
          icon={ShieldCheck} 
          color="text-neon-green" 
        />
        <SecurityMetric 
          label="Encryption Level" 
          value="AES-256-GCM" 
          status="secure" 
          icon={Lock} 
          color="text-neon-cyan" 
        />
        <SecurityMetric 
          label="Threat Level" 
          value="Low / Nominal" 
          status="secure" 
          icon={Activity} 
          color="text-neon-green" 
        />
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Terminal size={14} className="text-neon-cyan" /> Security Event Log
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Filter events..."
                  className="bg-black/40 border border-white/10 rounded px-8 py-1 text-[10px] text-zinc-300 focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
              <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-500 transition-colors">
                <Filter size={12} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#0a0a0a] z-10">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Timestamp</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Event</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Severity</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Source</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {securityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-[10px] font-mono text-zinc-500">{log.time}</td>
                    <td className="px-6 py-4 text-xs text-zinc-300 font-medium">{log.event}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter",
                        log.severity === 'high' ? 'bg-red-500/10 text-red-500' : 
                        log.severity === 'medium' ? 'bg-neon-amber/10 text-neon-amber' : 'bg-neon-cyan/10 text-neon-cyan'
                      )}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-mono text-zinc-500">{log.source}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {log.status === 'blocked' || log.status === 'rejected' || log.status === 'quarantined' ? (
                          <XCircle size={12} className="text-red-500" />
                        ) : (
                          <CheckCircle2 size={12} className="text-neon-green" />
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{log.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-80 flex flex-col gap-4">
          <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Access Control</h3>
            <div className="space-y-3">
              {[
                { name: 'Queen-01', role: 'Super Admin', status: 'online' },
                { name: 'Operator-Alpha', role: 'Maintainer', status: 'online' },
                { name: 'Operator-Beta', role: 'Viewer', status: 'offline' },
                { name: 'Sentinel-X', role: 'Security Bot', status: 'online' },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", user.status === 'online' ? 'bg-neon-green animate-pulse' : 'bg-zinc-700')} />
                    <div>
                      <div className="text-xs font-bold text-zinc-200">{user.name}</div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-tighter">{user.role}</div>
                    </div>
                  </div>
                  <button className="p-1 hover:text-neon-cyan text-zinc-600 transition-colors">
                    <MoreVertical size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase tracking-wider transition-colors">Manage Permissions</button>
          </div>

          <div className="glass-panel rounded-xl p-5 flex-1 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Threat Intelligence</h3>
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mb-4 relative">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-neon-cyan/30"
                />
                <ShieldCheck size={32} className="text-neon-cyan" />
              </div>
              <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-tight">Active Monitoring</h4>
              <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                Sentinel-X is currently scanning 1,242 nodes for vulnerabilities and anomalous patterns.
              </p>
              <div className="mt-6 w-full space-y-2">
                <div className="flex justify-between text-[9px] uppercase font-bold">
                  <span className="text-zinc-500">Scan Progress</span>
                  <span className="text-neon-cyan">84%</span>
                </div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    className="h-full bg-neon-cyan glow-cyan"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
