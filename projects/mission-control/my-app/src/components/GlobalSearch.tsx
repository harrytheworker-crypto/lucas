'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  FileText, 
  Activity, 
  Calendar, 
  Clock,
  Filter,
  X,
  ExternalLink,
  Tag
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

interface SearchResult {
  documents: DocumentResult[];
  activities: ActivityResult[];
  tasks: TaskResult[];
  totalResults: number;
}

interface DocumentResult {
  _id: string;
  title: string;
  content?: string;
  filePath: string;
  fileType: string;
  lastModified: number;
  tags?: string[];
}

interface ActivityResult {
  _id: string;
  type: string;
  title: string;
  description?: string;
  category: string;
  status: string;
  createdAt: number;
}

interface TaskResult {
  _id: string;
  title: string;
  description?: string;
  scheduledFor: number;
  category: string;
  status: string;
}

const FILE_TYPE_ICONS: Record<string, React.ReactNode> = {
  markdown: <FileText className="w-4 h-4" />,
  json: <FileText className="w-4 h-4" />,
  code: <FileText className="w-4 h-4" />,
  config: <FileText className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  coding: 'text-cyan-400 bg-cyan-400/10',
  research: 'text-purple-400 bg-purple-400/10',
  communication: 'text-yellow-400 bg-yellow-400/10',
  system: 'text-green-400 bg-green-400/10',
  analysis: 'text-pink-400 bg-pink-400/10',
};

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'documents' | 'activities' | 'tasks'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Sample data for demo
  const sampleDocuments: DocumentResult[] = [
    {
      _id: '1',
      title: 'lucasnygaard.com Strategy',
      content: 'Personal branding website for Lucas Nygaard — Fractional CMO...',
      filePath: 'memory/2026-02-08.md',
      fileType: 'markdown',
      lastModified: Date.now() - 1000 * 60 * 60 * 2,
      tags: ['website', 'strategy', 'lucas'],
    },
    {
      _id: '2',
      title: 'Blue Sportswear CRO Plan',
      content: 'Conversion rate optimization strategy for 5-year client...',
      filePath: 'memory/2026-02-08.md',
      fileType: 'markdown',
      lastModified: Date.now() - 1000 * 60 * 60 * 4,
      tags: ['client', 'cro', 'blue-sportswear'],
    },
    {
      _id: '3',
      title: 'Indonesian Market Research',
      content: 'E-commerce market analysis for islandrituals.co.id...',
      filePath: 'memory/2026-02-08.md',
      fileType: 'markdown',
      lastModified: Date.now() - 1000 * 60 * 60 * 6,
      tags: ['research', 'indonesia', 'islandrituals'],
    },
    {
      _id: '4',
      title: 'USER.md',
      content: 'Lucas Nygaard user profile and preferences...',
      filePath: 'USER.md',
      fileType: 'markdown',
      lastModified: Date.now() - 1000 * 60 * 60 * 24,
      tags: ['user', 'profile'],
    },
    {
      _id: '5',
      title: 'Convex Schema',
      content: 'Database schema for Mission Control dashboard...',
      filePath: 'convex/schema.ts',
      fileType: 'code',
      lastModified: Date.now() - 1000 * 60 * 30,
      tags: ['database', 'mission-control'],
    },
  ];

  const sampleActivities: ActivityResult[] = [
    {
      _id: '1',
      type: 'file_created',
      title: 'Created lucasnygaard.com',
      description: 'Built complete 5-page website',
      category: 'coding',
      status: 'completed',
      createdAt: Date.now() - 1000 * 60 * 60,
    },
    {
      _id: '2',
      type: 'heartbeat',
      title: 'Memory Alert: 95%',
      description: 'System monitoring detected high memory usage',
      category: 'system',
      status: 'completed',
      createdAt: Date.now() - 1000 * 60 * 30,
    },
    {
      _id: '3',
      type: 'research',
      title: 'Indonesian E-commerce Analysis',
      description: 'Market research for nail serum product',
      category: 'research',
      status: 'completed',
      createdAt: Date.now() - 1000 * 60 * 60 * 4,
    },
  ];

  const sampleTasks: TaskResult[] = [
    {
      _id: '1',
      title: 'Morning Brief (8am Bali)',
      description: 'Daily briefing for Lucas',
      scheduledFor: Date.now() + 1000 * 60 * 60 * 24,
      category: 'cron',
      status: 'scheduled',
    },
    {
      _id: '2',
      title: 'Heartbeat Check',
      scheduledFor: Date.now() + 1000 * 60 * 30,
      category: 'heartbeat',
      status: 'scheduled',
    },
  ];

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }

    setIsSearching(true);

    // Simple search implementation
    const lowerQuery = searchQuery.toLowerCase();
    
    const filteredDocs = sampleDocuments.filter(doc => 
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content?.toLowerCase().includes(lowerQuery) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      doc.filePath.toLowerCase().includes(lowerQuery)
    );

    const filteredActivities = sampleActivities.filter(act =>
      act.title.toLowerCase().includes(lowerQuery) ||
      act.description?.toLowerCase().includes(lowerQuery) ||
      act.category.toLowerCase().includes(lowerQuery)
    );

    const filteredTasks = sampleTasks.filter(task =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description?.toLowerCase().includes(lowerQuery)
    );

    setResults({
      documents: filteredDocs,
      activities: filteredActivities,
      tasks: filteredTasks,
      totalResults: filteredDocs.length + filteredActivities.length + filteredTasks.length,
    });

    setIsSearching(false);

    // Add to recent searches
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
    }
  }, [recentSearches]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const filteredResults = results ? {
    documents: selectedFilter === 'all' || selectedFilter === 'documents' ? results.documents : [],
    activities: selectedFilter === 'all' || selectedFilter === 'activities' ? results.activities : [],
    tasks: selectedFilter === 'all' || selectedFilter === 'tasks' ? results.tasks : [],
    totalResults: results.totalResults,
  } : null;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="glass-panel p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, activities, tasks..."
            className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-lg"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-5 h-5 text-white/40" />
            </button>
          )}
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !query && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-white/40">Recent:</span>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setQuery(search)}
                className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      {results && results.totalResults > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          {(['all', 'documents', 'activities', 'tasks'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`
                px-3 py-1.5 text-sm rounded-lg transition-all capitalize
                ${selectedFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {filter}
              {filter !== 'all' && results && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({results[filter as keyof SearchResult]?.length || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {isSearching ? (
        <div className="glass-panel p-12 text-center">
          <div className="animate-pulse text-white/40">Searching...</div>
        </div>
      ) : query && filteredResults ? (
        <div className="space-y-6">
          {filteredResults.totalResults === 0 ? (
            <div className="glass-panel p-12 text-center">
              <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No results found for "{query}"</p>
              <p className="text-sm text-white/30 mt-2">Try different keywords or check your spelling</p>
            </div>
          ) : (
            <>
              {/* Documents */}
              {filteredResults.documents.length > 0 && (
                <ResultsSection 
                  title="Documents" 
                  icon={<FileText className="w-5 h-5" />}
                  count={filteredResults.documents.length}
                >
                  {filteredResults.documents.map((doc) => (
                    <DocumentResultItem key={doc._id} document={doc} />
                  ))}
                </ResultsSection>
              )}

              {/* Activities */}
              {filteredResults.activities.length > 0 && (
                <ResultsSection 
                  title="Activities" 
                  icon={<Activity className="w-5 h-5" />}
                  count={filteredResults.activities.length}
                >
                  {filteredResults.activities.map((activity) => (
                    <ActivityResultItem key={activity._id} activity={activity} />
                  ))}
                </ResultsSection>
              )}

              {/* Tasks */}
              {filteredResults.tasks.length > 0 && (
                <ResultsSection 
                  title="Scheduled Tasks" 
                  icon={<Calendar className="w-5 h-5" />}
                  count={filteredResults.tasks.length}
                >
                  {filteredResults.tasks.map((task) => (
                    <TaskResultItem key={task._id} task={task} />
                  ))}
                </ResultsSection>
              )}
            </>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel p-12 text-center">
          <Search className="w-16 h-16 text-white/10 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-white mb-2">Global Search</h3>
          <p className="text-white/40 max-w-md mx-auto">
            Search across all documents, activities, and scheduled tasks. 
            Try searching for "lucas", "heartbeat", "website", or "client".
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['lucas', 'heartbeat', 'website', 'client', 'convex', 'morning'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsSection({ 
  title, 
  icon, 
  count, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        <span className="text-sm text-white/40">{count} results</span>
      </div>
      <div className="divide-y divide-white/5">
        {children}
      </div>
    </div>
  );
}

function DocumentResultItem({ document }: { document: DocumentResult }) {
  return (
    <div className="p-4 hover:bg-white/5 transition-colors group">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-cyan-400 transition-colors">
          {FILE_TYPE_ICONS[document.fileType] || <FileText className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                {document.title}
              </h4>
              <p className="text-sm text-white/50 mt-1 line-clamp-2">
                {document.content}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors flex-shrink-0" />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-white/40 font-mono">{document.filePath}</span>
            <span className="text-xs text-white/40">
              {formatDistanceToNow(document.lastModified, { addSuffix: true })}
            </span>
            {document.tags?.map(tag => (
              <span 
                key={tag}
                className="text-xs text-cyan-400/60 bg-cyan-400/10 px-2 py-0.5 rounded flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityResultItem({ activity }: { activity: ActivityResult }) {
  return (
    <div className="p-4 hover:bg-white/5 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          ${CATEGORY_COLORS[activity.category] || 'text-white/40 bg-white/5'}
        `}>
          <Activity className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-medium">{activity.title}</h4>
          {activity.description && (
            <p className="text-sm text-white/50 mt-1">{activity.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <span className={`
              px-2 py-0.5 text-xs rounded
              ${activity.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
            `}>
              {activity.status}
            </span>
            <span className="text-xs text-white/40 capitalize">{activity.category}</span>
            <span className="text-xs text-white/40 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskResultItem({ task }: { task: TaskResult }) {
  const isPast = task.scheduledFor < Date.now();
  
  return (
    <div className="p-4 hover:bg-white/5 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
          <Calendar className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-medium">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-white/50 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <span className={`
              px-2 py-0.5 text-xs rounded
              ${isPast ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}
            `}>
              {isPast ? 'Overdue' : format(new Date(task.scheduledFor), 'MMM d, h:mm a')}
            </span>
            <span className="text-xs text-white/40 capitalize">{task.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
