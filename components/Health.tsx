'use client';

import { useStore, HealthEntry, MigraineEntry } from '@/lib/store';
import { useState, useEffect } from 'react';
import { Heart, Trash2, Edit2, Plus } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Health() {
  const { health, addHealth, updateHealth, deleteHealth, migraines, addMigraine, updateMigraine, deleteMigraine } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [showMigraineForm, setShowMigraineForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingMigraineId, setEditingMigraineId] = useState<string | null>(null);
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
  const [migraineData, setMigraineData] = useState<Partial<MigraineEntry>>({
    hadMigraine: false,
    severity: 5,
    duration: 2,
    location: '',
    triggers: '',
    medications: '',
    relievedBy: '',
    notes: '',
    date: '',
  });

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    setToday(todayStr);
    setHealthData(prev => ({ ...prev, date: todayStr }));
    setMigraineData(prev => ({ ...prev, date: todayStr }));
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

  const handleMigraineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!migraineData.date) return;

    if (editingMigraineId) {
      updateMigraine(editingMigraineId, migraineData);
      setEditingMigraineId(null);
    } else {
      addMigraine(migraineData as Omit<MigraineEntry, 'id'>);
    }

    setMigraineData({
      hadMigraine: false,
      severity: 5,
      duration: 2,
      location: '',
      triggers: '',
      medications: '',
      relievedBy: '',
      notes: '',
      date: today,
    });
    setShowMigraineForm(false);
  };

  const handleEditMigraine = (entry: MigraineEntry) => {
    setMigraineData(entry);
    setEditingMigraineId(entry.id);
    setShowMigraineForm(true);
  };

  const todayHealth = health.find(h => h.date === today);
  const todayMigraine = migraines.find(m => m.date === today);

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
    <div className="page">
      <SectionHeader
        icon={<Heart size={20} />}
        title="Health"
        subtitle="Track your daily wellness and health"
        action={!showForm ? { label: todayHealth ? "Update today's health" : 'Log health entry', onClick: () => setShowForm(true) } : undefined}
      />

      {/* Today's Health Summary */}
      {todayHealth && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Today's Status</h2>
          </div>
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
      {showForm && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">{editingId ? 'Edit Health Entry' : 'New Health Entry'}</h2>
          </div>
          <form onSubmit={handleSubmit} className="card-elevated p-6 space-y-4 animate-slideUp">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Migraine Tracking Section */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Migraine Tracking</h2>
          {!showMigraineForm && (
            <button onClick={() => setShowMigraineForm(true)} className="btn-secondary">
              <Plus size={16} />
              {todayMigraine ? 'Update entry' : 'Log entry'}
            </button>
          )}
        </div>
        <p className="section-subtitle">Monitor your migraine patterns and triggers</p>

        {/* Today's Migraine Status */}
        {todayMigraine && (
          <div className="mb-6">
            <div className="section-header">
              <h3 className="section-title">Today's Migraine Status</h3>
            </div>
            <div className="card-elevated p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{todayMigraine.hadMigraine ? '🤕' : '✅'}</span>
                    <div>
                      <p className="font-semibold" style={{ color: '#2a2520' }}>
                        {todayMigraine.hadMigraine ? 'Migraine Recorded' : 'No Migraine'}
                      </p>
                      {todayMigraine.hadMigraine && (
                        <p className="text-sm" style={{ color: '#9b8f85' }}>
                          Severity: {todayMigraine.severity}/10 • Duration: {todayMigraine.duration}h
                        </p>
                      )}
                    </div>
                  </div>
                  {todayMigraine.hadMigraine && todayMigraine.location && (
                    <p className="text-sm mt-2" style={{ color: '#c97a5c' }}>
                      <span className="font-semibold">Location:</span> {todayMigraine.location}
                    </p>
                  )}
                  {todayMigraine.hadMigraine && todayMigraine.triggers && (
                    <p className="text-sm mt-1" style={{ color: '#9b8f85' }}>
                      <span className="font-semibold">Triggers:</span> {todayMigraine.triggers}
                    </p>
                  )}
                  {todayMigraine.hadMigraine && todayMigraine.medications && (
                    <p className="text-sm mt-1" style={{ color: '#7a8b6f' }}>
                      <span className="font-semibold">Medications:</span> {todayMigraine.medications}
                    </p>
                  )}
                  {todayMigraine.hadMigraine && todayMigraine.relievedBy && (
                    <p className="text-sm mt-1" style={{ color: '#7a8b6f' }}>
                      <span className="font-semibold">Relieved By:</span> {todayMigraine.relievedBy}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleEditMigraine(todayMigraine)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ backgroundColor: '#f0ebe5', color: '#2a2520' }}
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {showMigraineForm && (
          <div className="mb-6">
            <div className="section-header">
              <h3 className="section-title">{editingMigraineId ? 'Edit Migraine Entry' : 'New Migraine Entry'}</h3>
            </div>
            <form onSubmit={handleMigraineSubmit} className="card-elevated p-6 space-y-4 animate-slideUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-2 block">Date</label>
                  <input
                    type="date"
                    value={migraineData.date || ''}
                    onChange={(e) => setMigraineData({ ...migraineData, date: e.target.value })}
                    className="w-full p-3 rounded-lg border-1.5"
                    style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                  />
                </div>
                <div>
                  <label className="form-label mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={migraineData.hadMigraine || false}
                      onChange={(e) => setMigraineData({ ...migraineData, hadMigraine: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span>Had a migraine today?</span>
                  </label>
                </div>
              </div>

              {migraineData.hadMigraine && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label mb-2 block">Severity (1-10)</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={migraineData.severity || 5}
                        onChange={(e) => setMigraineData({ ...migraineData, severity: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <div className="text-center text-sm font-semibold mt-1" style={{ color: '#c97a5c' }}>
                        {migraineData.severity}/10
                      </div>
                    </div>
                    <div>
                      <label className="form-label mb-2 block">Duration (hours)</label>
                      <input
                        type="number"
                        min="0.5"
                        max="24"
                        step="0.5"
                        value={migraineData.duration || 2}
                        onChange={(e) => setMigraineData({ ...migraineData, duration: parseFloat(e.target.value) })}
                        className="w-full p-3 rounded-lg border-1.5"
                        style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label mb-2 block">Location</label>
                    <select
                      value={migraineData.location || ''}
                      onChange={(e) => setMigraineData({ ...migraineData, location: e.target.value })}
                      className="w-full p-3 rounded-lg border-1.5"
                      style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                    >
                      <option value="">Select location...</option>
                      <option value="Left side">Left side</option>
                      <option value="Right side">Right side</option>
                      <option value="Both sides">Both sides</option>
                      <option value="Front">Front</option>
                      <option value="Back">Back</option>
                      <option value="Top">Top</option>
                      <option value="Around eyes">Around eyes</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label mb-2 block">Possible Triggers</label>
                    <textarea
                      placeholder="e.g., stress, lack of sleep, certain foods, weather changes, hormones..."
                      value={migraineData.triggers || ''}
                      onChange={(e) => setMigraineData({ ...migraineData, triggers: e.target.value })}
                      className="w-full p-3 rounded-lg border-1.5 resize-none"
                      style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label mb-2 block">Medications Taken</label>
                    <textarea
                      placeholder="e.g., Ibuprofen 400mg, Sumatriptan, etc."
                      value={migraineData.medications || ''}
                      onChange={(e) => setMigraineData({ ...migraineData, medications: e.target.value })}
                      className="w-full p-3 rounded-lg border-1.5 resize-none"
                      style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label mb-2 block">What Helped?</label>
                    <textarea
                      placeholder="e.g., rest, dark room, ice pack, heat, massage, fresh air..."
                      value={migraineData.relievedBy || ''}
                      onChange={(e) => setMigraineData({ ...migraineData, relievedBy: e.target.value })}
                      className="w-full p-3 rounded-lg border-1.5 resize-none"
                      style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label mb-2 block">Additional Notes</label>
                    <textarea
                      placeholder="Any other observations about this migraine..."
                      value={migraineData.notes || ''}
                      onChange={(e) => setMigraineData({ ...migraineData, notes: e.target.value })}
                      className="w-full p-3 rounded-lg border-1.5 resize-none"
                      style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                      rows={2}
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  {editingMigraineId ? 'Update' : 'Save'} Entry
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMigraineForm(false);
                    setEditingMigraineId(null);
                    setMigraineData({
                      hadMigraine: false,
                      severity: 5,
                      duration: 2,
                      location: '',
                      triggers: '',
                      medications: '',
                      relievedBy: '',
                      notes: '',
                      date: today,
                    });
                  }}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Migraine History */}
        {migraines.length > 0 && (
          <div>
            <div className="section-header">
              <h3 className="section-title">Migraine History</h3>
            </div>
            <div className="space-y-3">
              {[...migraines].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(entry => (
                <div key={entry.id} className="card p-4 group">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{entry.hadMigraine ? '🤕' : '✅'}</span>
                        <div>
                          <p className="font-semibold" style={{ color: '#2a2520' }}>
                            {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          {entry.hadMigraine && (
                            <p className="text-xs" style={{ color: '#9b8f85' }}>
                              Severity: {entry.severity}/10 • Duration: {entry.duration}h
                            </p>
                          )}
                        </div>
                      </div>
                      {entry.hadMigraine && entry.location && (
                        <p className="text-sm mt-2" style={{ color: '#c97a5c' }}>
                          <span className="font-semibold">Location:</span> {entry.location}
                        </p>
                      )}
                      {entry.hadMigraine && entry.triggers && (
                        <p className="text-sm mt-1" style={{ color: '#9b8f85' }}>
                          <span className="font-semibold">Triggers:</span> {entry.triggers}
                        </p>
                      )}
                      {entry.hadMigraine && entry.medications && (
                        <p className="text-sm mt-1" style={{ color: '#7a8b6f' }}>
                          <span className="font-semibold">Medications:</span> {entry.medications}
                        </p>
                      )}
                      {entry.hadMigraine && entry.relievedBy && (
                        <p className="text-sm mt-1" style={{ color: '#7a8b6f' }}>
                          <span className="font-semibold">Relieved By:</span> {entry.relievedBy}
                        </p>
                      )}
                      {entry.hadMigraine && entry.notes && (
                        <p className="text-sm mt-1" style={{ color: '#9b8f85' }}>
                          <span className="font-semibold">Notes:</span> {entry.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditMigraine(entry)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ backgroundColor: '#f0ebe5', color: '#2a2520' }}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteMigraine(entry.id)}
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
      </div>
      {sortedHealth.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Health History</h2>
          </div>
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
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#2a2520' }}>No health entries yet</h3>
            <p style={{ color: '#9b8f85' }}>Start tracking your daily wellness.</p>
          </div>
        </div>
      )}
    </div>
  );
}
