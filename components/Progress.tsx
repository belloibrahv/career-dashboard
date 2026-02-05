'use client';

import { useStore, FinanceEntry } from '@/lib/store';
import { useState } from 'react';
import { Trash2, Edit2, TrendingUp, DollarSign, Briefcase, Target, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function Progress() {
  const { jobs, interviews, finances, addFinance, updateFinance, deleteFinance } = useStore();
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [financeData, setFinanceData] = useState<Partial<FinanceEntry>>({
    type: 'income',
    category: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleAddFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!financeData.category || financeData.amount === 0) return;

    if (editingId) {
      updateFinance(editingId, financeData);
      setEditingId(null);
    } else {
      addFinance(financeData as Omit<FinanceEntry, 'id'>);
    }

    setFinanceData({
      type: 'income',
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setShowFinanceForm(false);
  };

  const handleEdit = (finance: FinanceEntry) => {
    setFinanceData(finance);
    setEditingId(finance.id);
    setShowFinanceForm(true);
  };

  const totalIncome = finances
    .filter(f => f.type === 'income')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalExpenses = finances
    .filter(f => f.type === 'expense')
    .reduce((sum, f) => sum + f.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const jobStats = {
    total: jobs.length,
    offers: jobs.filter(j => j.status === 'offer').length,
    interviews: jobs.filter(j => j.status === 'interview').length,
  };

  const interviewStats = {
    total: interviews.length,
    avgScore: interviews.length > 0
      ? (interviews.reduce((sum, i) => sum + i.score, 0) / interviews.length).toFixed(0)
      : 0,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b pb-6" style={{ borderColor: '#ede8e3' }}>
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={32} style={{ color: '#c97a5c' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#2a2520' }}>
            Progress
          </h1>
        </div>
        <p className="text-base" style={{ color: '#9b8f85' }}>Track your journey and growth</p>
      </div>

      {/* Stats Overview */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Career Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          {/* Applications */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={16} style={{ color: '#2a2520' }} />
              <div className="stat-label">Applications</div>
            </div>
            <div className="stat-value">{jobStats.total}</div>
            <p className="text-xs mt-2" style={{ color: '#9b8f85' }}>
              {jobStats.interviews} int • {jobStats.offers} off
            </p>
          </div>

          {/* Interview Score */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} style={{ color: '#2a2520' }} />
              <div className="stat-label">Int avg</div>
            </div>
            <div className="stat-value">{interviewStats.avgScore}%</div>
            <p className="text-xs mt-2" style={{ color: '#9b8f85' }}>
              {interviewStats.total} sessions
            </p>
          </div>

          {/* Income */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} style={{ color: '#7a8b6f' }} />
              <div className="stat-label">Income</div>
            </div>
            <div className="stat-value" style={{ color: '#7a8b6f' }}>
              ₦{totalIncome.toFixed(0)}
            </div>
          </div>

          {/* Net Balance */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} style={{ color: netBalance >= 0 ? '#7a8b6f' : '#c97a5c' }} />
              <div className="stat-label">Balance</div>
            </div>
            <div className="stat-value" style={{ color: netBalance >= 0 ? '#7a8b6f' : '#c97a5c' }}>
              ₦{netBalance.toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Financial Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Income Card */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-3 mb-3">
              <ArrowUpRight size={20} style={{ color: '#7a8b6f' }} />
              <span className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Total Income</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: '#7a8b6f' }}>
              ₦{totalIncome.toFixed(2)}
            </div>
          </div>

          {/* Expenses Card */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-3 mb-3">
              <ArrowDownLeft size={20} style={{ color: '#c97a5c' }} />
              <span className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Total Expenses</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: '#c97a5c' }}>
              ₦{totalExpenses.toFixed(2)}
            </div>
          </div>

          {/* Net Balance Card */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp size={20} style={{ color: netBalance >= 0 ? '#7a8b6f' : '#c97a5c' }} />
              <span className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Net Balance</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: netBalance >= 0 ? '#7a8b6f' : '#c97a5c' }}>
              ₦{netBalance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Finance Tracking */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#9b8f85' }}>Transactions</h2>
          {!showFinanceForm && (
            <button
              onClick={() => setShowFinanceForm(true)}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add
            </button>
          )}
        </div>

        {showFinanceForm && (
          <div className="card-elevated p-6 space-y-4 mb-6 animate-slideUp">
            <form onSubmit={handleAddFinance} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-2 block">Type</label>
                  <select
                    value={financeData.type}
                    onChange={(e) => setFinanceData({ ...financeData, type: e.target.value as any })}
                    className="w-full p-3 rounded-lg border-1.5 font-medium"
                    style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                  >
                    <option value="income">💰 Income</option>
                    <option value="expense">💸 Expense</option>
                  </select>
                </div>
                <div>
                  <label className="form-label mb-2 block">Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Freelance, Salary"
                    value={financeData.category || ''}
                    onChange={(e) => setFinanceData({ ...financeData, category: e.target.value })}
                    className="w-full p-3 rounded-lg border-1.5"
                    style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                  />
                </div>
              </div>
              <div>
                <label className="form-label mb-2 block">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={financeData.amount || ''}
                  onChange={(e) => setFinanceData({ ...financeData, amount: parseFloat(e.target.value) })}
                  className="w-full p-3 rounded-lg border-1.5"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                />
              </div>
              <div>
                <label className="form-label mb-2 block">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="Add details..."
                  value={financeData.description || ''}
                  onChange={(e) => setFinanceData({ ...financeData, description: e.target.value })}
                  className="w-full p-3 rounded-lg border-1.5"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingId ? 'Update' : 'Add'} Entry
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFinanceForm(false);
                    setEditingId(null);
                    setFinanceData({
                      type: 'income',
                      category: '',
                      amount: 0,
                      description: '',
                      date: new Date().toISOString().split('T')[0],
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

        {finances.length > 0 ? (
          <div className="space-y-3">
            {finances
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map(entry => (
                <div
                  key={entry.id}
                  className="card p-4 flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <p className="font-semibold" style={{ color: '#2a2520' }}>
                      {entry.category}
                    </p>
                    {entry.description && (
                      <p className="text-xs" style={{ color: '#9b8f85' }}>
                        {entry.description}
                      </p>
                    )}
                    <p className="text-xs mt-1" style={{ color: '#9b8f85' }}>
                      {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p
                      className="font-semibold"
                      style={{
                        color: entry.type === 'income' ? '#7a8b6f' : '#c97a5c',
                      }}
                    >
                      {entry.type === 'income' ? '+' : '-'}₦{entry.amount.toFixed(2)}
                    </p>
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
                        onClick={() => deleteFinance(entry.id)}
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
        ) : (
          <div className="card-elevated p-12 text-center">
            <p className="text-5xl mb-3">💰</p>
            <p style={{ color: '#9b8f85' }}>No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
