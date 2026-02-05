'use client';

import { useStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { CheckCircle2, Briefcase, MessageSquare, Calendar, Plus } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b pb-6" style={{ borderColor: '#ede8e3' }}>
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={32} style={{ color: '#c97a5c' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#2a2520' }}>
            {dateStr}
          </h1>
        </div>
        <p className="text-base" style={{ color: '#9b8f85' }}>Track your daily progress and accomplishments</p>
      </div>

      {/* Quick Stats */}
      {todayHabits.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Today's Progress</h2>
          <div className="grid grid-cols-3 gap-4">
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
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Add Entry</h2>
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
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Entry
            </button>
          </form>
        </div>
      </div>

      {/* Today's Entries */}
      {todayHabits.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>
            Entries ({completedCount}/{todayHabits.length})
          </h2>
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
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 flex items-center gap-2" style={{ color: '#9b8f85' }}>
            <Briefcase size={16} />
            Interviews
          </h2>
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
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4 flex items-center gap-2" style={{ color: '#9b8f85' }}>
            <MessageSquare size={16} />
            Applications
          </h2>
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
        <div className="card-elevated p-16 text-center">
          <p className="text-6xl mb-4">📝</p>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#2a2520' }}>No entries yet</h3>
          <p style={{ color: '#9b8f85' }}>Start by adding what you're working on today</p>
        </div>
      )}
    </div>
  );
}
