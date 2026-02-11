'use client';

import { useState } from 'react';
import { 
  Activity, 
  LayoutDashboard, 
  FolderKanban, 
  Calendar,
  Search,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Code,
  Globe,
  Cpu
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

type Tab = 'overview' | 'projects' | 'activity' | 'calendar';

interface Project {
  id: string;
  name: string;
  status: 'in_progress' | 'completed' | 'pending' | 'blocked';
  progress: number;
  lastUpdated: string;
  description: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'coding' | 'research' | 'communication' | 'system';
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'lucasnygaard.com',
    status: 'completed',
    progress: 100,
    lastUpdated: new Date().toISOString(),
    description: 'Personal branding website with 5 pages',
    tasks: [
      { id: '1', title: 'Homepage design', status: 'done', priority: 'high' },
      { id: '2', title: 'About page', status: 'done', priority: 'high' },
      { id: '3', title: 'Services page', status: 'done', priority: 'high' },
      { id: '4', title: 'Case Studies', status: 'done', priority: 'high' },
      { id: '5', title: 'Contact page', status: 'done', priority: 'high' },
    ]
  },
  {
    id: '2',
    name: 'Mission Control Dashboard',
    status: 'in_progress',
    progress: 85,
    lastUpdated: new Date().toISOString(),
    description: 'Admin dashboard for tracking all AI operations',
    tasks: [
      { id: '1', title: 'Activity Feed', status: 'done', priority: 'high' },
      { id: '2', title: 'Calendar View', status: 'done', priority: 'high' },
      { id: '3', title: 'Global Search', status: 'done', priority: 'high' },
      { id: '4', title: 'Deploy to production', status: 'in_progress', priority: 'high' },
      { id: '5', title: 'Add authentication', status: 'todo', priority: 'medium' },
    ]
  },
  {
    id: '3',
    name: 'Blue Sportswear CRO',
    status: 'in_progress',
    progress: 60,
    lastUpdated: new Date(Date.now() - 86400000).toISOString(),
    description: 'Conversion rate optimization plan',
    tasks: [
      { id: '1', title: 'Technical audit', status: 'done', priority: 'high' },
      { id: '2', title: 'UX analysis', status: 'done', priority: 'high' },
      { id: '3', title: 'Implement quick wins', status: 'in_progress', priority: 'high' },
      { id: '4', title: 'A/B testing setup', status: 'todo', priority: 'medium' },
    ]
  }
];

