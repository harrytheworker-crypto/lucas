'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  MessageSquare, 
  Search,
  Zap,
  Code,
  Database,
  Globe,
  Filter,
  RefreshCw
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

interface Activity {
  _id: string;
  type: string;
  title: string;
  description?: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  metadata?: {
    filePath?: string;
    toolUsed?: string;
    duration?: number;
    tokensUsed?: number;
    cost?: number;
  };
  tags?: string[];
  createdAt: number;
  completedAt?: number;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  coding: <Code className="w-4 h-4" />,
  research: <Search className="w-4 h-4" />,
  communication: <MessageSquare className="w-4 h-4" />,
  system: <Database className="w-4 h-4" />,
  analysis: <Zap className="w-4 h-4" />,
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // For demo, create sample activities
    const sampleActivities: Activity[] = [
      {
        _id: '1',
        type: 'file_created',
        title: 'Created lucasnygaard.com homepage',
        description: 'Built complete 5-page website with NextJS-style structure',
        category: 'coding',
        status: 'completed',
        metadata: {
          filePath: 'projects/lucasnygaard.com/index.html',
          toolUsed: 'write',
          duration: 1800,
        },
        tags: ['website', 'client-work', 'lucas'],
        createdAt: Date.now() - 1000 * 60 * 60, // 1 hour ago
        completedAt: Date.now() - 1000 * 60 * 30,
      },
      {
        _id: '2',
        type: 'heartbeat_check',
        title: 'Heartbeat: Memory at 95%',
        description: 'System memory warning - sustained high usage detected',
        category: 'system',
        status: 'completed',
        metadata: {
          toolUsed: 'exec',
          duration: 5,
        },
        tags: ['monitoring', 'alert'],
        createdAt: Date.now() - 1000 * 60 * 30,
        completedAt: Date.now() - 1000 * 60 * 29,
      },
      {
        _id: '3',
        type: 'cron_executed',
        title: 'Morning Brief (8am Bali)',
        description: 'Delivered daily briefing to Lucas via WhatsApp',
        category: 'system',
        status: 'completed',
        metadata: {
          toolUsed: 'message',
          duration: 120,
        },
        tags: ['cron', 'morning-brief'],
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
        completedAt: Date.now() - 1000 * 60 * 60 * 1.5,
      },
      {
        _id: '4',
        type: 'research',
        title: 'Indonesian E-commerce Market Research',
        description: 'Analyzed islandrituals.co.id market opportunity',
        category: 'research',
        status: 'completed',
        metadata: {
          toolUsed: 'web_search',
          duration: 900,
        },
        tags: ['research', 'indonesia', 'islandrituals'],
        createdAt: Date.now() - 1000 * 60 * 60 * 4,
        completedAt: Date.now() - 1000 * 60 * 60 * 3,
      },
      {
        _id: '5',
        type: 'file_created',
        title: 'Created Convex schema',
        description: 'Defined database schema for Mission Control dashboard',
        category: 'coding',
        status: 'completed',
        metadata: {
          filePath: 'convex/schema.ts',
          toolUsed: 'write',
          duration: 600,
        },
        tags: ['database', 'mission-control'],
        createdAt: Date.now() - 1000 * 60 * 15,
        completedAt: Date.now() - 1000 * 60 * 5,
      },
      {
        _id: '6',
        type: 'task_completed',
        title: 'Read HEARTBEAT.md',
        description: 'Executed critical system checks',
        category: 'system',
        status: 'completed',
        metadata: {
          toolUsed: 'read',
          duration: 2,
        },
        tags: ['monitoring'],
        createdAt: Date.now() - 1000 * 60 * 45,
        completedAt: Date.now() - 1000 * 60 * 44,
      },
    ];

    setActivities(sampleActivities);
    setIsLoading(false);
  }, []);

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.category === filter);

  const categories = ['all', 'coding', 'research', 'communication', 'system', 'analysis'];

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard 
          label="Total Activities" 
          value={activities.length} 
          icon={<Database className="w-5 h-5" />}
          color="cyan"
        />
        <StatCard 
          label="Completed Today" 
          value={activities.filter(a => a.status === 'completed').length} 
          icon={<CheckCircle className="w-5 h-5" />}
          color="green"
        />
        <StatCard 
          label="In Progress" 
          value={activities.filter(a => a.status === 'in_progress').length} 
          icon={<Clock className="w-5 h-5" />}
          color="blue"
        />
        <StatCard 
          label="Failed" 
          value={activities.filter(a => a.status === 'failed').length} 
          icon={<XCircle className="w-5 h-5" />}
          color="red"
        />
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 flex items-center gap-4">
        <Filter className="w-5 h-5 text-white/50" />
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-all
                ${filter === cat 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex-1"></div>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Activity List */}
      <div 
        ref={scrollRef}
        className="glass-panel overflow-hidden"
      >
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        </div>
        
        <div className="max-h-[600px] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-white/50">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
              Loading activities...
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="p-8 text-center text-white/50">
              No activities found
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredActivities.map((activity) => (
                <ActivityItem key={activity._id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          ${STATUS_COLORS[activity.status]}
        `}>
          {CATEGORY_ICONS[activity.category] || <Zap className="w-4 h-4" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-white font-medium">{activity.title}</h3>
              {activity.description && (
                <p className="text-white/50 text-sm mt-1 line-clamp-2">
                  {activity.description}
                </p>
              )}
            </div>
            <span className="text-xs text-white/40 whitespace-nowrap">
              {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <span className={`
              px-2 py-0.5 text-xs rounded border
              ${STATUS_COLORS[activity.status]}
            `}>
              {activity.status.replace('_', ' ')}
            </span>
            
            {activity.metadata?.toolUsed && (
              <span className="text-xs text-white/40">
                Tool: {activity.metadata.toolUsed}
              </span>
            )}
            
            {activity.metadata?.duration && (
              <span className="text-xs text-white/40">
                Duration: {Math.round(activity.metadata.duration / 60)}m
              </span>
            )}
            
            {activity.tags?.map(tag => (
              <span 
                key={tag}
                className="text-xs text-cyan-400/60 bg-cyan-400/10 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {expanded && activity.metadata && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg text-sm">
              {activity.metadata.filePath && (
                <div className="flex items-center gap-2 text-white/60">
                  <FileText className="w-4 h-4" />
                  <span>{activity.metadata.filePath}</span>
                </div>
              )}
              {activity.metadata.tokensUsed && (
                <div className="text-white/60 mt-2">
                  Tokens: {activity.metadata.tokensUsed.toLocaleString()}
                </div>
              )}
              {activity.metadata.cost && (
                <div className="text-white/60">
                  Cost: ${activity.metadata.cost.toFixed(4)}
                </div>
              )}
              <div className="text-white/40 mt-2 text-xs">
                Created: {format(activity.createdAt, 'MMM d, yyyy HH:mm')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  color 
}: { 
  label: string; 
  value: number; 
  icon: React.ReactNode;
  color: 'cyan' | 'green' | 'blue' | 'red';
}) {
  const colors = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400',
  };

  return (
    <div className={`
      glass-panel p-4 bg-gradient-to-br ${colors[color]}
    `}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-white/60">{label}</p>
        </div>
      </div>
    </div>
  );
}
