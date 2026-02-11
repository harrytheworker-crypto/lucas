'use client';

import { useState } from 'react';
import { ActivityFeed } from '@/components/ActivityFeed';
import { CalendarView } from '@/components/CalendarView';
import { GlobalSearch } from '@/components/GlobalSearch';
import { 
  Activity, 
  Calendar, 
  Search, 
  Terminal,
  Cpu,
  Database,
  Radio
} from 'lucide-react';

type Tab = 'activity' | 'calendar' | 'search';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('activity');

  return (
    <main className="min-h-screen bg-mission-dark">
      {/* Header */}
      <header className="border-b border-white/10 bg-mission-panel/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Mission Control</h1>
                <p className="text-xs text-white/50">Harry AI Operations Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Database className="w-4 h-4" />
                <span>Convex Connected</span>
                <span className="status-dot active"></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Radio className="w-4 h-4" />
                <span>Gateway Online</span>
                <span className="status-dot active"></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Cpu className="w-4 h-4" />
                <span>Memory: 86%</span>
                <span className="status-dot pending"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <TabButton
              active={activeTab === 'activity'}
              onClick={() => setActiveTab('activity')}
              icon={<Activity className="w-4 h-4" />}
              label="Activity Feed"
              count={142}
            />
            <TabButton
              active={activeTab === 'calendar'}
              onClick={() => setActiveTab('calendar')}
              icon={<Calendar className="w-4 h-4" />}
              label="Calendar"
              count={8}
            />
            <TabButton
              active={activeTab === 'search'}
              onClick={() => setActiveTab('search')}
              icon={<Search className="w-4 h-4" />}
              label="Global Search"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'activity' && <ActivityFeed />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'search' && <GlobalSearch />}
      </div>
    </main>
  );
}

function TabButton({ 
  active, 
  onClick, 
  icon, 
  label, 
  count 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all
        ${active 
          ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span className={`
          px-2 py-0.5 text-xs rounded-full
          ${active ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/10 text-white/60'}
        `}>
          {count}
        </span>
      )}
    </button>
  );
}
