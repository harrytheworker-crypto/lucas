'use client';

import { Document } from '@/types';
import { X, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-900 mb-6">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-slate-800 mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">$1</h3>')
    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
    .replace(/\\*(.*?)\\*/g, '<em class="italic text-slate-700">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^\\* (.*$)/gim, '<li class="ml-4 text-slate-700 leading-relaxed">$1</li>')
    .replace(/^\\d+\\. (.*$)/gim, '<li class="ml-4 text-slate-700 leading-relaxed list-decimal">$1</li>')
    .replace(/\\n\\n/g, '</p><p class="text-slate-700 leading-relaxed mb-4">')
    .replace(/^/g, '<p class="text-slate-700 leading-relaxed mb-4">')
    .replace(/$/g, '</p>');
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative ml-auto h-full w-full max-w-3xl bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {document.category.replace('-', ' ')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">{document.title}</h1>
            
            <div className="flex items-center gap-6 mb-8 text-sm text-slate-500 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(document.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{document.readingTime} min read</span>
              </div>
            </div>
            
            {document.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-8 flex-wrap">
                <Tag className="w-4 h-4 text-slate-400" />
                {document.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(document.content) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
