'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Code2, 
  Activity, 
  Users, 
  Settings, 
  Terminal, 
  Search, 
  Bell, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  History,
  ChevronRight,
  ChevronLeft,
  Play,
  Square,
  RefreshCw,
  Bug,
  Database,
  Globe,
  Lock,
  MessageSquare,
  FileCode,
  FolderTree,
  Layers,
  MoreVertical,
  Maximize2,
  Minimize2,
  X,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Interfaces ---

interface Session {
  id: string;
  name: string;
  icon: any;
  activeFiles: string[];
  currentFile: string;
  terminalHistory: { type: string; content: string }[];
  tasks: { task: string; status: string; progress: number }[];
  color: 'green' | 'cyan' | 'orange' | 'magenta';
  timestamp: string;
}

// --- Components ---

const IconButton = ({ icon: Icon, active, onClick, className, glow }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "p-2 rounded-lg transition-all duration-200 relative group",
      active ? "text-neon-green bg-neon-green/10" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5",
      glow && active && "glow-green",
      className
    )}
  >
    <Icon size={20} />
    {active && (
      <motion.div 
        layoutId="active-indicator"
        className="absolute -left-1 top-2 bottom-2 w-0.5 bg-neon-green rounded-full"
      />
    )}
  </button>
);

const StatusBadge = ({ status }: { status: 'active' | 'idle' | 'error' | 'warning' }) => {
  const colors = {
    active: 'bg-neon-green text-black',
    idle: 'bg-zinc-800 text-zinc-400',
    error: 'bg-red-500 text-white',
    warning: 'bg-neon-amber text-black',
  };
  
  return (
    <div className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", colors[status])}>
      {status}
    </div>
  );
};

// --- Mission Control Surface ---

