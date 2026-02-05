import { Menu, X, BarChart3, Calendar, Target, BookOpen, TrendingUp, Heart } from 'lucide-react';
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
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'health', label: 'Health', icon: Heart },
  ];

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="border-b sticky top-0 z-50" style={{ backgroundColor: '#ffffff', borderColor: '#ede8e3' }}>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
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
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    activeSection === section.id
                      ? 'text-[#c97a5c]'
                      : 'text-[#9b8f85] hover:text-[#2a2520]'
                  }`}
                  style={{
                    backgroundColor: activeSection === section.id ? '#f0ebe5' : 'transparent',
                  }}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#f0ebe5', color: '#2a2520' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-3" style={{ borderColor: '#ede8e3' }}>
            <div className="flex flex-col gap-2">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium w-full ${
                      activeSection === section.id
                        ? 'text-[#c97a5c]'
                        : 'text-[#9b8f85] hover:text-[#2a2520]'
                    }`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#f0ebe5' : 'transparent',
                    }}
                  >
                    <Icon size={18} />
                    {section.label}
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
