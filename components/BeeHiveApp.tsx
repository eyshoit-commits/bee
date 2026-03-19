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
  FileCode,
  Layers,
  MoreVertical,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Surface Imports ---
import { MissionControlSurface } from './MissionControlSurface';
import { AnalyticsSurface } from './AnalyticsSurface';
import { SecuritySurface } from './SecuritySurface';
import { SettingsSurface } from './SettingsSurface';
import { TerminalSurface } from './TerminalSurface';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Interfaces ---

interface SwarmNode {
  id: string;
  label: string;
  type: string;
  status: 'active' | 'idle' | 'warning' | 'error';
  x: number;
  y: number;
  cpu: string;
  memory: string;
  activeConnections: number;
}

interface SwarmConnection {
  id: string;
  from: string;
  to: string;
  active: boolean;
}

interface Session {
  id: string;
  name: string;
  description?: string;
  icon: any;
  activeFiles: string[];
  currentFile: string;
  terminalHistory: { type: string; content: string }[];
  tasks: { id: string; task: string; status: string; progress: number }[];
  color: 'green' | 'cyan' | 'orange' | 'magenta' | 'lime' | 'pink' | 'yellow' | 'purple' | 'red' | 'teal' | 'gold' | 'rose' | 'sky' | 'violet' | 'indigo' | 'emerald';
  timestamp: string;
  lastAccessed?: string;
  isAutoSave?: boolean;
  swarmNodes?: SwarmNode[];
  swarmConnections?: SwarmConnection[];
}

// --- Constants ---

const AVAILABLE_ICONS = [
  { icon: Code2, label: 'Code' },
  { icon: Settings, label: 'Core' },
  { icon: ShieldCheck, label: 'Security' },
  { icon: Database, label: 'Data' },
  { icon: Cloud, label: 'Deploy' },
  { icon: Zap, label: 'Fast' },
  { icon: Bug, label: 'Debug' },
  { icon: Cpu, label: 'System' },
  { icon: Activity, label: 'Monitor' },
  { icon: Globe, label: 'Web' },
];

const AVAILABLE_COLORS: Session['color'][] = [
  'green', 'cyan', 'orange', 'magenta', 'lime', 'pink', 'yellow', 'purple', 'red', 'teal', 'gold', 'rose', 'sky', 'violet', 'indigo', 'emerald'
];

// --- Utilities ---

const getColorClass = (color: Session['color']) => {
  switch (color) {
    case 'orange': return 'text-neon-orange';
    case 'magenta': return 'text-neon-magenta';
    case 'cyan': return 'text-neon-cyan';
    case 'lime': return 'text-neon-lime';
    case 'pink': return 'text-neon-pink';
    case 'yellow': return 'text-neon-yellow';
    case 'purple': return 'text-neon-purple';
    case 'red': return 'text-neon-red';
    case 'teal': return 'text-neon-teal';
    case 'gold': return 'text-neon-gold';
    case 'rose': return 'text-neon-rose';
    case 'sky': return 'text-neon-sky';
    case 'violet': return 'text-neon-violet';
    case 'indigo': return 'text-neon-indigo';
    case 'emerald': return 'text-neon-emerald';
    default: return 'text-neon-green';
  }
};

const getGlowClass = (color: Session['color']) => {
  switch (color) {
    case 'orange': return 'glow-orange';
    case 'magenta': return 'glow-magenta';
    case 'cyan': return 'glow-cyan';
    case 'lime': return 'glow-lime';
    case 'pink': return 'glow-pink';
    case 'yellow': return 'glow-yellow';
    case 'purple': return 'glow-purple';
    case 'red': return 'glow-red';
    case 'teal': return 'glow-teal';
    case 'gold': return 'glow-gold';
    case 'rose': return 'glow-rose';
    case 'sky': return 'glow-sky';
    case 'violet': return 'glow-violet';
    case 'indigo': return 'glow-indigo';
    case 'emerald': return 'glow-emerald';
    default: return 'glow-green';
  }
};

const getBgClass = (color: Session['color']) => {
  switch (color) {
    case 'orange': return 'bg-neon-orange';
    case 'magenta': return 'bg-neon-magenta';
    case 'cyan': return 'bg-neon-cyan';
    case 'lime': return 'bg-neon-lime';
    case 'pink': return 'bg-neon-pink';
    case 'yellow': return 'bg-neon-yellow';
    case 'purple': return 'bg-neon-purple';
    case 'red': return 'bg-neon-red';
    case 'teal': return 'bg-neon-teal';
    case 'gold': return 'bg-neon-gold';
    case 'rose': return 'bg-neon-rose';
    case 'sky': return 'bg-neon-sky';
    case 'violet': return 'bg-neon-violet';
    case 'indigo': return 'bg-neon-indigo';
    case 'emerald': return 'bg-neon-emerald';
    default: return 'bg-neon-green';
  }
};

