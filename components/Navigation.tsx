import { Menu, X, BarChart3, Calendar, Target, BookOpen, TrendingUp, Heart, Code2 } from 'lucide-react';
import Image from 'next/image';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({ activeSection, onSectionChange, mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'focus', label: 'Focus', icon: Target },
    { id: 'learning', label: 'Learning', icon: Code2 },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'health', label: 'Health', icon: Heart },
  ];

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="border-b sticky top-0 z-50 glass" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#ede8e3' }}>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden gradient-primary transition-transform group-hover:scale-110">
              <Image
                src="/ibtech.png"
                alt="IBTech Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold" style={{ color: '#2a2520' }}>Career</h1>
              <p className="text-xs" style={{ color: '#9b8f85' }}>Dashboard</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium relative group ${
                    isActive
                      ? 'text-[#c97a5c]'
                      : 'text-[#9b8f85] hover:text-[#2a2520]'
                  }`}
                  style={{
                    backgroundColor: isActive ? '#f0ebe5' : 'transparent',
                  }}
                >
                  <Icon size={18} />
                  {section.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 gradient-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-all hover-lift"
            style={{ backgroundColor: '#f0ebe5', color: '#2a2520' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-3 animate-slideDown" style={{ borderColor: '#ede8e3' }}>
            <div className="flex flex-col gap-2">
              {sections.map(section => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium w-full relative ${
                      isActive
                        ? 'text-[#c97a5c]'
                        : 'text-[#9b8f85] hover:text-[#2a2520]'
                    }`}
                    style={{
                      backgroundColor: isActive ? '#f0ebe5' : 'transparent',
                    }}
                  >
                    <Icon size={18} />
                    {section.label}
                    {isActive && (
                      <div className="absolute right-4 w-2 h-2 rounded-full gradient-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
