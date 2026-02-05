'use client';

import { useStore, HealthEntry } from '@/lib/store';
import { useState, useEffect } from 'react';
import { Heart, Trash2, Edit2, Plus, Activity } from 'lucide-react';

export default function Health() {
  const { health, addHealth, updateHealth, deleteHealth } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [today, setToday] = useState('');
  const [healthData, setHealthData] = useState<Partial<HealthEntry>>({
    mood: 'good',
    energy: 5,
    sleep: 7,
    exercise: false,
    symptoms: '',
    actions: '',
    notes: '',
    date: '',
  });

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    setToday(todayStr);
    setHealthData(prev => ({ ...prev, date: todayStr }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!healthData.date) return;

    if (editingId) {
      updateHealth(editingId, healthData);
      setEditingId(null);
    } else {
      addHealth(healthData as Omit<HealthEntry, 'id'>);
    }

    setHealthData({
      mood: 'good',
      energy: 5,
      sleep: 7,
      exercise: false,
      symptoms: '',
      actions: '',
      notes: '',
      date: today,
    });
    setShowForm(false);
  };

  const handleEdit = (entry: HealthEntry) => {
    setHealthData(entry);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const todayHealth = health.find(h => h.date === today);

  const moodEmojis = {
    excellent: '😄',
    good: '🙂',
    okay: '😐',
    poor: '😔',
  };

  const moodLabels = {
    excellent: 'Excellent',
    good: 'Good',
    okay: 'Okay',
    poor: 'Poor',
  };

  const sortedHealth = [...health].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b pb-6" style={{ borderColor: '#ede8e3' }}>
        <div className="flex items-center gap-3 mb-2">
          <Heart size={32} style={{ color: '#c97a5c' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#2a2520' }}>
            Health
          </h1>
        </div>
        <p className="text-base" style={{ color: '#9b8f85' }}>Track your daily wellness and health</p>
      </div>

      {/* Today's Health Summary */}
      {todayHealth && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Today's Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Mood */}
            <div className="card-elevated p-6">
              <div className="text-4xl mb-2">{moodEmojis[todayHealth.mood]}</div>
              <div className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Mood</div>
              <div className="text-lg font-bold" style={{ color: '#2a2520' }}>
                {moodLabels[todayHealth.mood]}
              </div>
            </div>

            {/* Energy */}
            <div className="card-elevated p-6">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Energy</div>
              <div className="text-lg font-bold" style={{ color: '#7a8b6f' }}>
                {todayHealth.energy}/10
              </div>
            </div>

            {/* Sleep */}
            <div className="card-elevated p-6">
              <div className="text-4xl mb-2">😴</div>
              <div className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Sleep</div>
              <div className="text-lg font-bold" style={{ color: '#7a8b6f' }}>
                {todayHealth.sleep}h
              </div>
            </div>

            {/* Exercise */}
            <div className="card-elevated p-6">
              <div className="text-4xl mb-2">🏃</div>
              <div className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Exercise</div>
              <div className="text-lg font-bold" style={{ color: todayHealth.exercise ? '#7a8b6f' : '#9b8f85' }}>
                {todayHealth.exercise ? 'Done' : 'Not Done'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {!showForm && (
        <div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center justify-center gap-2 w-full"
          >
            <Plus size={20} />
            {todayHealth ? 'Update Today\'s Health' : 'Log Health Entry'}
          </button>
        </div>
      )}

      {showForm && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>
            {editingId ? 'Edit Health Entry' : 'New Health Entry'}
          </h2>
          <form onSubmit={handleSubmit} className="card-elevated p-6 space-y-4 animate-slideUp">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label mb-2 block">Date</label>
                <input
                  type="date"
                  value={healthData.date || ''}
                  onChange={(e) => setHealthData({ ...healthData, date: e.target.value })}
                  className="w-full p-3 rounded-lg border-1.5"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                />
              </div>
              <div>
                <label className="form-label mb-2 block">Mood</label>
                <select
                  value={healthData.mood || 'good'}
                  onChange={(e) => setHealthData({ ...healthData, mood: e.target.value as any })}
                  className="w-full p-3 rounded-lg border-1.5 font-medium"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                >
                  <option value="excellent">😄 Excellent</option>
                  <option value="good">🙂 Good</option>
                  <option value="okay">😐 Okay</option>
                  <option value="poor">😔 Poor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label mb-2 block">Energy Level (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={healthData.energy || 5}
                  onChange={(e) => setHealthData({ ...healthData, energy: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-center text-sm font-semibold mt-1" style={{ color: '#7a8b6f' }}>
                  {healthData.energy}/10
                </div>
              </div>
              <div>
                <label className="form-label mb-2 block">Sleep Hours</label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={healthData.sleep || 7}
                  onChange={(e) => setHealthData({ ...healthData, sleep: parseFloat(e.target.value) })}
                  className="w-full p-3 rounded-lg border-1.5"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                />
              </div>
            </div>

            <div>
              <label className="form-label mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={healthData.exercise || false}
                  onChange={(e) => setHealthData({ ...healthData, exercise: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span>Did you exercise today?</span>
              </label>
            </div>

            <div>
              <label className="form-label mb-2 block">Symptoms or Issues</label>
              <textarea
                placeholder="Any pain, discomfort, or health concerns..."
                value={healthData.symptoms || ''}
                onChange={(e) => setHealthData({ ...healthData, symptoms: e.target.value })}
                className="w-full p-3 rounded-lg border-1.5 resize-none"
                style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                rows={3}
              />
            </div>

            <div>
              <label className="form-label mb-2 block">Actions Taken</label>
              <textarea
                placeholder="What did you do to address any issues? (e.g., took medication, rested, drank water, etc.)"
                value={healthData.actions || ''}
                onChange={(e) => setHealthData({ ...healthData, actions: e.target.value })}
                className="w-full p-3 rounded-lg border-1.5 resize-none"
                style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                rows={3}
              />
            </div>

            <div>
              <label className="form-label mb-2 block">Additional Notes</label>
              <textarea
                placeholder="Any other health observations..."
                value={healthData.notes || ''}
                onChange={(e) => setHealthData({ ...healthData, notes: e.target.value })}
                className="w-full p-3 rounded-lg border-1.5 resize-none"
                style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                {editingId ? 'Update' : 'Save'} Entry
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setHealthData({
                    mood: 'good',
                    energy: 5,
                    sleep: 7,
                    exercise: false,
                    symptoms: '',
                    actions: '',
                    notes: '',
                    date: today,
                  });
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Health History */}
      {sortedHealth.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Health History</h2>
          <div className="space-y-3">
            {sortedHealth.map(entry => (
              <div key={entry.id} className="card p-4 group">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                      <div>
                        <p className="font-semibold" style={{ color: '#2a2520' }}>
                          {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-xs" style={{ color: '#9b8f85' }}>
                          {moodLabels[entry.mood]} • Energy: {entry.energy}/10 • Sleep: {entry.sleep}h
                        </p>
                      </div>
                    </div>
                    {entry.symptoms && (
                      <p className="text-sm mt-2" style={{ color: '#c97a5c' }}>
                        <span className="font-semibold">Issues:</span> {entry.symptoms}
                      </p>
                    )}
                    {entry.actions && (
                      <p className="text-sm mt-1" style={{ color: '#7a8b6f' }}>
                        <span className="font-semibold">Actions:</span> {entry.actions}
                      </p>
                    )}
                    {entry.notes && (
                      <p className="text-sm mt-1" style={{ color: '#9b8f85' }}>
                        <span className="font-semibold">Notes:</span> {entry.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#f0ebe5', color: '#2a2520' }}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteHealth(entry.id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#fecaca', color: '#991b1b' }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {health.length === 0 && !showForm && (
        <div className="card-elevated p-16 text-center">
          <p className="text-6xl mb-4">❤️</p>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#2a2520' }}>No health entries yet</h3>
          <p style={{ color: '#9b8f85' }}>Start tracking your daily wellness</p>
        </div>
      )}
    </div>
  );
}
