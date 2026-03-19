'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Zap, 
  ShieldCheck, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreVertical, 
  RefreshCw, 
  Search, 
  Filter, 
  Maximize2, 
  Minimize2, 
  X, 
  ChevronRight,
  LayoutGrid,
  List,
  Layers,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  Users,
  Server,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie, 
  LineChart, 
  Line,
  Legend
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PERFORMANCE_DATA = [
  { time: '00:00', cpu: 45, mem: 32, net: 12 },
  { time: '04:00', cpu: 52, mem: 38, net: 18 },
  { time: '08:00', cpu: 85, mem: 65, net: 45 },
  { time: '12:00', cpu: 78, mem: 72, net: 52 },
  { time: '16:00', cpu: 92, mem: 85, net: 68 },
  { time: '20:00', cpu: 65, mem: 58, net: 32 },
  { time: '23:59', cpu: 48, mem: 42, net: 15 },
];

const NODE_STATUS_DATA = [
  { name: 'Active', value: 12, color: '#00FF00' },
  { name: 'Idle', value: 4, color: '#00FFFF' },
  { name: 'Warning', value: 1, color: '#FFD700' },
  { name: 'Error', value: 0, color: '#FF0000' },
];

const RECENT_ALERTS = [
  { id: '1', type: 'warning', message: 'Node Worker-Alpha high memory usage', time: '2m ago', severity: 'medium' },
  { id: '2', type: 'error', message: 'Connection timeout on Queen-01', time: '15m ago', severity: 'high' },
  { id: '3', type: 'success', message: 'Security scan completed successfully', time: '1h ago', severity: 'low' },
  { id: '4', type: 'info', message: 'New node Worker-Gamma joined the swarm', time: '3h ago', severity: 'low' },
];

const StatCard = ({ title, value, change, icon: Icon, color }: { title: string, value: string, change: string, icon: any, color: string }) => {
  const isPositive = change.startsWith('+');
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-panel p-5 rounded-2xl border border-white/5 bg-white/5 relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 transition-opacity group-hover:opacity-20", color)} />
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white group-hover:bg-white/10 transition-colors">
          <Icon size={20} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
          isPositive ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500"
        )}>
          {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</div>
        <div className="text-2xl font-display font-bold text-white tracking-tight">{value}</div>
      </div>
    </motion.div>
  );
};

export const MissionControlSurface = () => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Mission Control <span className="text-neon-cyan text-sm font-mono animate-pulse">● LIVE</span>
          </h2>
          <div className="flex gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setActiveView('grid')}
              className={cn(
                "p-1.5 rounded transition-all",
                activeView === 'grid' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setActiveView('list')}
              className={cn(
                "p-1.5 rounded transition-all",
                activeView === 'list' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <List size={16} />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
            <input 
              type="text" 
              placeholder="Search metrics..." 
              className="bg-zinc-900/50 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-300 focus:outline-none focus:border-neon-cyan/50 transition-colors w-64"
            />
          </div>
          <button 
            onClick={handleRefresh}
            className={cn(
              "p-2 rounded-lg bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-white transition-all",
              isRefreshing && "animate-spin text-neon-cyan"
            )}
          >
            <RefreshCw size={18} />
          </button>
          <button className="px-4 py-2 rounded-lg bg-neon-cyan text-black hover:bg-neon-cyan/90 text-xs font-bold uppercase tracking-wider transition-colors glow-cyan flex items-center gap-2">
            <Zap size={14} fill="currentColor" /> Deploy Update
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Swarm Nodes" value="12 Active" change="+2" icon={Server} color="bg-neon-cyan" />
        <StatCard title="CPU Utilization" value="68.4%" change="+12.5%" icon={Cpu} color="bg-neon-green" />
        <StatCard title="Memory Usage" value="42.1 GB" change="-4.2%" icon={Database} color="bg-neon-amber" />
        <StatCard title="Network Latency" value="12ms" change="-2ms" icon={Zap} color="bg-neon-cyan" />
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden">
        {/* Real-time Performance Chart */}
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-2xl border border-white/5 bg-white/5 p-6 flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Activity size={16} className="text-neon-cyan" />
                Swarm Performance Matrix
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono">Real-time telemetry from all active nodes</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">CPU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">MEM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-amber" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">NET</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_DATA}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#666' }}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#666' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#00FFFF" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="mem" stroke="#00FF00" strokeWidth={2} fillOpacity={1} fill="url(#colorMem)" />
                <Area type="monotone" dataKey="net" stroke="#FFD700" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Node Distribution & Alerts */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 overflow-hidden">
          {/* Node Status Pie */}
          <div className="glass-panel rounded-2xl border border-white/5 bg-white/5 p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Network size={16} className="text-neon-green" />
              Node Distribution
            </h3>
            <div className="h-[180px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={NODE_STATUS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {NODE_STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-display font-bold text-white">17</span>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Total Nodes</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {NODE_STATUS_DATA.map((status, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{status.name}</span>
                  <span className="ml-auto text-[10px] font-mono text-white">{status.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="flex-1 glass-panel rounded-2xl border border-white/5 bg-white/5 p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={16} className="text-neon-amber" />
                System Alerts
              </h3>
              <button className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              {RECENT_ALERTS.map((alert) => (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "p-3 rounded-xl border border-white/5 bg-white/5 flex gap-3 group hover:bg-white/10 transition-all",
                    alert.type === 'error' ? "border-red-500/20" : alert.type === 'warning' ? "border-neon-amber/20" : "border-white/5"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg h-fit",
                    alert.type === 'error' ? "bg-red-500/10 text-red-500" : 
                    alert.type === 'warning' ? "bg-neon-amber/10 text-neon-amber" : 
                    alert.type === 'success' ? "bg-neon-green/10 text-neon-green" : "bg-neon-cyan/10 text-neon-cyan"
                  )}>
                    {alert.type === 'error' ? <AlertTriangle size={14} /> : 
                     alert.type === 'warning' ? <AlertTriangle size={14} /> : 
                     alert.type === 'success' ? <CheckCircle2 size={14} /> : <Activity size={14} />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-[10px] font-bold text-white leading-tight">{alert.message}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{alert.time}</span>
                      <span className={cn(
                        "text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                        alert.severity === 'high' ? "bg-red-500/20 text-red-500" : 
                        alert.severity === 'medium' ? "bg-neon-amber/20 text-neon-amber" : "bg-zinc-800 text-zinc-500"
                      )}>
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
