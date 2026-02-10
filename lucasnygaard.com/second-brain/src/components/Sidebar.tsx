'use client';

import { Search, Brain, Filter } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  categoryCounts: Record<string, number>;
}

const categories = [
  { id: null, label: 'All Documents', color: 'bg-slate-500' },
  { id: 'daily-journal', label: 'Daily Journals', color: 'bg-blue-500' },
  { id: 'concept', label: 'Concepts', color: 'bg-amber-500' },
  { id: 'document', label: 'Documents', color: 'bg-slate-400' },
];

export function Sidebar({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  totalCount,
  categoryCounts 
}: SidebarProps) {
  return (
    <aside className="w-64 h-full bg-slate-50 border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900">2nd Brain</h1>
            <p className="text-xs text-slate-500">Lucas Nygaard</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex items-center gap-2 mb-3 px-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Filter by Type</span>
        </div>
        
        <nav className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat.id || 'all'}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-600 hover:bg-white/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                <span>{cat.label}</span>
              </div>
              <span className="text-xs text-slate-400">
                {cat.id === null ? totalCount : categoryCounts[cat.id] || 0}
              </span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-400 text-center">
          <p>Built by Harry</p>
          <p className="mt-1">Updates nightly at 11pm</p>
        </div>
      </div>
    </aside>
  );
}
