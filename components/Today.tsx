'use client';

import { useStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { CheckCircle2, Calendar, Plus } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Today() {
  const { jobs, interviews, habits, addHabit, updateHabit } = useStore();
  const [newEntry, setNewEntry] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const todayHabits = habits.filter(h => h.date === today);
  const todayInterviews = interviews.filter(i => i.date === today);
  const todayJobs = jobs.filter(j => j.appliedDate === today);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    addHabit({
      date: today,
      category: 'learning',
      description: newEntry,
      completed: false,
    });
    setNewEntry('');
  };

  const toggleComplete = (habitId: string, completed: boolean) => {
    updateHabit(habitId, { completed: !completed });
  };

  const completedCount = todayHabits.filter(h => h.completed).length;
  const completionRate = todayHabits.length > 0 ? Math.round((completedCount / todayHabits.length) * 100) : 0;

  const dateStr = new Date(today + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="page">
      <SectionHeader
        icon={<Calendar size={20} />}
        title={dateStr}
        subtitle="Track your daily progress and accomplishments"
      />

      {/* Quick Stats */}
      {todayHabits.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Today's Progress</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="stat-card">
              <div className="stat-label">Completed</div>
              <div className="stat-value" style={{ color: '#7a8b6f' }}>
                {completedCount}/{todayHabits.length}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Progress</div>
              <div className="stat-value" style={{ color: '#c97a5c' }}>
                {completionRate}%
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Interviews</div>
              <div className="stat-value">{todayInterviews.length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Form */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Add Entry</h2>
          </div>
          <div className="card-elevated p-6">
            <form onSubmit={handleAddEntry} className="space-y-4">
            <div>
              <label className="form-label mb-2 block">What did you accomplish today?</label>
              <textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Share your wins, learnings, or progress..."
                className="w-full p-4 rounded-lg border-1.5 resize-none focus:border-[#c97a5c]"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#2a2520',
                  borderColor: '#ede8e3',
                }}
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary"
              >
              <Plus size={18} />
              Add Entry
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Today's Entries */}
      {todayHabits.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Entries ({completedCount}/{todayHabits.length})</h2>
          </div>
          <div className="space-y-3">
            {todayHabits.map(habit => (
              <div
                key={habit.id}
                className="card p-4 flex items-start gap-4"
              >
                <button
                  onClick={() => toggleComplete(habit.id, habit.completed)}
                  className="mt-1 transition-colors flex-shrink-0"
                >
                  <CheckCircle2
                    size={24}
                    style={{
                      color: habit.completed ? '#7a8b6f' : '#ddd5cc',
                      fill: habit.completed ? '#7a8b6f' : 'none',
                    }}
                  />
                </button>
                <div className="flex-1">
                  <p
                    className={habit.completed ? 'line-through' : ''}
                    style={{ color: habit.completed ? '#9b8f85' : '#2a2520' }}
                  >
                    {habit.description}
                  </p>
                  <p className="text-xs mt-2" style={{ color: '#9b8f85' }}>
                    {habit.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interviews Today */}
      {todayInterviews.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Interviews</h2>
          </div>
          <div className="space-y-3">
            {todayInterviews.map(interview => (
              <div
                key={interview.id}
                className="card p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold" style={{ color: '#2a2520' }}>
                    {interview.type.replace('-', ' ')}
                  </p>
                  <span
                    className="text-lg font-bold px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: '#c97a5c',
                      color: '#ffffff',
                    }}
                  >
                    {interview.score}%
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#9b8f85' }}>
                  {interview.duration} minutes • {interview.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applications Today */}
      {todayJobs.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Applications</h2>
          </div>
          <div className="space-y-3">
            {todayJobs.map(job => (
              <div
                key={job.id}
                className="card p-4"
              >
                <p className="font-semibold" style={{ color: '#2a2520' }}>
                  {job.position}
                </p>
                <p style={{ color: '#9b8f85' }}>{job.company}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {todayHabits.length === 0 && todayInterviews.length === 0 && todayJobs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#2a2520' }}>No entries yet</h3>
            <p style={{ color: '#9b8f85' }}>Start by adding what you're working on today.</p>
          </div>
        </div>
      )}
    </div>
  );
}
