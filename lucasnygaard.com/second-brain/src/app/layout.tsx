import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2nd Brain | Lucas Nygaard",
  description: "A living knowledge base of ideas, concepts, and daily reflections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
