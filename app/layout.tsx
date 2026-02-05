import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Career Dashboard',
  description: 'A calm space to track your career journey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
