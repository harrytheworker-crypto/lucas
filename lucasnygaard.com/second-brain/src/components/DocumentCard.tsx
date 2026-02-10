'use client';

import { Document } from '@/types';
import { format } from 'date-fns';
import { FileText, Lightbulb, BookOpen, Clock } from 'lucide-react';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
}

const categoryIcons = {
  'daily-journal': BookOpen,
  'concept': Lightbulb,
  'document': FileText,
};

const categoryColors = {
  'daily-journal': 'bg-blue-50 text-blue-700 border-blue-200',
  'concept': 'bg-amber-50 text-amber-700 border-amber-200',
  'document': 'bg-slate-50 text-slate-700 border-slate-200',
};

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const Icon = categoryIcons[document.category];
  
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[document.category]}`}>
          <Icon className="w-3.5 h-3.5" />
          <span className="capitalize">{document.category.replace('-', ' ')}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{document.readingTime} min</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {document.title}
      </h3>
      
      <p className="text-sm text-slate-600 line-clamp-2 mb-3">
        {document.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {document.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-400">
          {format(new Date(document.date), 'MMM d, yyyy')}
        </span>
      </div>
    </div>
  );
}
