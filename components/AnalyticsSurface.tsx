'use client';

import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Database, 
  Globe, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const performanceData = [
  { time: '14:00', cpu: 45, mem: 62, net: 30 },
  { time: '14:05', cpu: 52, mem: 65, net: 35 },
  { time: '14:10', cpu: 48, mem: 68, net: 42 },
  { time: '14:15', cpu: 61, mem: 72, net: 58 },
  { time: '14:20', cpu: 55, mem: 70, net: 45 },
  { time: '14:25', cpu: 42, mem: 68, net: 38 },
  { time: '14:30', cpu: 38, mem: 65, net: 32 },
];

const nodeDistribution = [
  { name: 'Orchestrator', value: 1, color: '#00ff41' },
  { name: 'Frontend', value: 4, color: '#00f3ff' },
  { name: 'Backend', value: 6, color: '#ff00ff' },
  { name: 'Database', value: 2, color: '#ffb800' },
  { name: 'Security', value: 1, color: '#ff0000' },
];

const taskStats = [
  { day: 'Mon', completed: 12, failed: 1 },
  { day: 'Tue', completed: 18, failed: 0 },
  { day: 'Wed', completed: 15, failed: 2 },
  { day: 'Thu', completed: 22, failed: 1 },
  { day: 'Fri', completed: 30, failed: 0 },
  { day: 'Sat', completed: 8, failed: 0 },
  { day: 'Sun', completed: 5, failed: 0 },
];

const StatCard = ({ label, value, trend, trendValue, icon: Icon, color }: any) => (
  <div className="glass-panel p-5 rounded-xl flex flex-col gap-4 relative overflow-hidden group">
    <div className={cn("absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity", color)}>
      <Icon size={80} />
    </div>
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
        <Icon size={18} className={color} />
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
          trend === 'up' ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500"
        )}>
          {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {trendValue}
        </div>
      )}
    </div>
    <div>
      <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">{label}</div>
      <div className="text-2xl font-display font-bold text-white tracking-tight">{value}</div>
    </div>
  </div>
);

export const AnalyticsSurface = () => {
  return (
    <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Analytics Engine <span className="text-neon-amber text-sm font-mono animate-pulse">● PROCESSING</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Deep insights into swarm performance and network health</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors">Generate Report</button>
          <button className="px-4 py-2 rounded-lg bg-neon-amber text-black hover:bg-neon-amber/90 text-xs font-bold uppercase tracking-wider transition-colors glow-orange">Real-time Stream</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard 
          label="Network Throughput" 
          value="4.2 GB/s" 
          trend="up" 
          trendValue="+12%" 
          icon={Zap} 
          color="text-neon-cyan" 
        />
        <StatCard 
          label="Avg Latency" 
          value="12.4 ms" 
          trend="down" 
          trendValue="-2.1ms" 
          icon={Clock} 
          color="text-neon-green" 
        />
        <StatCard 
          label="Resource Load" 
          value="68.4%" 
          trend="up" 
          trendValue="+5.4%" 
          icon={Cpu} 
          color="text-neon-amber" 
        />
        <StatCard 
          label="Active Connections" 
          value="1,242" 
          trend="up" 
          trendValue="+84" 
          icon={Globe} 
          color="text-neon-magenta" 
        />
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Performance Chart */}
          <div className="flex-1 glass-panel rounded-xl p-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <LineChartIcon size={14} className="text-neon-green" /> Swarm Performance (Last 30m)
              </h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                  <span className="text-[10px] text-zinc-400 uppercase">CPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <span className="text-[10px] text-zinc-400 uppercase">MEM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-magenta" />
                  <span className="text-[10px] text-zinc-400 uppercase">NET</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff41" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00ff41" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#09090b', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    itemStyle={{ padding: '2px 0' }}
                  />
                  <Area type="monotone" dataKey="cpu" stroke="#00ff41" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                  <Area type="monotone" dataKey="mem" stroke="#00f3ff" fillOpacity={1} fill="url(#colorMem)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Task Stats Chart */}
          <div className="h-64 glass-panel rounded-xl p-6 flex flex-col gap-4 overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <BarChart3 size={14} className="text-neon-magenta" /> Weekly Task Completion
            </h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: '#09090b', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="completed" fill="#ff00ff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="failed" fill="#ff0000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="w-80 flex flex-col gap-4">
          {/* Node Distribution */}
          <div className="glass-panel rounded-xl p-6 flex flex-col gap-4 overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <PieChartIcon size={14} className="text-neon-cyan" /> Node Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nodeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {nodeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#09090b', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {nodeDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] text-zinc-400 uppercase">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="glass-panel rounded-xl p-6 flex-1 flex flex-col gap-4 overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">System Alerts</h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              {[
                { type: 'warning', msg: 'High CPU on Worker-Gamma', time: '2m ago' },
                { type: 'error', msg: 'Connection lost: Node-04', time: '15m ago' },
                { type: 'success', msg: 'Swarm re-balance complete', time: '1h ago' },
                { type: 'warning', msg: 'Memory pressure: Sentinel-X', time: '2h ago' },
                { type: 'success', msg: 'Policy update applied', time: '4h ago' },
              ].map((alert, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-[8px] font-bold uppercase tracking-widest",
                      alert.type === 'warning' ? 'text-neon-amber' : 
                      alert.type === 'error' ? 'text-red-500' : 'text-neon-green'
                    )}>
                      {alert.type}
                    </span>
                    <span className="text-[8px] text-zinc-600">{alert.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-tight">{alert.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
