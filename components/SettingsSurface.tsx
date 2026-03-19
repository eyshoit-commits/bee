'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Cpu, 
  Zap, 
  ChevronRight,
  Save,
  RefreshCw,
  Moon,
  Sun,
  Monitor,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  Mail,
  Key,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SettingItem = ({ label, description, icon: Icon, children, active }: any) => (
  <div className={cn(
    "p-4 rounded-xl border transition-all duration-300 group",
    active ? "bg-white/5 border-white/10" : "border-transparent hover:bg-white/5"
  )}>
    <div className="flex items-center gap-4">
      <div className={cn(
        "p-2.5 rounded-xl bg-zinc-900 border border-white/5 transition-colors",
        active ? "text-neon-green border-neon-green/30" : "text-zinc-500 group-hover:text-zinc-300"
      )}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-zinc-200">{label}</div>
        <div className="text-[11px] text-zinc-500 mt-0.5">{description}</div>
      </div>
      <div className="flex items-center gap-4">
        {children}
      </div>
    </div>
  </div>
);

const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={cn(
      "w-10 h-5 rounded-full relative transition-colors duration-300",
      active ? "bg-neon-green" : "bg-zinc-800"
    )}
  >
    <motion.div 
      animate={{ x: active ? 22 : 2 }}
      className="absolute top-1 left-0 w-3 h-3 rounded-full bg-white shadow-sm"
    />
  </button>
);