const getBorderClass = (color: Session['color']) => {
  switch (color) {
    case 'orange': return 'border-neon-orange';
    case 'magenta': return 'border-neon-magenta';
    case 'cyan': return 'border-neon-cyan';
    case 'lime': return 'border-neon-lime';
    case 'pink': return 'border-neon-pink';
    case 'yellow': return 'border-neon-yellow';
    case 'purple': return 'border-neon-purple';
    case 'red': return 'border-neon-red';
    case 'teal': return 'border-neon-teal';
    case 'gold': return 'border-neon-gold';
    case 'rose': return 'border-neon-rose';
    case 'sky': return 'border-neon-sky';
    case 'violet': return 'border-neon-violet';
    case 'indigo': return 'border-neon-indigo';
    case 'emerald': return 'border-neon-emerald';
    default: return 'border-neon-green';
  }
};

// --- Components ---

const IconButton = ({ icon: Icon, active, onClick, className, glow, indicatorColor }: any) => (
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
        className={cn(
          "absolute -left-1 top-2 bottom-2 w-0.5 rounded-full",
          indicatorColor ? getBgClass(indicatorColor) : "bg-neon-green"
        )}
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

// --- Swarm Surface ---

const SwarmMap = ({ 
  nodes, 
  connections, 
  onUpdateNodes, 
  onUpdateConnections 
}: { 
  nodes: SwarmNode[], 
  connections: SwarmConnection[],
  onUpdateNodes: (nodes: SwarmNode[]) => void,
  onUpdateConnections: (connections: SwarmConnection[]) => void
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (id: string, info: any) => {
    const newNodes = nodes.map(node => {
      if (node.id === id) {
        return { ...node, x: node.x + info.delta.x, y: node.y + info.delta.y };
      }
      return node;
    });
    onUpdateNodes(newNodes);
  };

  const toggleConnection = (id: string) => {
    onUpdateConnections(connections.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const removeConnection = (id: string) => {
    onUpdateConnections(connections.filter(c => c.id !== id));
  };

  const addConnection = useCallback((from: string, to: string) => {
    if (from === to) return;
    if (connections.some(c => (c.from === from && c.to === to) || (c.from === to && c.to === from))) return;
    
    const newConnection: SwarmConnection = {
      id: `conn-${Date.now()}`,
      from,
      to,
      active: true
    };
    onUpdateConnections([...connections, newConnection]);
    setIsConnecting(null);
  }, [connections, onUpdateConnections]);

  return (
    <div ref={containerRef} className="relative flex-1 bg-black/40 rounded-xl border border-white/5 overflow-hidden cursor-crosshair">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'radial-gradient(circle, #00ff41 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }} />

      {/* Connections Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(conn => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={conn.id} className="group pointer-events-auto cursor-pointer" onClick={() => toggleConnection(conn.id)}>
              <motion.line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={conn.active ? '#00ff41' : '#3f3f46'}
                strokeWidth={conn.active ? 2 : 1}
                strokeDasharray={conn.active ? "0" : "4 4"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: conn.active ? 0.6 : 0.2 }}
                className="transition-all duration-300"
              />
              {/* Invisible wider line for easier clicking */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="transparent"
                strokeWidth={10}
                className="hover:stroke-white/10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  if (e.shiftKey) removeConnection(conn.id);
                  else toggleConnection(conn.id);
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes Layer */}
      {nodes.map(node => (
        <motion.div
          key={node.id}
          drag
          dragMomentum={false}
          onDrag={(e, info) => handleDrag(node.id, info)}
          style={{ x: node.x - 40, y: node.y - 40 }}
          className="absolute w-20 h-20 flex items-center justify-center z-20"
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className={cn(
            "w-12 h-12 rounded-xl border-2 flex items-center justify-center bg-zinc-900 transition-all duration-300 group relative",
            node.status === 'active' ? "border-neon-green glow-green" :
            node.status === 'warning' ? "border-neon-amber glow-orange" :
            node.status === 'error' ? "border-neon-red glow-red" : "border-zinc-700"
          )}>
            <Cpu size={20} className={cn(
              node.status === 'active' ? "text-neon-green" :
              node.status === 'warning' ? "text-neon-amber" :
              node.status === 'error' ? "text-neon-red" : "text-zinc-600"
            )} />
            
            {/* Status Indicator Dot */}
            <div className={cn(
              "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-950",
              node.status === 'active' ? "bg-neon-green animate-pulse" :
              node.status === 'warning' ? "bg-neon-amber" :
              node.status === 'error' ? "bg-neon-red" : "bg-zinc-700"
            )} />

            {/* Connection Trigger */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (isConnecting) {
                  addConnection(isConnecting, node.id);
                } else {
                  setIsConnecting(node.id);
                }
              }}
              className={cn(
                "absolute -bottom-2 left-1/2 -translate-x-1/2 p-1 rounded-full bg-zinc-800 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:text-neon-cyan",
                isConnecting === node.id && "opacity-100 text-neon-cyan scale-110"
              )}
            >
              <Zap size={10} />
            </button>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredNode === node.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute top-full mt-2 w-48 glass-panel p-3 rounded-lg z-50 pointer-events-none"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-white uppercase">{node.label}</span>
                  <StatusBadge status={node.status} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] uppercase tracking-tighter">
                    <span className="text-zinc-500">Type</span>
                    <span className="text-zinc-300">{node.type}</span>
                  </div>
                  <div className="flex justify-between text-[9px] uppercase tracking-tighter">
                    <span className="text-zinc-500">CPU Usage</span>
                    <span className="text-neon-green font-mono">{node.cpu}</span>
                  </div>
                  <div className="flex justify-between text-[9px] uppercase tracking-tighter">
                    <span className="text-zinc-500">Memory</span>
                    <span className="text-neon-cyan font-mono">{node.memory}</span>
                  </div>
                  <div className="flex justify-between text-[9px] uppercase tracking-tighter">
                    <span className="text-zinc-500">Connections</span>
                    <span className="text-zinc-300">{node.activeConnections} active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Connection Mode Indicator */}
      {isConnecting && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan text-[10px] font-bold uppercase tracking-widest animate-pulse">
          Select target node to connect... 
          <button onClick={() => setIsConnecting(null)} className="ml-2 hover:text-white">Cancel</button>
        </div>
      )}
    </div>
  );
};

const SwarmSurface = ({ 
  nodes, 
  connections, 
  onUpdateNodes, 
  onUpdateConnections 
}: { 
  nodes: SwarmNode[], 
  connections: SwarmConnection[],
  onUpdateNodes: (nodes: SwarmNode[]) => void,
  onUpdateConnections: (connections: SwarmConnection[]) => void
}) => {
  return (
    <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Swarm Topology <span className="text-neon-cyan text-sm font-mono animate-pulse">● MAPPED</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Visualizing and managing the distributed intelligence network</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors">Reset Layout</button>
          <button className="px-4 py-2 rounded-lg bg-neon-cyan text-black hover:bg-neon-cyan/90 text-xs font-bold uppercase tracking-wider transition-colors glow-cyan">Add Node</button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <SwarmMap 
          nodes={nodes} 
          connections={connections} 
          onUpdateNodes={onUpdateNodes} 
          onUpdateConnections={onUpdateConnections} 
        />
        
        <div className="w-80 flex flex-col gap-4">
          <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Network Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Nodes', value: nodes.length, color: 'text-white' },
                { label: 'Active', value: nodes.filter(n => n.status === 'active').length, color: 'text-neon-green' },
                { label: 'Connections', value: connections.filter(c => c.active).length, color: 'text-neon-cyan' },
                { label: 'Avg Latency', value: '14ms', color: 'text-neon-amber' },
              ].map((stat, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[9px] text-zinc-500 uppercase mb-1">{stat.label}</div>
                  <div className={cn("text-lg font-bold font-mono", stat.color)}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5 flex-1 flex flex-col gap-4 overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Node Registry</h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
              {nodes.map(node => (
                <div key={node.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-neon-cyan/30 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-neon-cyan transition-colors">{node.label}</span>
                    <StatusBadge status={node.status} />
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>{node.type}</span>
                    <span>{node.cpu} CPU</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Workbench = ({ 
  sessions, 
  activeSessionId, 
  onSaveSession, 
  onLoadSession,
  onDeleteSession,
  onRenameSession,
  activeFiles,
  setActiveFiles,
  currentFile,
  setCurrentFile,
  terminalHistory,
  setTerminalHistory,
  tasks,
  setTasks,
  lastAutoSave
}: { 
  sessions: Session[], 
  activeSessionId: string, 
  onSaveSession: (name: string, color: Session['color'], icon: any, description?: string) => void,
  onLoadSession: (id: string) => void,
  onDeleteSession: (id: string) => void,
  onRenameSession: (id: string, newName: string) => void,
  activeFiles: string[],
  setActiveFiles: React.Dispatch<React.SetStateAction<string[]>>,
  currentFile: string,
  setCurrentFile: React.Dispatch<React.SetStateAction<string>>,
  terminalHistory: Session['terminalHistory'],
  setTerminalHistory: React.Dispatch<React.SetStateAction<Session['terminalHistory']>>,
  tasks: Session['tasks'],
  setTasks: React.Dispatch<React.SetStateAction<Session['tasks']>>,
  lastAutoSave: string | null
}) => {
  const [explorerTab, setExplorerTab] = useState<'files' | 'sessions' | 'history'>('files');
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionDescription, setNewSessionDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState<Session['color']>('magenta');
  const [selectedIcon, setSelectedIcon] = useState<any>(Code2);
  const [terminalInput, setTerminalInput] = useState('');
  const [sessionSearch, setSessionSearch] = useState('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const activeSession = sessions.find(s => s.id === activeSessionId);
  
  const availableIcons = AVAILABLE_ICONS;
  const availableColors = AVAILABLE_COLORS;

  const filteredSessions = sessions.filter(s => 
    s.name.toLowerCase().includes(sessionSearch.toLowerCase()) ||
    s.description?.toLowerCase().includes(sessionSearch.toLowerCase())
  );

  return (
    <div className={cn(
      "flex-1 flex overflow-hidden relative transition-all duration-500",
      activeSession ? `m-2 rounded-2xl border-2 ${getBorderClass(activeSession.color)}/40 ${getGlowClass(activeSession.color)}` : "border-t border-white/5"
    )}>
      {activeSession && (
        <div className={cn("absolute top-0 left-0 right-0 h-[2px] opacity-80 z-10", getBgClass(activeSession.color))} />
      )}
      {/* File Explorer */}
      <div className="w-64 border-r border-white/5 flex flex-col bg-[#080808]">
        <div className="p-3 border-b border-white/5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Explorer</span>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Auto-save</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-500">{lastAutoSave || 'Waiting...'}</span>
            </div>
          </div>
          {[
            { name: 'app', type: 'folder', open: true },
            { name: 'core', type: 'folder', open: true, indent: 1 },
            { name: 'engine.ts', type: 'file', indent: 2, active: currentFile === 'app/core/engine.ts' },
            { name: 'swarm.ts', type: 'file', indent: 2, active: currentFile === 'app/swarm.ts' },
            { name: 'types.d.ts', type: 'file', indent: 2, active: currentFile === 'app/types.d.ts' },
            { name: 'lib', type: 'folder', indent: 1 },
            { name: 'components', type: 'folder', indent: 1 },
            { name: 'package.json', type: 'file' },
            { name: 'tsconfig.json', type: 'file' },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => {
                if (item.type === 'file') {
                  setCurrentFile(`app/${item.indent === 2 ? 'core/' : ''}${item.name}`);
                  if (!activeFiles.includes(item.name)) {
                    setActiveFiles([...activeFiles, item.name]);
                  }
                }
              }}
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
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
        {/* Tabs */}
        <div className="h-10 border-b border-white/5 flex bg-[#0a0a0a]">
          {activeFiles.map((tabName, i) => (
            <div 
              key={i}
              onClick={() => setCurrentFile(tabName)}
              className={cn(
                "flex items-center gap-2 px-4 border-r border-white/5 text-[11px] cursor-pointer transition-all relative",
                currentFile.includes(tabName) ? "bg-[#050505] text-neon-green" : "text-zinc-500 hover:bg-white/5"
              )}
            >
              <FileCode size={12} />
              <span>{tabName}</span>
              <X 
                size={10} 
                className="ml-2 hover:text-white" 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFiles(activeFiles.filter(f => f !== tabName));
                }}
              />
              {currentFile.includes(tabName) && (
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
          <div className="flex-1 p-4 font-mono text-xs text-zinc-400 overflow-y-auto scrollbar-hide">
            {terminalHistory.map((line, i) => (
              <div key={i} className={cn(
                "mb-1",
                line.type === 'input' ? "text-zinc-300" : 
                line.type === 'exec' ? "text-neon-cyan" :
                line.type === 'success' ? "text-neon-green font-bold" : "text-zinc-500"
              )}>
                {line.type === 'input' && <span className="text-neon-green mr-2">beehive@swarm-control:~$</span>}
                {line.content}
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <span className="text-neon-green">beehive@swarm-control:~$</span>
              <input 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && terminalInput.trim()) {
                    setTerminalHistory([...terminalHistory, { type: 'input', content: terminalInput }]);
                    setTerminalInput('');
                    // Mock response
                    setTimeout(() => {
                      setTerminalHistory(prev => [...prev, { type: 'output', content: `[INFO] Executing: ${terminalInput.split(' ')[0]}...` }]);
                    }, 500);
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none text-zinc-300"
                autoFocus
              />
              {terminalInput === '' && <span className="w-2 h-4 bg-neon-green animate-pulse" />}
            </div>
          </div>
        </div>
      </div>

      {/* Right Rail: Queen Chat, Tasks & Sessions */}
      <div className="w-80 border-l border-white/5 flex flex-col bg-[#080808]">
        <div className="flex border-b border-white/5 bg-[#0a0a0a]">
          <button 
            onClick={() => setExplorerTab('files')} // Re-using explorerTab state for right rail tabs
            className={cn(
              "flex-1 p-3 text-[9px] font-bold uppercase tracking-widest transition-all",
              explorerTab === 'files' ? "text-neon-green border-b-2 border-neon-green" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Queen
          </button>
          <button 
            onClick={() => setExplorerTab('sessions')}
            className={cn(
              "flex-1 p-3 text-[9px] font-bold uppercase tracking-widest transition-all",
              explorerTab === 'sessions' ? "text-neon-magenta border-b-2 border-neon-magenta" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Sessions
          </button>
          <button 
            onClick={() => setExplorerTab('history')}
            className={cn(
              "flex-1 p-3 text-[9px] font-bold uppercase tracking-widest transition-all",
              explorerTab === 'history' ? "text-neon-cyan border-b-2 border-neon-cyan" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            History
          </button>
        </div>
        
        {explorerTab === 'files' ? (
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
                {tasks.map((task, i) => (
                  <div 
                    key={i} 
                    className="p-2 rounded bg-white/5 border border-white/5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => {
                      const nextStatus = task.status === 'pending' ? 'active' : task.status === 'active' ? 'completed' : 'pending';
                      const nextProgress = nextStatus === 'completed' ? 100 : nextStatus === 'active' ? 50 : 0;
                      setTasks(tasks.map(t => t.id === task.id ? { ...t, status: nextStatus, progress: nextProgress } : t));
                    }}
                  >
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
        ) : explorerTab === 'sessions' ? (
          <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
            {/* Search Sessions */}
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search sessions..."
                value={sessionSearch}
                onChange={(e) => setSessionSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded p-2 pl-8 text-[10px] text-zinc-300 focus:outline-none focus:border-neon-magenta/50"
              />
            </div>

            {/* Save Session Form */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">New Session</span>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Session Name..."
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded p-2 text-xs text-zinc-300 focus:outline-none focus:border-neon-magenta/50"
                />
                <textarea 
                  placeholder="Description (optional)..."
                  value={newSessionDescription}
                  onChange={(e) => setNewSessionDescription(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded p-2 text-[10px] text-zinc-400 focus:outline-none focus:border-neon-magenta/50 resize-none h-12"
                />
              </div>
              
              <div className="space-y-2">
                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Color</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-4 h-4 rounded-full transition-all",
                        getBgClass(color),
                        selectedColor === color ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">Icon</span>
                <div className="flex flex-wrap gap-2">
                  {availableIcons.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      onClick={() => setSelectedIcon(Icon)}
                      className={cn(
                        "p-1.5 rounded bg-white/5 transition-all hover:bg-white/10",
                        selectedIcon === Icon ? "text-neon-magenta border border-neon-magenta/50" : "text-zinc-500"
                      )}
                      title={label}
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  if (newSessionName.trim()) {
                    onSaveSession(newSessionName, selectedColor, selectedIcon, newSessionDescription);
                    setNewSessionName('');
                    setNewSessionDescription('');
                  }
                }}
                className="w-full py-2 rounded bg-neon-magenta/20 border border-neon-magenta/30 text-neon-magenta text-[10px] font-bold uppercase tracking-wider hover:bg-neon-magenta/30 transition-all"
              >
                Save Session
              </button>
            </div>
            
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Active Sessions</span>
              {filteredSessions.map((session) => (
                <div 
                  key={session.id}
                  className={cn(
                    "p-3 rounded-lg border transition-all cursor-pointer group relative overflow-hidden",
                    session.id === activeSessionId 
                      ? `bg-zinc-900 ${getBorderClass(session.color)} ${getGlowClass(session.color)}` 
                      : "bg-white/5 border-white/5 hover:border-white/20"
                  )}
                >
                  {session.id === activeSessionId && (
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", getBgClass(session.color))} />
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 flex-1" onClick={() => onLoadSession(session.id)}>
                      <div className={cn("w-1 h-4 rounded-full", getBgClass(session.color), getGlowClass(session.color))} />
                      <session.icon 
                        size={14} 
                        className={cn(
                          session.id === activeSessionId 
                            ? getColorClass(session.color)
                            : "text-zinc-500"
                        )} 
                      />
                      {editingSessionId === session.id ? (
                        <input 
                          autoFocus
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onBlur={() => {
                            if (editName.trim()) onRenameSession(session.id, editName);
                            setEditingSessionId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (editName.trim()) onRenameSession(session.id, editName);
                              setEditingSessionId(null);
                            }
                          }}
                          className="bg-black/50 border border-neon-magenta/50 rounded px-1 text-xs text-white w-full"
                        />
                      ) : (
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-tight",
                          session.id === activeSessionId ? "text-white" : "text-zinc-400"
                        )}>
                          {session.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {session.isAutoSave && (
                        <span className="text-[7px] bg-zinc-800 text-zinc-500 px-1 rounded">AUTO</span>
                      )}
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingSessionId(session.id);
                            setEditName(session.name);
                          }}
                          className="p-1 hover:text-neon-cyan text-zinc-600"
                        >
                          <FileCode size={10} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(session.id);
                          }}
                          className="p-1 hover:text-red-500 text-zinc-600"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {session.description && (
                    <p className="text-[9px] text-zinc-500 mb-2 line-clamp-1 italic" onClick={() => onLoadSession(session.id)}>{session.description}</p>
                  )}
                  <div className="flex items-center justify-between text-[9px] text-zinc-500 uppercase font-mono" onClick={() => onLoadSession(session.id)}>
                    <span>{session.activeFiles.length} Files</span>
                    <span>{session.timestamp}</span>
                  </div>

                  {/* Delete Confirmation Overlay */}
                  <AnimatePresence>
                    {showDeleteConfirm === session.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-2 z-10"
                      >
                        <span className="text-[8px] font-bold text-white uppercase mb-2">Delete Session?</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSession(session.id);
                              setShowDeleteConfirm(null);
                            }}
                            className="px-2 py-1 rounded bg-red-500 text-white text-[8px] font-bold uppercase"
                          >
                            Delete
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteConfirm(null);
                            }}
                            className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-[8px] font-bold uppercase"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Session History</span>
            <div className="space-y-3">
              {[...sessions].sort((a, b) => (b.lastAccessed || b.timestamp).localeCompare(a.lastAccessed || a.timestamp)).map((session) => (
                <div 
                  key={session.id}
                  className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => onLoadSession(session.id)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-1 h-3 rounded-full", getBgClass(session.color))} />
                    <session.icon size={12} className={getColorClass(session.color)} />
                    <span className="text-xs font-medium text-zinc-300">{session.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-zinc-600 uppercase font-mono">
                    <span>Accessed: {session.lastAccessed || session.timestamp}</span>
                    <span className={getColorClass(session.color)}>{session.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {explorerTab === 'files' && (
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
        )}
      </div>
    </div>
  );
};

// --- Main App Layout ---

export default function BeeHiveApp() {
  const [activeSurface, setActiveSurface] = useState<'mission' | 'workbench' | 'swarm' | 'analytics' | 'security' | 'settings' | 'terminal'>('mission');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Swarm State
  const [swarmNodes, setSwarmNodes] = useState<SwarmNode[]>([
    { id: 'n1', label: 'Queen-Core', type: 'Orchestrator', status: 'active', x: 400, y: 300, cpu: '12%', memory: '1.2GB', activeConnections: 4 },
    { id: 'n2', label: 'Worker-Alpha', type: 'Frontend', status: 'active', x: 200, y: 150, cpu: '45%', memory: '2.4GB', activeConnections: 2 },
    { id: 'n3', label: 'Worker-Beta', type: 'Backend', status: 'idle', x: 600, y: 150, cpu: '0%', memory: '0.8GB', activeConnections: 1 },
    { id: 'n4', label: 'Worker-Gamma', type: 'Database', status: 'active', x: 400, y: 500, cpu: '88%', memory: '4.2GB', activeConnections: 3 },
    { id: 'n5', label: 'Sentinel-X', type: 'Security', status: 'warning', x: 700, y: 450, cpu: '92%', memory: '1.5GB', activeConnections: 2 },
  ]);

  const [swarmConnections, setSwarmConnections] = useState<SwarmConnection[]>([
    { id: 'c1', from: 'n1', to: 'n2', active: true },
    { id: 'c2', from: 'n1', to: 'n3', active: false },
    { id: 'c3', from: 'n1', to: 'n4', active: true },
    { id: 'c4', from: 'n4', to: 'n5', active: true },
    { id: 'c5', from: 'n2', to: 'n4', active: true },
  ]);

  // Current Workbench State (Ephemeral until saved or loaded)
  const [activeFiles, setActiveFiles] = useState<string[]>(['engine.ts', 'swarm.ts']);
  const [currentFile, setCurrentFile] = useState<string>('app/core/engine.ts');
  const [terminalHistory, setTerminalHistory] = useState<Session['terminalHistory']>([
    { type: 'input', content: 'npm run deploy:swarm --cluster=prod-alpha' },
    { type: 'output', content: '[INFO] Connecting to Queen-01...' },
    { type: 'success', content: 'Swarm deployment complete. 12/12 bees active.' },
  ]);
  const [tasks, setTasks] = useState<Session['tasks']>([
    { id: 't1', task: 'Implement retry logic', status: 'active', progress: 40 },
    { id: 't2', task: 'Refactor auth middleware', status: 'pending', progress: 0 },
    { id: 't3', task: 'Update swarm types', status: 'completed', progress: 100 },
  ]);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('beehive_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        const loadedSessions = parsed.map((s: any) => ({
          ...s,
          icon: AVAILABLE_ICONS.find(i => i.label === s.iconLabel)?.icon || Code2
        }));
        
        // Defer updates to avoid synchronous setState warning
        setTimeout(() => {
          setSessions(loadedSessions);
          if (loadedSessions.length > 0) {
            setActiveSessionId(loadedSessions[0].id);
          }
        }, 0);
      } catch (e) {
        console.error('Failed to parse saved sessions', e);
      }
    } else {
      // Default sessions if none saved
      const defaultSessions: Session[] = [
        {
          id: 's1',
          name: 'Swarm Core Refactor',
          icon: Settings,
          activeFiles: ['engine.ts', 'swarm.ts'],
          currentFile: 'app/core/engine.ts',
          terminalHistory: [
            { type: 'input', content: 'npm run deploy:swarm --cluster=prod-alpha' },
            { type: 'output', content: '[INFO] Connecting to Queen-01...' },
            { type: 'success', content: 'Swarm deployment complete. 12/12 bees active.' },
          ],
          tasks: [
            { id: 't1', task: 'Implement retry logic', status: 'active', progress: 40 },
            { id: 't2', task: 'Refactor auth middleware', status: 'pending', progress: 0 },
            { id: 't3', task: 'Update swarm types', status: 'completed', progress: 100 },
          ],
          color: 'magenta',
          timestamp: '2m ago'
        }
      ];
      setTimeout(() => {
        setSessions(defaultSessions);
        setActiveSessionId('s1');
      }, 0);
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      const toSave = sessions.map(s => ({
        ...s,
        iconLabel: AVAILABLE_ICONS.find(i => i.icon === s.icon)?.label || 'Code'
      }));
      localStorage.setItem('beehive_sessions', JSON.stringify(toSave));
    }
  }, [sessions]);

  // Auto-save logic
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const autoSaveSession: Session = {
        id: `auto-${Date.now()}`,
        name: `Auto-save: ${timestamp}`,
        description: 'Automatic system backup',
        icon: History,
        activeFiles: [...activeFiles],
        currentFile,
        terminalHistory: [...terminalHistory],
        tasks: [...tasks],
        swarmNodes: [...swarmNodes],
        swarmConnections: [...swarmConnections],
        color: 'teal',
        timestamp,
        lastAccessed: timestamp,
        isAutoSave: true
      };
      
      setSessions(prev => [autoSaveSession, ...prev.filter(s => !s.isAutoSave).slice(0, 19)]);
      setLastAutoSave(timestamp);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [activeFiles, currentFile, terminalHistory, tasks, swarmNodes, swarmConnections]);

  const handleSaveSession = (name: string, color: Session['color'], icon: any, description?: string) => {
    const newSession: Session = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      icon,
      activeFiles: [...activeFiles],
      currentFile,
      terminalHistory: [...terminalHistory],
      tasks: [...tasks],
      swarmNodes: [...swarmNodes],
      swarmConnections: [...swarmConnections],
      color,
      timestamp: new Date().toLocaleTimeString(),
      lastAccessed: new Date().toLocaleTimeString()
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const handleLoadSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setIsLoadingSession(true);
      
      // Simulate loading delay for the neon effect
      setTimeout(() => {
        setActiveSessionId(id);
        setActiveFiles(session.activeFiles);
        setCurrentFile(session.currentFile);
        setTerminalHistory(session.terminalHistory);
        setTasks(session.tasks);
        if (session.swarmNodes) setSwarmNodes(session.swarmNodes);
        if (session.swarmConnections) setSwarmConnections(session.swarmConnections);
        setSessions(prev => prev.map(s => 
          s.id === id ? { ...s, lastAccessed: new Date().toLocaleTimeString() } : s
        ));
        setIsLoadingSession(false);
      }, 800);
    }
  };
  
  const handleRenameSession = (id: string, newName: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, name: newName } : s));
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId('');
    }
  };
  
  return (
    <div className="h-screen w-screen flex flex-col bg-[#050505] font-sans selection:bg-neon-green/30">
      {/* Top Bar: Shared Status Strip */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a] z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-green via-neon-cyan to-neon-purple rounded-xl flex items-center justify-center glow-green group-hover:scale-105 transition-all duration-500 rotate-3 group-hover:rotate-0">
              <div className="w-8 h-8 bg-zinc-950 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-neon-green" fill="currentColor" />
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className="text-2xl font-display font-black text-white tracking-tighter italic">BEE HIVE</h1>
              <span className="text-[8px] font-mono text-neon-cyan tracking-[0.3em] uppercase opacity-50">Swarm Intelligence</span>
            </div>
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
                    (() => {
                      const session = sessions.find(s => s.id === activeSessionId);
                      if (!session) return 'bg-neon-green glow-green';
                      return `${getBgClass(session.color)} ${getGlowClass(session.color)}`;
                    })()
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
          <IconButton 
            icon={Code2} 
            active={activeSurface === 'workbench'} 
            onClick={() => setActiveSurface('workbench')} 
            indicatorColor={sessions.find(s => s.id === activeSessionId)?.color}
          />
          <IconButton icon={Layers} active={activeSurface === 'swarm'} onClick={() => setActiveSurface('swarm')} />
          <IconButton icon={Activity} active={activeSurface === 'analytics'} onClick={() => setActiveSurface('analytics')} />
          <IconButton icon={ShieldCheck} active={activeSurface === 'security'} onClick={() => setActiveSurface('security')} />
          <div className="mt-auto flex flex-col gap-4">
            <IconButton icon={Settings} active={activeSurface === 'settings'} onClick={() => setActiveSurface('settings')} />
            <IconButton icon={Terminal} active={activeSurface === 'terminal'} onClick={() => setActiveSurface('terminal')} />
          </div>
        </aside>

        {/* Surface Container */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            {isLoadingSession ? (
              <motion.div
                key="loading-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-2xl border-2 border-neon-green/20 border-t-neon-green glow-green"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={24} className="text-neon-green animate-pulse" />
                  </div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-bold text-neon-green uppercase tracking-[0.3em] animate-pulse">Restoring Session</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 h-1 rounded-full bg-neon-green"
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={activeSurface}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {activeSurface === 'mission' ? (
                  <MissionControlSurface />
                ) : activeSurface === 'workbench' ? (
                  <Workbench 
                    sessions={sessions} 
                    activeSessionId={activeSessionId} 
                    onSaveSession={handleSaveSession}
                    onLoadSession={handleLoadSession}
                    onDeleteSession={handleDeleteSession}
                    onRenameSession={handleRenameSession}
                    activeFiles={activeFiles}
                    setActiveFiles={setActiveFiles}
                    currentFile={currentFile}
                    setCurrentFile={setCurrentFile}
                    terminalHistory={terminalHistory}
                    setTerminalHistory={setTerminalHistory}
                    tasks={tasks}
                    setTasks={setTasks}
                    lastAutoSave={lastAutoSave}
                  />
                ) : activeSurface === 'swarm' ? (
                  <SwarmSurface 
                    nodes={swarmNodes} 
                    connections={swarmConnections} 
                    onUpdateNodes={setSwarmNodes} 
                    onUpdateConnections={setSwarmConnections} 
                  />
                ) : activeSurface === 'analytics' ? (
                  <AnalyticsSurface />
                ) : activeSurface === 'security' ? (
                  <SecuritySurface />
                ) : activeSurface === 'settings' ? (
                  <SettingsSurface />
                ) : activeSurface === 'terminal' ? (
                  <TerminalSurface />
                ) : (
                  <div className="flex-1 flex items-center justify-center text-zinc-500 font-mono text-sm uppercase tracking-widest">
                    Surface: {activeSurface} under construction
                  </div>
                )}
              </motion.div>
            )}
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