const SAMPLE_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'file_created',
    title: 'Created lucasnygaard.com homepage',
    description: 'Built complete 5-page website',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    category: 'coding'
  },
  {
    id: '2',
    type: 'deploy',
    title: 'Deployed Mission Control',
    description: 'Dashboard now live on Vercel',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    category: 'system'
  },
  {
    id: '3',
    type: 'research',
    title: 'Indonesian market research',
    description: 'Analyzed islandrituals.co.id opportunity',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    category: 'research'
  },
  {
    id: '4',
    type: 'message',
    title: 'Sent morning brief',
    description: 'Delivered daily briefing to Lucas',
    timestamp: new Date(Date.now() - 28800000).toISOString(),
    category: 'communication'
  }
];

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);

  const stats = {
    totalProjects: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in_progress').length,
    totalTasks: projects.reduce((acc, p) => acc + p.tasks.length, 0),
    completedTasks: projects.reduce((acc, p) => acc + p.tasks.filter(t => t.status === 'done').length, 0),
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Harry Admin</h1>
                <p className="text-xs text-gray-400">Operations Dashboard</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1">
            <NavButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Overview"
            />
            <NavButton 
              active={activeTab === 'projects'} 
              onClick={() => setActiveTab('projects')}
              icon={<FolderKanban className="w-4 h-4" />}
              label="Projects"
              badge={stats.inProgress}
            />
            <NavButton 
              active={activeTab === 'activity'} 
              onClick={() => setActiveTab('activity')}
              icon={<Activity className="w-4 h-4" />}
              label="Activity"
            />
            <NavButton 
              active={activeTab === 'calendar'} 
              onClick={() => setActiveTab('calendar')}
              icon={<Calendar className="w-4 h-4" />}
              label="Calendar"
            />
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab stats={stats} projects={projects} />}
        {activeTab === 'projects' && <ProjectsTab projects={projects} />}
        {activeTab === 'activity' && <ActivityTab />}
        {activeTab === 'calendar' && <CalendarTab />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all
        ${active 
          ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && (
        <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${active ? 'bg-cyan-400/20' : 'bg-white/10'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function OverviewTab({ stats, projects }: { stats: any; projects: Project[] }) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Projects" value={stats.totalProjects} icon={<FolderKanban />} color="blue" />
        <StatCard title="Completed" value={stats.completed} icon={<CheckCircle />} color="green" />
        <StatCard title="In Progress" value={stats.inProgress} icon={<Clock />} color="yellow" />
        <StatCard title="Tasks Done" value={`${stats.completedTasks}/${stats.totalTasks}`} icon={<CheckCircle />} color="cyan" />
      </div>

      {/* Recent Projects */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Active Projects</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {projects.filter(p => p.status === 'in_progress').map(project => (
            <div key={project.id} className="p-4 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">{project.progress}%</div>
                  <div className="text-xs text-gray-500">
                    Updated {formatDistanceToNow(new Date(project.lastUpdated))} ago
                  </div>
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <a 
          href="/" 
          target="_blank"
          className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-colors group"
        >
          <Globe className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold">Public Website</h3>
          <p className="text-sm text-gray-400">View lucasnygaard.com</p>
        </a>
        <a 
          href="https://dashboard.convex.dev"
          target="_blank"
          className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-colors group"
        >
          <Database className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold">Convex Dashboard</h3>
          <p className="text-sm text-gray-400">Manage database</p>
        </a>
      </div>
    </div>
  );
}

function ProjectsTab({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-6">
      {projects.map(project => (
        <div key={project.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-gray-400 mt-1">{project.description}</p>
              </div>
              <StatusBadge status={project.status} />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-cyan-400 font-semibold">{project.progress}%</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Tasks</h3>
            <div className="space-y-2">
              {project.tasks.map(task => (
                <div 
                  key={task.id} 
                  className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg"
                >
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center
                    ${task.status === 'done' ? 'bg-cyan-500 border-cyan-500' : 'border-gray-500'}
                  `}>
                    {task.status === 'done' && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`flex-1 ${task.status === 'done' ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {task.title}
                  </span>
                  <PriorityBadge priority={task.priority} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityTab() {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {SAMPLE_ACTIVITIES.map(activity => (
          <div key={activity.id} className="p-4 hover:bg-gray-700/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${activity.category === 'coding' ? 'bg-blue-500/20 text-blue-400' : ''}
                ${activity.category === 'research' ? 'bg-purple-500/20 text-purple-400' : ''}
                ${activity.category === 'communication' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                ${activity.category === 'system' ? 'bg-green-500/20 text-green-400' : ''}
              `}>
                {activity.category === 'coding' && <Code className="w-5 h-5" />}
                {activity.category === 'research' && <Search className="w-5 h-5" />}
                {activity.category === 'communication' && <Activity className="w-5 h-5" />}
                {activity.category === 'system' && <Cpu className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{activity.title}</h3>
                <p className="text-sm text-gray-400">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(activity.timestamp))} ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarTab() {
  const tasks = [
    { time: '08:00', title: 'Morning Brief', type: 'cron' },
    { time: '09:00', title: 'Heartbeat Check', type: 'system' },
    { time: '10:00', title: 'Heartbeat Check', type: 'system' },
    { time: '11:00', title: 'Heartbeat Check', type: 'system' },
    { time: '14:00', title: 'Client Call - Blue Sportswear', type: 'meeting' },
    { time: '23:00', title: 'Nightly Proactive Work', type: 'cron' },
  ];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Today's Schedule</h2>
        <p className="text-gray-400 text-sm">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
      </div>
      <div className="divide-y divide-gray-700">
        {tasks.map((task, i) => (
          <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-700/50 transition-colors">
            <div className="w-16 text-gray-400 font-mono">{task.time}</div>
            <div className={`
              w-2 h-2 rounded-full
              ${task.type === 'cron' ? 'bg-purple-500' : ''}
              ${task.type === 'system' ? 'bg-cyan-500' : ''}
              ${task.type === 'meeting' ? 'bg-yellow-500' : ''}
            `} />
            <span className="text-white">{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
  };

  return (
    <div className={`p-4 bg-gradient-to-br ${colors[color]} border rounded-xl`}>
      <div className="flex items-center gap-3">
        <div className="text-cyan-400">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    blocked: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: any = {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    low: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <span className={`px-2 py-0.5 text-xs rounded ${colors[priority]}`}>
      {priority}
    </span>
  );
}