const MissionControl = () => {
  return (
    <div className="flex-1 flex gap-4 p-4 overflow-hidden">
      {/* Left Rail: Bees & Environments */}
      <div className="w-64 flex flex-col gap-4">
        <div className="glass-panel rounded-xl p-4 flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Bees</h3>
            <Users size={14} className="text-neon-green" />
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
            {[
              { name: 'Queen-01', type: 'Orchestrator', status: 'active', load: '12%' },
              { name: 'Worker-Alpha', type: 'Frontend', status: 'active', load: '45%' },
              { name: 'Worker-Beta', type: 'Backend', status: 'idle', load: '0%' },
              { name: 'Worker-Gamma', type: 'Database', status: 'active', load: '88%' },
              { name: 'Sentinel-X', type: 'Security', status: 'warning', load: '92%' },
            ].map((bee, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-neon-green/30 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-neon-green transition-colors">{bee.name}</span>
                  <StatusBadge status={bee.status as any} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-mono">
                  <span>{bee.type}</span>
                  <span>Load: {bee.load}</span>
                </div>
                <div className="mt-2 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: bee.load }}
                    className={cn("h-full", bee.status === 'warning' ? 'bg-neon-amber' : 'bg-neon-green')}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 h-48 flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Environments</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2 rounded bg-neon-green/5 border border-neon-green/20">
              <Globe size={14} className="text-neon-green" />
              <span className="text-xs font-medium text-zinc-200">Production-Cluster-A</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 border border-transparent transition-colors cursor-pointer">
              <Database size={14} className="text-zinc-500" />
              <span className="text-xs font-medium text-zinc-400">Staging-DB-Mirror</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Orchestration Timeline & VM Lifecycle */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="glass-panel rounded-xl flex-1 p-6 flex flex-col gap-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Zap size={200} className="text-neon-green" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                Queen Activity <span className="text-neon-green text-sm font-mono animate-pulse">● LIVE</span>
              </h2>
              <p className="text-sm text-zinc-500 mt-1">Real-time swarm orchestration and task distribution</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors">Export Logs</button>
              <button className="px-4 py-2 rounded-lg bg-neon-green text-black hover:bg-neon-green/90 text-xs font-bold uppercase tracking-wider transition-colors glow-green">Optimize Swarm</button>
            </div>
          </div>

          <div className="flex-1 border border-white/5 rounded-xl bg-black/20 p-4 overflow-hidden flex flex-col">
            <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
              <div className="flex-1 h-2 bg-zinc-800 rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-neon-green/50 to-transparent"
                />
              </div>
              <span className="text-[10px] font-mono text-neon-green">SYNCING_STATE_0x4F2</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
              {[
                { time: '14:20:01', bee: 'Queen', action: 'Initiating swarm re-balance', status: 'success' },
                { time: '14:20:05', bee: 'Alpha', action: 'Compiling core-module.ts', status: 'active' },
                { time: '14:20:12', bee: 'Gamma', action: 'Scaling database shard-02', status: 'success' },
                { time: '14:20:18', bee: 'Beta', action: 'Refactoring auth-middleware.go', status: 'active' },
                { time: '14:20:25', bee: 'Sentinel', action: 'Security scan: 0 vulnerabilities found', status: 'success' },
                { time: '14:20:30', bee: 'Queen', action: 'Deploying to staging-cluster', status: 'active' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-[10px] font-mono text-zinc-600 mt-1">{log.time}</span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neon-green uppercase tracking-tighter">[{log.bee}]</span>
                      <span className="text-sm text-zinc-300">{log.action}</span>
                    </div>
                    {log.status === 'active' && (
                      <div className="h-0.5 w-full bg-zinc-800 rounded-full mt-1 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          className="h-full bg-neon-cyan"
                        />
                      </div>
                    )}
                  </div>
                  {log.status === 'success' ? (
                    <CheckCircle2 size={14} className="text-neon-green mt-1" />
                  ) : (
                    <RefreshCw size={14} className="text-neon-cyan animate-spin mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-48 glass-panel rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Audit Log</h3>
            <History size={14} className="text-zinc-500" />
          </div>
          <div className="flex-1 font-mono text-[10px] text-zinc-500 overflow-y-auto space-y-1">
            <div>[SYSTEM] Swarm version 2.4.0-stable initialized</div>
            <div>[AUTH] User eysho.it@gmail.com session verified</div>
            <div className="text-neon-cyan">[VM] Spawning instance i-0f42b9... OK</div>
            <div>[NETWORK] Latency: 12ms | Throughput: 4.2GB/s</div>
            <div className="text-neon-amber">[WARN] High memory pressure on Worker-Gamma</div>
            <div>[SYSTEM] Auto-scaling triggered for Database group</div>
          </div>
        </div>
      </div>

      {/* Right Rail: Governance & Policy */}
      <div className="w-80 flex flex-col gap-4">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <ShieldCheck size={14} className="text-neon-cyan" /> Governance
          </h3>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-400 uppercase">Incident #402</span>
                <AlertCircle size={14} className="text-red-500" />
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">Memory leak detected in production shard. Queen suggests immediate rollback.</p>
              <button className="mt-3 w-full py-1.5 rounded bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">Approve Rollback</button>
            </div>
            
            <div className="p-3 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neon-cyan uppercase">Policy Gate</span>
                <Lock size={14} className="text-neon-cyan" />
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">PR #124 requires manual approval for security compliance.</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors">Deny</button>
                <button className="flex-1 py-1.5 rounded bg-neon-cyan text-black text-[10px] font-bold uppercase tracking-wider hover:bg-neon-cyan/90 transition-colors">Approve</button>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex-1 flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Incidents</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center mb-3">
              <CheckCircle2 size={24} className="text-neon-green" />
            </div>
            <h4 className="text-sm font-bold text-zinc-200">All Systems Nominal</h4>
            <p className="text-xs text-zinc-500 mt-1">No critical incidents reported in the last 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Workbench Surface ---

const Workbench = ({ sessions, activeSessionId, onSaveSession, onLoadSession }: { 
  sessions: Session[], 
  activeSessionId: string, 
  onSaveSession: (name: string) => void,
  onLoadSession: (id: string) => void 
}) => {
  const [activeFile, setActiveFile] = useState('app/core/engine.ts');
  const [explorerTab, setExplorerTab] = useState<'files' | 'sessions'>('files');
  
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const sessionColorClass = activeSession?.color === 'orange' ? 'text-neon-orange' : 
                          activeSession?.color === 'magenta' ? 'text-neon-magenta' : 
                          activeSession?.color === 'cyan' ? 'text-neon-cyan' : 'text-neon-green';
  const sessionGlowClass = activeSession?.color === 'orange' ? 'glow-orange' : 
                         activeSession?.color === 'magenta' ? 'glow-magenta' : 
                         activeSession?.color === 'cyan' ? 'glow-cyan' : 'glow-green';

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* File Explorer / Sessions */}
      <div className="w-64 border-r border-white/5 flex flex-col bg-[#080808]">
        <div className="flex border-b border-white/5">
          <button 
            onClick={() => setExplorerTab('files')}
            className={cn(
              "flex-1 p-3 text-[10px] font-bold uppercase tracking-widest transition-colors",
              explorerTab === 'files' ? "text-zinc-200 border-b-2 border-neon-green" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Files
          </button>
          <button 
            onClick={() => setExplorerTab('sessions')}
            className={cn(
              "flex-1 p-3 text-[10px] font-bold uppercase tracking-widest transition-colors",
              explorerTab === 'sessions' ? "text-zinc-200 border-b-2 border-neon-magenta" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Sessions
          </button>
        </div>

        {explorerTab === 'files' ? (
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {[
              { name: 'app', type: 'folder', open: true },
              { name: 'core', type: 'folder', open: true, indent: 1 },
              { name: 'engine.ts', type: 'file', indent: 2, active: activeFile === 'app/core/engine.ts' },
              { name: 'swarm.ts', type: 'file', indent: 2, active: activeFile === 'app/swarm.ts' },
              { name: 'types.d.ts', type: 'file', indent: 2, active: activeFile === 'app/types.d.ts' },
              { name: 'lib', type: 'folder', indent: 1 },
              { name: 'components', type: 'folder', indent: 1 },
              { name: 'package.json', type: 'file' },
              { name: 'tsconfig.json', type: 'file' },
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={() => item.type === 'file' && setActiveFile(item.name)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded text-xs cursor-pointer transition-colors",
                  item.active ? "bg-neon-green/10 text-neon-green" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
                style={{ paddingLeft: `${(item.indent || 0) * 12 + 8}px` }}
              >
                {item.type === 'folder' ? (
                  <ChevronRight size={14} className={cn("transition-transform", item.open && "rotate-90")} />
                ) : (
                  <FileCode size={14} className={item.active ? "text-neon-green" : "text-zinc-500"} />
                )}
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <button 
              onClick={() => onSaveSession(`Session ${sessions.length + 1}`)}
              className="w-full py-2 rounded bg-neon-magenta/10 border border-neon-magenta/30 text-neon-magenta text-[10px] font-bold uppercase tracking-wider hover:bg-neon-magenta/20 transition-all mb-4"
            >
              + Save Current Session
            </button>
            
            {sessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => onLoadSession(session.id)}
                className={cn(
                  "p-3 rounded-lg border transition-all cursor-pointer group",
                  session.id === activeSessionId 
                    ? `bg-zinc-900 border-neon-magenta/50 ${session.color === 'magenta' ? 'glow-magenta' : 'glow-orange'}` 
                    : "bg-white/5 border-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <session.icon 
                      size={14} 
                      className={cn(
                        session.id === activeSessionId 
                          ? (session.color === 'magenta' ? "text-neon-magenta" : "text-neon-orange") 
                          : "text-zinc-500"
                      )} 
                    />
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-tight",
                      session.id === activeSessionId ? "text-white" : "text-zinc-400"
                    )}>
                      {session.name}
                    </span>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    session.color === 'magenta' ? "bg-neon-magenta" : 
                    session.color === 'orange' ? "bg-neon-orange" : 
                    session.color === 'cyan' ? "bg-neon-cyan" : "bg-neon-green"
                  )} />
                </div>
                <div className="flex items-center justify-between text-[9px] text-zinc-500 uppercase font-mono">
                  <span>{session.activeFiles.length} Files</span>
                  <span>{session.timestamp}</span>
                </div>
                {session.id === activeSessionId && (
                  <div className="mt-2 text-[9px] text-neon-magenta font-bold uppercase tracking-widest animate-pulse">
                    Active Session
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
        {/* Tabs */}
        <div className="h-10 border-b border-white/5 flex bg-[#0a0a0a]">
          {(activeSession?.activeFiles || ['engine.ts', 'swarm.ts', 'types.d.ts']).map((tabName, i) => (
            <div 
              key={i}
              className={cn(
                "flex items-center gap-2 px-4 border-r border-white/5 text-[11px] cursor-pointer transition-all relative",
                activeFile.includes(tabName) ? "bg-[#050505] text-neon-green" : "text-zinc-500 hover:bg-white/5"
              )}
            >
              <FileCode size={12} />
              <span>{tabName}</span>
              <X size={10} className="ml-2 hover:text-white" />
              {activeFile.includes(tabName) && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-neon-green" />
              )}
            </div>
          ))}
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex overflow-hidden font-mono text-sm">
          {/* Gutters */}
          <div className="w-12 bg-[#080808] border-r border-white/5 flex flex-col items-center py-4 text-zinc-600 select-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="h-6 flex items-center justify-center w-full">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code Area */}
          <div className="flex-1 p-4 overflow-y-auto scrollbar-hide relative">
            <div className="space-y-1">
              <div className="h-6 flex items-center"><span className="text-neon-blue">import</span><span className="text-white ml-2">{"{ SwarmEngine, Bee }"}</span><span className="text-neon-blue ml-2">from</span><span className="text-neon-amber ml-2">&apos;@beehive/core&apos;</span>;</div>
              <div className="h-6 flex items-center"><span className="text-neon-blue">import</span><span className="text-white ml-2">{"{ Queen }"}</span><span className="text-neon-blue ml-2">from</span><span className="text-neon-amber ml-2">&apos;./queen&apos;</span>;</div>
              <div className="h-6"></div>
              <div className="h-6 flex items-center"><span className="text-zinc-500 italic">{"// Initialize the swarm orchestration engine"}</span></div>
              <div className="h-6 flex items-center"><span className="text-neon-blue">export class</span><span className="text-neon-cyan ml-2">HiveEngine</span><span className="text-white ml-2">{"{"}</span></div>
              <div className="h-6 flex items-center ml-4"><span className="text-neon-blue">private</span><span className="text-white ml-2">queen: Queen;</span></div>
              <div className="h-6 flex items-center ml-4"><span className="text-neon-blue">private</span><span className="text-white ml-2">bees: Bee[] = [];</span></div>
              <div className="h-6"></div>
              <div className="h-6 flex items-center ml-4"><span className="text-neon-blue">constructor</span><span className="text-white ml-2">(config: SwarmConfig) {"{"}</span></div>
              <div className="h-6 flex items-center ml-8"><span className="text-neon-blue">this</span><span className="text-white">.queen = </span><span className="text-neon-blue">new</span><span className="text-neon-cyan ml-2">Queen</span><span className="text-white">(config.queenId);</span></div>
              <div className="h-6 flex items-center ml-4"><span className="text-white">{"}"}</span></div>
              <div className="h-6"></div>
              <div className="h-6 flex items-center ml-4 bg-neon-green/5 border-l-2 border-neon-green -ml-4 pl-4"><span className="text-neon-blue">async</span><span className="text-neon-cyan ml-2">deploySwarm</span><span className="text-white">(target: Environment): </span><span className="text-neon-cyan">Promise</span><span className="text-white">{"<void> {"}</span></div>
              <div className="h-6 flex items-center ml-8"><span className="text-neon-blue">await</span><span className="text-neon-blue">this</span><span className="text-white">.queen.</span><span className="text-neon-cyan">broadcast</span><span className="text-white">(&apos;DEPLOY_INIT&apos;, target);</span></div>
              <div className="h-6 flex items-center ml-8"><span className="text-neon-blue">for</span><span className="text-white ml-2">(</span><span className="text-neon-blue">const</span><span className="text-white ml-2">bee </span><span className="text-neon-blue">of</span><span className="text-neon-blue">this</span><span className="text-white">.bees) {"{"}</span></div>
              <div className="h-6 flex items-center ml-12"><span className="text-neon-blue">await</span><span className="text-white ml-2">bee.</span><span className="text-neon-cyan">provision</span><span className="text-white">(target.specs);</span></div>
              <div className="h-6 flex items-center ml-8"><span className="text-white">{"}"}</span></div>
              <div className="h-6 flex items-center ml-4"><span className="text-white">{"}"}</span></div>
              <div className="h-6 flex items-center"><span className="text-white">{"}"}</span></div>
            </div>
            
            {/* Minimap Mockup */}
            <div className="absolute top-4 right-4 w-24 h-64 bg-white/5 rounded border border-white/5 opacity-40 pointer-events-none overflow-hidden">
              <div className="w-full h-full p-1 space-y-0.5">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className={cn("h-0.5 rounded-full", i % 5 === 0 ? "bg-neon-blue w-2/3" : "bg-zinc-700 w-full")} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Terminal */}
        <div className="h-48 border-t border-white/5 flex flex-col bg-[#080808]">
          <div className="px-4 py-2 flex items-center gap-6 border-b border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-green border-b-2 border-neon-green pb-1">
              <Terminal size={12} /> Terminal
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 cursor-pointer pb-1">
              <Bug size={12} /> Debug Console
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 cursor-pointer pb-1">
              <Layers size={12} /> Output
            </div>
          </div>
          <div className="flex-1 p-4 font-mono text-xs text-zinc-400 overflow-y-auto">
            <div className="flex gap-2">
              <span className="text-neon-green">beehive@swarm-control:~$</span>
              <span>npm run deploy:swarm --cluster=prod-alpha</span>
            </div>
            <div className="mt-2 text-zinc-500">{"[INFO]"} Connecting to Queen-01...</div>
            <div className="text-zinc-500">{"[INFO]"} Authenticating with cluster credentials...</div>
            <div className="text-neon-cyan">{"[EXEC]"} Spawning 12 worker bees across 3 regions...</div>
            <div className="text-zinc-500">{"[INFO]"} Region: us-east-1 [4/4] OK</div>
            <div className="text-zinc-500">{"[INFO]"} Region: eu-west-1 [4/4] OK</div>
            <div className="text-zinc-500">{"[INFO]"} Region: ap-south-1 [4/4] OK</div>
            <div className="mt-1 text-neon-green font-bold">{"[SUCCESS]"} Swarm deployment complete. 12/12 bees active.</div>
            <div className="flex gap-2 mt-2">
              <span className="text-neon-green">beehive@swarm-control:~$</span>
              <span className="w-2 h-4 bg-neon-green animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Rail: Queen Chat & Tasks */}
      <div className="w-80 border-l border-white/5 flex flex-col bg-[#080808]">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green glow-green" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Queen Chat</span>
          </div>
          <MoreVertical size={14} className="text-zinc-500" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neon-green/20 flex items-center justify-center">
                <Zap size={12} className="text-neon-green" />
              </div>
              <span className="text-[10px] font-bold text-neon-green uppercase tracking-tighter">Queen</span>
              <span className="text-[10px] text-zinc-600">14:25</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-zinc-300 leading-relaxed">
              I&apos;ve analyzed the core engine logic. We should implement a more aggressive retry strategy for the worker provisioning phase. Would you like me to generate the code for that?
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-600">14:26</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Operator</span>
            </div>
            <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20 text-xs text-neon-green leading-relaxed">
              Yes, please. Also ensure it handles timeout exceptions gracefully.
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Active Tasks</h4>
            <div className="space-y-2">
              {[
                { task: 'Implement retry logic', status: 'active', progress: 40 },
                { task: 'Refactor auth middleware', status: 'pending', progress: 0 },
                { task: 'Update swarm types', status: 'completed', progress: 100 },
              ].map((task, i) => (
                <div key={i} className="p-2 rounded bg-white/5 border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-300">{task.task}</span>
                    {task.status === 'completed' ? (
                      <CheckCircle2 size={12} className="text-neon-green" />
                    ) : task.status === 'active' ? (
                      <RefreshCw size={12} className="text-neon-cyan animate-spin" />
                    ) : (
                      <Clock size={12} className="text-zinc-600" />
                    )}
                  </div>
                  {task.status !== 'pending' && (
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        className={cn("h-full", task.status === 'completed' ? 'bg-neon-green' : 'bg-neon-cyan')}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="relative">
            <textarea 
              placeholder="Message Queen..."
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-zinc-300 focus:outline-none focus:border-neon-green/50 transition-colors resize-none h-20"
            />
            <button className="absolute bottom-2 right-2 p-1.5 rounded bg-neon-green text-black hover:bg-neon-green/90 transition-colors">
              <Play size={12} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Layout ---

export default function BeeHiveApp() {
  const [activeSurface, setActiveSurface] = useState<'mission' | 'workbench'>('mission');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 's1',
      name: 'Swarm Core Refactor',
      icon: Settings,
      activeFiles: ['engine.ts', 'swarm.ts'],
      currentFile: 'engine.ts',
      terminalHistory: [],
      tasks: [],
      color: 'magenta',
      timestamp: '2m ago'
    },
    {
      id: 's2',
      name: 'Auth Security Audit',
      icon: ShieldCheck,
      activeFiles: ['types.d.ts'],
      currentFile: 'types.d.ts',
      terminalHistory: [],
      tasks: [],
      color: 'orange',
      timestamp: '1h ago'
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string>('s1');

  const handleSaveSession = (name: string) => {
    const newSession: Session = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      icon: Code2,
      activeFiles: ['engine.ts', 'swarm.ts', 'types.d.ts'],
      currentFile: 'engine.ts',
      terminalHistory: [],
      tasks: [],
      color: sessions.length % 2 === 0 ? 'cyan' : 'orange',
      timestamp: 'Just now'
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const handleLoadSession = (id: string) => {
    setActiveSessionId(id);
  };
  
  return (
    <div className="h-screen w-screen flex flex-col bg-[#050505] font-sans selection:bg-neon-green/30">
      {/* Top Bar: Shared Status Strip */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a] z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center glow-green group-hover:scale-110 transition-transform">
              <Zap size={20} className="text-black" fill="currentColor" />
            </div>
            <h1 className="text-xl font-display font-bold text-white tracking-tighter">BEE HIVE</h1>
          </div>
          
          <nav className="flex gap-1 bg-zinc-900/50 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveSurface('mission')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                activeSurface === 'mission' ? "bg-neon-green text-black glow-green" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <LayoutDashboard size={14} /> Mission Control
            </button>
            <button 
              onClick={() => setActiveSurface('workbench')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                activeSurface === 'workbench' ? "bg-neon-green text-black glow-green" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Code2 size={14} /> Workbench
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-400">SWARM_UP</span>
            </div>
            <div className="w-px h-3 bg-zinc-800" />
            {activeSessionId && (
              <>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    sessions.find(s => s.id === activeSessionId)?.color === 'magenta' ? "bg-neon-magenta glow-magenta" : 
                    sessions.find(s => s.id === activeSessionId)?.color === 'orange' ? "bg-neon-orange glow-orange" : "bg-neon-cyan glow-cyan"
                  )} />
                  <span className="text-[10px] font-mono text-zinc-200 uppercase tracking-widest">
                    {sessions.find(s => s.id === activeSessionId)?.name}
                  </span>
                </div>
                <div className="w-px h-3 bg-zinc-800" />
              </>
            )}
            <div className="flex items-center gap-2">
              <Cpu size={12} className="text-neon-cyan" />
              <span className="text-[10px] font-mono text-zinc-400">CPU: 24%</span>
            </div>
            <div className="w-px h-3 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-neon-amber" />
              <span className="text-[10px] font-mono text-zinc-400">MEM: 4.2GB</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <IconButton icon={Search} />
            <IconButton icon={Bell} className="relative">
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-black" />
            </IconButton>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-neon-cyan p-0.5 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <Image 
                  src="https://picsum.photos/seed/operator/100/100" 
                  alt="User" 
                  width={100} 
                  height={100} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Global Rail */}
        <aside className={cn(
          "border-r border-white/5 bg-[#080808] flex flex-col items-center py-4 gap-4 transition-all duration-300 z-40",
          isSidebarCollapsed ? "w-16" : "w-16"
        )}>
          <IconButton icon={LayoutDashboard} active={activeSurface === 'mission'} onClick={() => setActiveSurface('mission')} />
          <IconButton icon={Code2} active={activeSurface === 'workbench'} onClick={() => setActiveSurface('workbench')} />
          <IconButton icon={Activity} />
          <IconButton icon={Users} />
          <IconButton icon={ShieldCheck} />
          <div className="mt-auto flex flex-col gap-4">
            <IconButton icon={Settings} />
            <IconButton icon={Terminal} />
          </div>
        </aside>

        {/* Surface Container */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSurface}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {activeSurface === 'mission' ? (
                <MissionControl />
              ) : (
                <Workbench 
                  sessions={sessions} 
                  activeSessionId={activeSessionId} 
                  onSaveSession={handleSaveSession}
                  onLoadSession={handleLoadSession}
                />
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Global Background Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/5 blur-[120px] pointer-events-none" />
        </main>
      </div>
      
      {/* Footer Status Bar */}
      <footer className="h-6 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between px-3 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-neon-green">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green glow-green" />
            CONNECTED: SWARM-CLUSTER-01
          </div>
          <div className="flex items-center gap-1.5">
            <Globe size={10} /> REGION: EU-WEST-3
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={10} /> LATENCY: 12MS
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>UTF-8</div>
          <div>TYPESCRIPT</div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <CheckCircle2 size={10} className="text-neon-green" /> NO ISSUES
          </div>
        </div>
      </footer>
    </div>
  );
}
