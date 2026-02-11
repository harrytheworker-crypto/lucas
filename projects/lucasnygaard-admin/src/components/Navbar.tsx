'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/harry');

  if (isAdmin) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container-site flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
          Lucas Nygaard
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</Link>
          <Link href="/case-studies" className="text-gray-600 hover:text-gray-900 transition-colors">Case Studies</Link>
          <Link href="/contact" className="btn-primary">Book a Call</Link>
        </div>
      </div>
    </nav>
  );
}
