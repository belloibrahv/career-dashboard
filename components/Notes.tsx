'use client';

import { useStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { Trash2, BookOpen, PenTool, Briefcase, MessageSquare } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Notes() {
  const { habits, addHabit, deleteHabit } = useStore();
  const [newNote, setNewNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'learning' | 'writing' | 'freelancing' | 'interview-prep'>('learning');
  const [today, setToday] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addHabit({
      date: today,
      category: selectedCategory,
      description: newNote,
      completed: false,
    });
    setNewNote('');
    setShowForm(false);
  };

  const groupedByDate = habits.reduce((acc, habit) => {
    if (!acc[habit.date]) acc[habit.date] = [];
    acc[habit.date].push(habit);
    return acc;
  }, {} as Record<string, typeof habits>);

  const sortedDates = Object.keys(groupedByDate).sort().reverse();

  const categoryIcons: Record<string, React.ReactNode> = {
    learning: <BookOpen size={16} />,
    writing: <PenTool size={16} />,
    freelancing: <Briefcase size={16} />,
    'interview-prep': <MessageSquare size={16} />,
  };

  const categoryColors: Record<string, string> = {
    learning: '#7a8b6f',
    writing: '#c97a5c',
    freelancing: '#9b8f85',
    'interview-prep': '#c97a5c',
  };

  const categoryLabels: Record<string, string> = {
    learning: 'Learning',
    writing: 'Writing',
    freelancing: 'Freelancing',
    'interview-prep': 'Interview Prep',
  };

  return (
    <div className="page">
      <SectionHeader
        icon={<BookOpen size={20} />}
        title="Notes"
        subtitle="Capture your thoughts and insights"
        action={!showForm ? { label: 'Add note', onClick: () => setShowForm(true) } : undefined}
      />

      {showForm && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">New Note</h2>
          </div>
          <form onSubmit={handleAddNote} className="card-elevated p-6 space-y-4 animate-slideUp">
            <div>
              <label className="form-label mb-2 block">Note</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="What's on your mind? Strategies, insights, learnings..."
                className="w-full p-4 rounded-lg border-1.5 resize-none focus:border-[#c97a5c]"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#2a2520',
                  borderColor: '#ede8e3',
                }}
                rows={5}
                autoFocus
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="form-label mb-2 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-lg border-1.5 font-medium"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                >
                  <option value="learning">📚 Learning</option>
                  <option value="writing">✍️ Writing</option>
                  <option value="freelancing">💼 Freelancing</option>
                  <option value="interview-prep">💬 Interview Prep</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto"
                >
                  Save note
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-secondary w-full sm:w-auto"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Notes Timeline */}
      {sortedDates.length > 0 ? (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Timeline</h2>
          </div>
          <div className="space-y-8">
            {sortedDates.map(date => (
              <div key={date} className="animate-slideUp">
                <p className="text-sm font-semibold mb-4 px-4" style={{ color: '#9b8f85' }}>
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: '#ede8e3' }}>
                  {groupedByDate[date].map(note => (
                    <div
                      key={note.id}
                      className="card p-4 group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span style={{ color: categoryColors[note.category] }}>
                              {categoryIcons[note.category]}
                            </span>
                            <span
                              className="text-xs font-semibold px-2 py-1 rounded-lg"
                              style={{
                                backgroundColor: categoryColors[note.category] + '15',
                                color: categoryColors[note.category],
                              }}
                            >
                              {categoryLabels[note.category]}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: '#2a2520' }}>
                            {note.description}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteHabit(note.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: '#fecaca', color: '#991b1b' }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#2a2520' }}>No notes yet</h3>
            <p style={{ color: '#9b8f85' }}>Start capturing your thoughts.</p>
          </div>
        </div>
      )}
    </div>
  );
}
