'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import Today from '@/components/Today';
import Focus from '@/components/Focus';
import Learning from '@/components/Learning';
import Notes from '@/components/Notes';
import Progress from '@/components/Progress';
import Health from '@/components/Health';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { hydrate, persist } = useStore();

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  useEffect(() => {
    if (!mounted) return;
    const unsubscribe = useStore.subscribe(() => persist());
    return unsubscribe;
  }, [mounted, persist]);

  const componentMap: Record<string, React.ComponentType> = {
    dashboard: Dashboard,
    today: Today,
    focus: Focus,
    learning: Learning,
    notes: Notes,
    progress: Progress,
    health: Health,
  };

  const ActiveComponent = componentMap[activeSection] || Dashboard;

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf8f5' }}>
      {/* Navigation */}
      <Navigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 animate-fadeIn">
          <div className="max-w-5xl mx-auto w-full">
            <ActiveComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
