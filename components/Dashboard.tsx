'use client';

import { useStore } from '@/lib/store';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Briefcase, Target, DollarSign, CheckCircle2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function Dashboard() {
  const { jobs, interviews, habits, finances } = useStore();

  // Job application stats
  const jobStats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'applied').length,
    interviews: jobs.filter(j => j.status === 'interview').length,
    offers: jobs.filter(j => j.status === 'offer').length,
    rejected: jobs.filter(j => j.status === 'rejected').length,
  };

  // Interview stats
  const interviewStats = {
    total: interviews.length,
    avgScore: interviews.length > 0
      ? (interviews.reduce((sum, i) => sum + i.score, 0) / interviews.length).toFixed(1)
      : 0,
  };

  // Finance stats
  const totalIncome = finances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
  const totalExpenses = finances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  // Habits stats
  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  // Job status distribution data
  const jobStatusData = [
    { name: 'Applied', value: jobStats.applied, fill: '#1e40af' },
    { name: 'Interview', value: jobStats.interviews, fill: '#92400e' },
    { name: 'Offers', value: jobStats.offers, fill: '#065f46' },
    { name: 'Rejected', value: jobStats.rejected, fill: '#991b1b' },
  ].filter(item => item.value > 0);

  // Interview scores trend
  const interviewTrend = interviews
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map(i => ({
      date: new Date(i.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: i.score,
    }));

  // Finance trend
  const financeTrend = finances
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map(f => ({
      date: new Date(f.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: f.amount,
      type: f.type,
    }));

  const hasData = jobStats.total > 0 || interviewStats.total > 0 || totalHabits > 0 || finances.length > 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b pb-6" style={{ borderColor: '#ede8e3' }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#2a2520' }}>Dashboard</h1>
        <p className="text-base" style={{ color: '#9b8f85' }}>Overview of your career progress and achievements</p>
      </div>

      {hasData ? (
        <>
          {/* Primary KPI Cards - 4 Column Grid */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Key Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Applications */}
              <div className="card-elevated p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="stat-label">Applications</div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#f0ebe5' }}>
                    <Briefcase size={18} style={{ color: '#c97a5c' }} />
                  </div>
                </div>
                <div className="stat-value mb-2">{jobStats.total}</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: '#9b8f85' }}>
                  <span className="flex items-center gap-1">
                    <ArrowUpRight size={14} style={{ color: '#7a8b6f' }} />
                    {jobStats.interviews} interviews
                  </span>
                </div>
              </div>

              {/* Interview Average */}
              <div className="card-elevated p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="stat-label">Interview Avg</div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#f0ebe5' }}>
                    <Target size={18} style={{ color: '#c97a5c' }} />
                  </div>
                </div>
                <div className="stat-value mb-2">{interviewStats.avgScore}%</div>
                <div className="text-xs" style={{ color: '#9b8f85' }}>
                  {interviewStats.total} sessions
                </div>
              </div>

              {/* Total Income */}
              <div className="card-elevated p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="stat-label">Income</div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#f0ebe5' }}>
                    <DollarSign size={18} style={{ color: '#7a8b6f' }} />
                  </div>
                </div>
                <div className="stat-value mb-2" style={{ color: '#7a8b6f' }}>
                  ${totalIncome.toFixed(0)}
                </div>
                <div className="text-xs" style={{ color: '#9b8f85' }}>
                  Expenses: ${totalExpenses.toFixed(0)}
                </div>
              </div>

              {/* Completion Rate */}
              <div className="card-elevated p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="stat-label">Completion</div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#f0ebe5' }}>
                    <CheckCircle2 size={18} style={{ color: '#7a8b6f' }} />
                  </div>
                </div>
                <div className="stat-value mb-2" style={{ color: '#7a8b6f' }}>
                  {completionRate}%
                </div>
                <div className="text-xs" style={{ color: '#9b8f85' }}>
                  {completedHabits} of {totalHabits} habits
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Financial Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Income Card */}
              <div className="card-elevated p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ArrowUpRight size={20} style={{ color: '#7a8b6f' }} />
                  <span className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Total Income</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: '#7a8b6f' }}>
                  ${totalIncome.toFixed(2)}
                </div>
              </div>

              {/* Expenses Card */}
              <div className="card-elevated p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ArrowDownLeft size={20} style={{ color: '#c97a5c' }} />
                  <span className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Total Expenses</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: '#c97a5c' }}>
                  ${totalExpenses.toFixed(2)}
                </div>
              </div>

              {/* Net Balance Card */}
              <div className="card-elevated p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp size={20} style={{ color: netBalance >= 0 ? '#7a8b6f' : '#c97a5c' }} />
                  <span className="text-sm font-semibold" style={{ color: '#9b8f85' }}>Net Balance</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: netBalance >= 0 ? '#7a8b6f' : '#c97a5c' }}>
                  ${netBalance.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Job Status Distribution */}
              {jobStatusData.length > 0 && (
                <div className="card-elevated p-6">
                  <h3 className="text-base font-bold mb-6" style={{ color: '#2a2520' }}>
                    Application Status Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={jobStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {jobStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #ede8e3',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Interview Scores Trend */}
              {interviewTrend.length > 0 && (
                <div className="card-elevated p-6">
                  <h3 className="text-base font-bold mb-6" style={{ color: '#2a2520' }}>
                    Interview Performance Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={interviewTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ede8e3" />
                      <XAxis dataKey="date" stroke="#9b8f85" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#9b8f85" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #ede8e3',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#c97a5c"
                        strokeWidth={2}
                        dot={{ fill: '#c97a5c', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Financial Activity Chart */}
          {financeTrend.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9b8f85' }}>Recent Activity</h2>
              <div className="card-elevated p-6">
                <h3 className="text-base font-bold mb-6" style={{ color: '#2a2520' }}>
                  Financial Transactions (Last 7 Days)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financeTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ede8e3" />
                    <XAxis dataKey="date" stroke="#9b8f85" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9b8f85" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #ede8e3',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="amount" fill="#c97a5c" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="card-elevated p-16 text-center">
          <p className="text-6xl mb-4">📊</p>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#2a2520' }}>No Data Yet</h3>
          <p style={{ color: '#9b8f85' }}>Start tracking your career to see insights and analytics here</p>
        </div>
      )}
    </div>
  );
}