export const SettingsSurface = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'swarm' | 'security' | 'account'>('general');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [encryption, setEncryption] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'swarm', label: 'Swarm Config', icon: Cpu },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            System Settings <span className="text-zinc-500 text-sm font-mono">● CONFIG</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Configure your swarm environment and user preferences</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider transition-colors">Reset Defaults</button>
          <button className="px-4 py-2 rounded-lg bg-neon-green text-black hover:bg-neon-green/90 text-xs font-bold uppercase tracking-wider transition-colors glow-green flex items-center gap-2">
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                activeTab === tab.id 
                  ? "bg-neon-green/10 text-neon-green border border-neon-green/20" 
                  : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              )}
            >
              <tab.icon size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">{tab.label}</span>
              <ChevronRight size={14} className={cn("ml-auto opacity-0 group-hover:opacity-100 transition-opacity", activeTab === tab.id && "opacity-100")} />
            </button>
          ))}
          
          <div className="mt-auto p-4 rounded-xl bg-zinc-900/50 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center">
                <Zap size={20} className="text-neon-green" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">BeeHive Pro</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">Enterprise Plan</div>
              </div>
            </div>
            <button className="w-full py-2 rounded bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan text-[10px] font-bold uppercase tracking-wider hover:bg-neon-cyan/30 transition-all">
              Upgrade Swarm
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 glass-panel rounded-2xl p-8 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {activeTab === 'general' && (
                <>
                  <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Appearance</h3>
                    <SettingItem 
                      label="Dark Mode" 
                      description="Use the high-contrast dark theme for better visibility." 
                      icon={Moon}
                      active={darkMode}
                    >
                      <Toggle active={darkMode} onToggle={() => setDarkMode(!darkMode)} />
                    </SettingItem>
                    <SettingItem 
                      label="Interface Scale" 
                      description="Adjust the size of UI elements and typography." 
                      icon={Monitor}
                    >
                      <select className="bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none">
                        <option>Compact</option>
                        <option>Default</option>
                        <option>Large</option>
                      </select>
                    </SettingItem>
                  </section>

                  <section className="space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">System Preferences</h3>
                    <SettingItem 
                      label="Push Notifications" 
                      description="Receive real-time alerts for critical swarm events." 
                      icon={Bell}
                      active={notifications}
                    >
                      <Toggle active={notifications} onToggle={() => setNotifications(!notifications)} />
                    </SettingItem>
                    <SettingItem 
                      label="Auto-save Sessions" 
                      description="Automatically backup your workbench every 2 minutes." 
                      icon={RefreshCw}
                      active={autoSave}
                    >
                      <Toggle active={autoSave} onToggle={() => setAutoSave(!autoSave)} />
                    </SettingItem>
                  </section>
                </>
              )}

              {activeTab === 'swarm' && (
                <>
                  <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Orchestration</h3>
                    <SettingItem 
                      label="Auto-scaling" 
                      description="Automatically provision new bees when load exceeds 80%." 
                      icon={Zap}
                      active={true}
                    >
                      <Toggle active={true} onToggle={() => {}} />
                    </SettingItem>
                    <SettingItem 
                      label="Region Preference" 
                      description="Select the primary cluster region for your swarm." 
                      icon={Globe}
                    >
                      <select className="bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none">
                        <option>EU-WEST-3 (Paris)</option>
                        <option>US-EAST-1 (N. Virginia)</option>
                        <option>AP-NORTHEAST-1 (Tokyo)</option>
                      </select>
                    </SettingItem>
                  </section>

                  <section className="space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Data Persistence</h3>
                    <SettingItem 
                      label="Database Sharding" 
                      description="Enable automatic data distribution across multiple shards." 
                      icon={Database}
                      active={true}
                    >
                      <Toggle active={true} onToggle={() => {}} />
                    </SettingItem>
                    <SettingItem 
                      label="Backup Frequency" 
                      description="How often to perform full system snapshots." 
                      icon={Clock}
                    >
                      <select className="bg-zinc-800 border border-white/10 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none">
                        <option>Every 6 Hours</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                      </select>
                    </SettingItem>
                  </section>
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Protection</h3>
                    <SettingItem 
                      label="End-to-End Encryption" 
                      description="Encrypt all swarm communication with AES-256-GCM." 
                      icon={Lock}
                      active={encryption}
                    >
                      <Toggle active={encryption} onToggle={() => setEncryption(!encryption)} />
                    </SettingItem>
                    <SettingItem 
                      label="Two-Factor Authentication" 
                      description="Require a secure token for all operator logins." 
                      icon={Smartphone}
                      active={twoFactor}
                    >
                      <Toggle active={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
                    </SettingItem>
                  </section>

                  <section className="space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Identity</h3>
                    <SettingItem 
                      label="API Key Management" 
                      description="View and rotate your system access keys." 
                      icon={Key}
                    >
                      <button className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors">Manage Keys</button>
                    </SettingItem>
                    <SettingItem 
                      label="Audit Logging" 
                      description="Keep a detailed record of all system modifications." 
                      icon={Eye}
                      active={true}
                    >
                      <Toggle active={true} onToggle={() => {}} />
                    </SettingItem>
                  </section>
                </>
              )}

              {activeTab === 'account' && (
                <>
                  <section className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-green to-neon-cyan p-1">
                        <div className="w-full h-full rounded-xl bg-zinc-950 flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://picsum.photos/seed/operator/200/200" 
                            alt="User Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-display font-bold text-white tracking-tight">Operator-01</h4>
                        <p className="text-sm text-zinc-500">eysho.it@gmail.com</p>
                        <div className="flex gap-2 mt-4">
                          <button className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors">Change Photo</button>
                          <button className="px-4 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs transition-colors">Logout</button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Member Since</div>
                        <div className="text-sm font-bold text-white">March 2024</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Last Login</div>
                        <div className="text-sm font-bold text-white">2 hours ago</div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Contact Information</h3>
                      <SettingItem 
                        label="Email Address" 
                        description="Primary email for system alerts and recovery." 
                        icon={Mail}
                      >
                        <span className="text-xs text-zinc-400">eysho.it@gmail.com</span>
                      </SettingItem>
                      <SettingItem 
                        label="Phone Number" 
                        description="Used for emergency SMS notifications." 
                        icon={Smartphone}
                      >
                        <span className="text-xs text-zinc-400">+1 (555) 000-0000</span>
                      </SettingItem>
                    </div>
                  </section>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
