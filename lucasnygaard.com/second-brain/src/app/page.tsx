import { getAllDocuments, getDocumentsByCategory } from '@/lib/documents';
import { Document } from '@/types';
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: '2nd Brain | Lucas Nygaard',
  description: 'A living knowledge base of ideas, concepts, and daily reflections.',
};

async function getDocuments(category?: string): Promise<Document[]> {
  if (category && category !== 'all') {
    return getDocumentsByCategory(category + 's');
  }
  return getAllDocuments();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const documents = await getDocuments(category);
  const allDocuments = await getAllDocuments();
  
  const categoryCounts = {
    'daily-journal': allDocuments.filter(d => d.category === 'daily-journal').length,
    'concept': allDocuments.filter(d => d.category === 'concept').length,
    'document': allDocuments.filter(d => d.category === 'document').length,
  };
  
  return (
    <ClientPage 
      documents={documents} 
      allDocuments={allDocuments}
      categoryCounts={categoryCounts}
      initialCategory={category || null}
    />
  );
}
