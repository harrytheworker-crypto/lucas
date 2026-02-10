import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Document, DocumentMeta } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function getDocumentFromFile(filePath: string, category: string): Document | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const slug = path.basename(filePath, '.md');
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString().split('T')[0],
      category: category as any,
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 200).replace(/#|\\*|\\[|\\]/g, '') + '...',
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

export function getAllDocuments(): Document[] {
  const documents: Document[] = [];
  const categories = ['daily-journals', 'concepts', 'documents'];
  
  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    if (!fs.existsSync(categoryPath)) continue;
    
    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const doc = getDocumentFromFile(path.join(categoryPath, file), category.slice(0, -1) as any);
        if (doc) documents.push(doc);
      }
    }
  }
  
  return documents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDocumentsByCategory(category: string): Document[] {
  const categoryPath = path.join(contentDirectory, category);
  if (!fs.existsSync(categoryPath)) return [];
  
  const files = fs.readdirSync(categoryPath);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => getDocumentFromFile(path.join(categoryPath, file), category.slice(0, -1) as any))
    .filter((doc): doc is Document => doc !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDocumentBySlug(slug: string, category: string): Document | null {
  const filePath = path.join(contentDirectory, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return getDocumentFromFile(filePath, category.slice(0, -1) as any);
}

export function getAllTags(): string[] {
  const documents = getAllDocuments();
  const tags = new Set<string>();
  documents.forEach(doc => doc.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}
