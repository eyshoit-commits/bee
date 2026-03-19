'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Database, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Activity, 
  Play, 
  Square, 
  RefreshCw, 
  X, 
  Maximize2, 
  Minimize2, 
  Search, 
  ChevronRight,
  History,
  Trash2,
  Download,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'exec' | 'system';
  content: string;
  timestamp: string;
}

export const TerminalSurface = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'BEE HIVE Swarm Intelligence OS v2.4.0-stable', timestamp: '14:20:01' },
    { id: '2', type: 'system', content: 'Copyright (c) 2026 BEE HIVE Corp. All rights reserved.', timestamp: '14:20:01' },
    { id: '3', type: 'system', content: 'Initializing core modules...', timestamp: '14:20:02' },
    { id: '4', type: 'success', content: '[OK] SwarmEngine initialized', timestamp: '14:20:03' },
    { id: '5', type: 'success', content: '[OK] Queen-01 connected', timestamp: '14:20:04' },
    { id: '6', type: 'success', content: '[OK] SecurityShield armed', timestamp: '14:20:05' },
    { id: '7', type: 'system', content: 'Welcome operator. Type "help" for available commands.', timestamp: '14:20:06' },
  ]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('main');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLines: TerminalLine[] = [
      { id: Date.now().toString(), type: 'input', content: cmd, timestamp }
    ];

    const command = cmd.toLowerCase().trim();
    const args = command.split(' ');

    switch (args[0]) {
      case 'help':
        newLines.push({ id: (Date.now() + 1).toString(), type: 'output', content: 'Available commands:', timestamp });
        newLines.push({ id: (Date.now() + 2).toString(), type: 'output', content: '  swarm status    - View current swarm status', timestamp });
        newLines.push({ id: (Date.now() + 3).toString(), type: 'output', content: '  swarm deploy    - Initiate swarm deployment', timestamp });
        newLines.push({ id: (Date.now() + 4).toString(), type: 'output', content: '  swarm reboot    - Reboot all nodes', timestamp });
        newLines.push({ id: (Date.now() + 5).toString(), type: 'output', content: '  security scan   - Run a full security scan', timestamp });
        newLines.push({ id: (Date.now() + 6).toString(), type: 'output', content: '  clear           - Clear terminal history', timestamp });
        newLines.push({ id: (Date.now() + 7).toString(), type: 'output', content: '  exit            - Close terminal session', timestamp });
        break;
      case 'swarm':
        if (args[1] === 'status') {
          newLines.push({ id: (Date.now() + 1).toString(), type: 'exec', content: 'Analyzing swarm topology...', timestamp });
          setTimeout(() => {
            setHistory(prev => [...prev, 
              { id: Date.now().toString(), type: 'success', content: '[STATUS] 12 nodes active, 0 errors, 1 warning', timestamp: new Date().toLocaleTimeString() },
              { id: (Date.now()+1).toString(), type: 'output', content: '  - Queen-01: ACTIVE (12% Load)', timestamp: new Date().toLocaleTimeString() },
              { id: (Date.now()+2).toString(), type: 'output', content: '  - Worker-Alpha: ACTIVE (45% Load)', timestamp: new Date().toLocaleTimeString() }
            ]);
          }, 500);
        } else if (args[1] === 'reboot') {
          newLines.push({ id: (Date.now() + 1).toString(), type: 'exec', content: 'Initiating swarm reboot sequence...', timestamp });
          setTimeout(() => {
            setHistory(prev => [...prev, { id: Date.now().toString(), type: 'success', content: '[SUCCESS] Swarm reboot complete.', timestamp: new Date().toLocaleTimeString() }]);
          }, 1500);
        } else {
          newLines.push({ id: (Date.now() + 1).toString(), type: 'error', content: 'Usage: swarm [status|deploy|reboot]', timestamp });
        }
        break;
      case 'security':
        if (args[1] === 'scan') {
          newLines.push({ id: (Date.now() + 1).toString(), type: 'exec', content: 'Running full security scan...', timestamp });
          setTimeout(() => {
            setHistory(prev => [...prev, { id: Date.now().toString(), type: 'success', content: '[SCAN] 0 vulnerabilities found. System secure.', timestamp: new Date().toLocaleTimeString() }]);
          }, 2000);
        } else {
          newLines.push({ id: (Date.now() + 1).toString(), type: 'error', content: 'Usage: security scan', timestamp });
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        break;
      default:
        newLines.push({ id: (Date.now() + 1).toString(), type: 'error', content: `Command not found: ${args[0]}`, timestamp });
    }

    setHistory(prev => [...prev, ...newLines]);
  };

  return (
    <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Terminal <span className="text-neon-green text-sm font-mono animate-pulse">● ROOT</span>
          </h2>
          <div className="flex gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
            {['main', 'debug', 'logs', 'network'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-neon-green text-black glow-green" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setHistory([])} className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors" title="Clear Terminal">
            <Trash2 size={16} />
          </button>
          <button className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors" title="Download Logs">
            <Download size={16} />
          </button>
          <button className="px-4 py-2 rounded-lg bg-neon-green text-black hover:bg-neon-green/90 text-xs font-bold uppercase tracking-wider transition-colors glow-green flex items-center gap-2">
            <Play size={14} fill="currentColor" /> Execute Script
          </button>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/10 bg-black/60 relative">
        {/* Terminal Header */}
        <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-neon-amber/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-neon-green/50" />
            </div>
            <div className="h-4 w-px bg-zinc-800 mx-2" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
              <TerminalIcon size={12} />
              <span>beehive@swarm-control: ~/{activeTab}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-neon-green">
              <Activity size={12} />
              <span>LOAD: 12%</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-neon-cyan">
              <Zap size={12} />
              <span>LATENCY: 12ms</span>
            </div>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 font-mono text-sm overflow-y-auto scrollbar-hide selection:bg-neon-green/30"
        >
          <div className="space-y-1.5">
            {history.map((line) => (
              <div key={line.id} className="flex gap-4 group">
                <span className="text-[10px] text-zinc-700 w-16 shrink-0 mt-1">{line.timestamp}</span>
                <div className={cn(
                  "flex-1 leading-relaxed break-all",
                  line.type === 'input' ? "text-zinc-200" :
                  line.type === 'exec' ? "text-neon-cyan italic" :
                  line.type === 'success' ? "text-neon-green font-bold" :
                  line.type === 'error' ? "text-red-500" :
                  line.type === 'system' ? "text-zinc-500" : "text-zinc-400"
                )}>
                  {line.type === 'input' && (
                    <span className="text-neon-green mr-2 font-bold">beehive@swarm-control:~$</span>
                  )}
                  {line.content}
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 text-zinc-700 hover:text-zinc-400 transition-all">
                  <Copy size={12} />
                </button>
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex gap-4 pt-2">
              <span className="text-[10px] text-zinc-700 w-16 shrink-0 mt-1">{new Date().toLocaleTimeString()}</span>
              <div className="flex-1 flex gap-2">
                <span className="text-neon-green font-bold">beehive@swarm-control:~$</span>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && input.trim()) {
                      handleCommand(input);
                      setInput('');
                    }
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-zinc-200"
                  autoFocus
                />
                {input === '' && (
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-5 bg-neon-green"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between bg-zinc-900/50 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
              SHELL: ZSH
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
              ENCODING: UTF-8
            </div>
          </div>
          <div className="flex gap-4">
            <span>LINES: {history.length}</span>
            <span>MEM: 1.2MB</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex gap-4">
        {[
          { label: 'Check Status', cmd: 'swarm status', icon: Activity },
          { label: 'Run Scan', cmd: 'security scan', icon: ShieldCheck },
          { label: 'Reboot Swarm', cmd: 'swarm reboot', icon: RefreshCw },
          { label: 'Deploy Core', cmd: 'swarm deploy', icon: Zap },
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => handleCommand(action.cmd)}
            className="flex-1 glass-panel p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all group border border-white/5"
          >
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-green/10 group-hover:text-neon-green transition-colors">
              <action.icon size={14} />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-white uppercase tracking-tight">{action.label}</div>
              <div className="text-[8px] font-mono text-zinc-500">{action.cmd}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
