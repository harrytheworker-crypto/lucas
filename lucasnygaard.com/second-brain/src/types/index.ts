export interface Document {
  slug: string;
  title: string;
  date: string;
  category: 'daily-journal' | 'concept' | 'document';
  tags: string[];
  excerpt: string;
  content: string;
  readingTime: number;
}

export interface DocumentMeta {
  slug: string;
  title: string;
  date: string;
  category: 'daily-journal' | 'concept' | 'document';
  tags: string[];
  excerpt: string;
  readingTime: number;
}
