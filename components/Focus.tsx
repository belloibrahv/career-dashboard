'use client';

import { useStore, JobApplication } from '@/lib/store';
import { useState } from 'react';
import { Trash2, Edit2, Briefcase } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Focus() {
  const { jobs, addJob, updateJob, deleteJob } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    company: '',
    position: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'applied',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.position) return;

    if (editingId) {
      updateJob(editingId, formData);
      setEditingId(null);
    } else {
      addJob(formData as Omit<JobApplication, 'id'>);
    }
    setFormData({
      company: '',
      position: '',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      notes: '',
    });
    setIsAdding(false);
  };

  const handleEdit = (job: JobApplication) => {
    setFormData(job);
    setEditingId(job.id);
    setIsAdding(true);
  };

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'applied').length,
    interviews: jobs.filter(j => j.status === 'interview').length,
    offers: jobs.filter(j => j.status === 'offer').length,
  };

  const statusConfig = {
    applied: { bg: '#dbeafe', text: '#1e40af', label: 'Applied' },
    interview: { bg: '#fed7aa', text: '#92400e', label: 'Interview' },
    rejected: { bg: '#fecaca', text: '#991b1b', label: 'Rejected' },
    offer: { bg: '#bbf7d0', text: '#065f46', label: 'Offer' },
  };

  return (
    <div className="page">
      <SectionHeader
        icon={<Briefcase size={20} />}
        title="Job Applications"
        subtitle="Track your career opportunities"
        action={!isAdding ? { label: 'Add Application', onClick: () => setIsAdding(true) } : undefined}
      />

      {/* Stats */}
      {jobs.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Overview</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Applied</div>
              <div className="stat-value" style={{ color: '#1e40af' }}>{stats.applied}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Interviews</div>
              <div className="stat-value" style={{ color: '#92400e' }}>{stats.interviews}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Offers</div>
              <div className="stat-value" style={{ color: '#065f46' }}>{stats.offers}</div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
            {editingId ? 'Edit Application' : 'Add New Application'}
            </h2>
          </div>
          <div className="card-elevated p-6 animate-slideUp">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-2 block">Company</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border-1.5 rounded-lg focus:border-[#c97a5c]"
                    style={{ borderColor: '#ede8e3', backgroundColor: '#ffffff', color: '#2a2520' }}
                  />
                </div>
                <div>
                  <label className="form-label mb-2 block">Position</label>
                  <input
                    type="text"
                    placeholder="Job title"
                    value={formData.position || ''}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border-1.5 rounded-lg focus:border-[#c97a5c]"
                    style={{ borderColor: '#ede8e3', backgroundColor: '#ffffff', color: '#2a2520' }}
                  />
                </div>
                <div>
                  <label className="form-label mb-2 block">Applied Date</label>
                  <input
                    type="date"
                    value={formData.appliedDate || ''}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full px-4 py-3 border-1.5 rounded-lg focus:border-[#c97a5c]"
                    style={{ borderColor: '#ede8e3', backgroundColor: '#ffffff', color: '#2a2520' }}
                  />
                </div>
                <div>
                  <label className="form-label mb-2 block">Status</label>
                  <select
                    value={formData.status || 'applied'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-3 border-1.5 rounded-lg focus:border-[#c97a5c]"
                    style={{ borderColor: '#ede8e3', backgroundColor: '#ffffff', color: '#2a2520' }}
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label mb-2 block">Notes (Optional)</label>
                <textarea
                  placeholder="Add any notes about this application..."
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-1.5 rounded-lg focus:border-[#c97a5c] resize-none"
                  style={{ borderColor: '#ede8e3', backgroundColor: '#ffffff', color: '#2a2520' }}
                  rows={3}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto"
                >
                  {editingId ? 'Update' : 'Add'} Application
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({
                      company: '',
                      position: '',
                      appliedDate: new Date().toISOString().split('T')[0],
                      status: 'applied',
                      notes: '',
                    });
                  }}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Jobs List */}
      {jobs.length > 0 ? (
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Applications</h2>
          </div>
          <div className="space-y-3">
            {jobs.map(job => {
              const config = statusConfig[job.status];
              return (
                <div
                  key={job.id}
                  className="card p-4 border-l-4"
                  style={{ borderLeftColor: '#c97a5c' }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h4 className="text-base font-bold" style={{ color: '#2a2520' }}>
                        {job.position}
                      </h4>
                      <p className="text-sm mt-1" style={{ color: '#9b8f85' }}>
                        {job.company}
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0"
                      style={{ backgroundColor: config.bg, color: config.text }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: '#9b8f85' }}>
                    Applied: {new Date(job.appliedDate).toLocaleDateString()}
                  </p>
                  {job.notes && (
                    <p className="text-sm mb-3 italic" style={{ color: '#9b8f85' }}>
                      {job.notes}
                    </p>
                  )}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#f0ebe5', color: '#2a2520' }}
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#fecaca', color: '#991b1b' }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#2a2520' }}>No applications yet</h3>
            <p style={{ color: '#9b8f85' }}>Start tracking your job search.</p>
          </div>
        </div>
      )}
    </div>
  );
}
