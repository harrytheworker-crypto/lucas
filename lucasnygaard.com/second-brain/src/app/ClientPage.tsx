'use client';

import { useState, useMemo } from 'react';
import { Document } from '@/types';
import { DocumentCard } from '@/components/DocumentCard';
import { DocumentViewer } from '@/components/DocumentViewer';
import { Sidebar } from '@/components/Sidebar';
import { Brain } from 'lucide-react';

interface ClientPageProps {
  documents: Document[];
  allDocuments: Document[];
  categoryCounts: Record<string, number>;
  initialCategory: string | null;
}

export default function ClientPage({ 
  documents, 
  allDocuments,
  categoryCounts,
  initialCategory 
}: ClientPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = useMemo(() => {
    let filtered = selectedCategory 
      ? allDocuments.filter(d => d.category === selectedCategory)
      : allDocuments;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(query) ||
        d.content.toLowerCase().includes(query) ||
        d.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [allDocuments, selectedCategory, searchQuery]);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={allDocuments.length}
        categoryCounts={categoryCounts}
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {selectedCategory 
                ? selectedCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                : 'All Documents'
              }
            </h2>
            <p className="text-slate-500">
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map(doc => (
                <DocumentCard
                  key={`${doc.category}-${doc.slug}`}
                  document={doc}
                  onClick={() => setSelectedDocument(doc)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No documents found</h3>
              <p className="text-slate-500 max-w-sm">
                {searchQuery 
                  ? "No documents match your search. Try different keywords."
                  : "This is where your knowledge will accumulate. Documents will appear here as they're created."
                }
              </p>
            </div>
          )}
        </div>
      </main>
      
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}
