'use client';

import { useStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { Trash2, Code2, Lightbulb, Link2, Star, Search } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Learning() {
  const { learning, addLearning, updateLearning, deleteLearning } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'concept' | 'snippet' | 'resource'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    type: 'concept' as 'concept' | 'snippet' | 'resource',
    title: '',
    content: '',
    language: 'javascript',
    tags: '',
    source: '',
    sourceUrl: '',
  });

  const handleAddLearning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    addLearning({
      date: new Date().toISOString().split('T')[0],
      type: formData.type,
      title: formData.title,
      content: formData.content,
      language: formData.type === 'snippet' ? formData.language : undefined,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      source: formData.source || undefined,
      sourceUrl: formData.sourceUrl || undefined,
      isFavorite: false,
    });

    setFormData({
      type: 'concept',
      title: '',
      content: '',
      language: 'javascript',
      tags: '',
      source: '',
      sourceUrl: '',
    });
    setShowForm(false);
  };

  const toggleFavorite = (id: string) => {
    const entry = learning.find(l => l.id === id);
    if (entry) {
      updateLearning(id, { isFavorite: !entry.isFavorite });
    }
  };

  const allTags = Array.from(new Set(learning.flatMap(l => l.tags)));

  const filtered = learning.filter(entry => {
    const matchesType = selectedType === 'all' || entry.type === selectedType;
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => entry.tags.includes(tag));
    return matchesType && matchesSearch && matchesTags;
  });

  const favorites = filtered.filter(l => l.isFavorite);
  const others = filtered.filter(l => !l.isFavorite);

  const typeIcons = {
    concept: <Lightbulb size={16} />,
    snippet: <Code2 size={16} />,
    resource: <Link2 size={16} />,
  };

  const typeColors = {
    concept: '#7a8b6f',
    snippet: '#c97a5c',
    resource: '#9b8f85',
  };

  const typeLabels = {
    concept: 'Concept',
    snippet: 'Code Snippet',
    resource: 'Resource',
  };

  return (
    <div className="page page-enter">
      <SectionHeader
        icon={<Code2 size={20} />}
        title="Learning Hub"
        subtitle="Document concepts, code snippets, and resources"
        action={!showForm ? { label: 'Add entry', onClick: () => setShowForm(true) } : undefined}
      />

      {/* Add Entry Form */}
      {showForm && (
        <div className="section animate-slideUp">
          <div className="section-header">
            <h2 className="section-title">New Entry</h2>
          </div>
          <form onSubmit={handleAddLearning} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label mb-2 block">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-lg border-1.5 font-medium"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                >
                  <option value="concept">💡 Concept</option>
                  <option value="snippet">💻 Code Snippet</option>
                  <option value="resource">🔗 Resource</option>
                </select>
              </div>
              {formData.type === 'snippet' && (
                <div>
                  <label className="form-label mb-2 block">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-1.5 font-medium"
                    style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="react">React</option>
                    <option value="sql">SQL</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="form-label mb-2 block">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., React Hooks Pattern, Async/Await Best Practices"
                className="w-full px-4 py-3 rounded-lg border-1.5"
                style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                autoFocus
              />
            </div>

            <div>
              <label className="form-label mb-2 block">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={formData.type === 'snippet' ? 'Paste your code here...' : 'Explain the concept, key points, use cases...'}
                className="w-full p-4 rounded-lg border-1.5 resize-none focus:border-[#c97a5c] font-mono text-sm"
                style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                rows={8}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label mb-2 block">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., react, hooks, performance"
                  className="w-full px-4 py-3 rounded-lg border-1.5"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                />
              </div>
              {formData.type === 'resource' && (
                <div>
                  <label className="form-label mb-2 block">Source</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g., MDN, Dev.to"
                    className="w-full px-4 py-3 rounded-lg border-1.5"
                    style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                  />
                </div>
              )}
            </div>

            {formData.type === 'resource' && (
              <div>
                <label className="form-label mb-2 block">URL</label>
                <input
                  type="url"
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-lg border-1.5"
                  style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
              <button type="submit" className="btn-primary w-full sm:w-auto hover-lift">
                Save entry
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      {learning.length > 0 && (
        <div className="section animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <div className="section-header">
            <h2 className="section-title">Search & Filters</h2>
          </div>
          <div className="space-y-4">
            <div className="relative">
            <Search size={18} style={{ color: '#9b8f85' }} className="absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border-1.5"
              style={{ backgroundColor: '#ffffff', color: '#2a2520', borderColor: '#ede8e3' }}
            />
            </div>

            <div className="flex gap-2 flex-wrap">
              {(['all', 'concept', 'snippet', 'resource'] as const).map((type, idx) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all tag"
                  style={{
                    animationDelay: `${0.3 + idx * 0.05}s`,
                    backgroundColor: selectedType === type ? '#c97a5c' : '#f5f1ed',
                    color: selectedType === type ? '#ffffff' : '#2a2520',
                  }}
                >
                  {type === 'all' ? 'All' : typeLabels[type]}
                </button>
              ))}
            </div>

            {allTags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {allTags.map((tag, idx) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev =>
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      );
                    }}
                    className="px-2.5 py-1 rounded-full text-sm font-medium transition-all tag"
                    style={{
                      animationDelay: `${0.4 + idx * 0.05}s`,
                      backgroundColor: selectedTags.includes(tag) ? '#c97a5c' : '#ede8e3',
                      color: selectedTags.includes(tag) ? '#ffffff' : '#2a2520',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="section animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <div className="section-header">
            <h2 className="section-title">Favorites</h2>
          </div>
          <div className="space-y-3">
            {favorites.map((entry, idx) => (
              <div key={entry.id} style={{ animationDelay: `${0.4 + idx * 0.05}s` }} className="animate-slideUp">
                <LearningCard
                  entry={entry}
                  onDelete={deleteLearning}
                  onToggleFavorite={toggleFavorite}
                  typeIcons={typeIcons}
                  typeColors={typeColors}
                  typeLabels={typeLabels}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Entries Section */}
      {others.length > 0 && (
        <div className="section animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <div className="section-header">
            <h2 className="section-title">{favorites.length > 0 ? 'Other Entries' : 'All Entries'}</h2>
          </div>
          <div className="space-y-3">
            {others.map((entry, idx) => (
              <div key={entry.id} style={{ animationDelay: `${0.5 + idx * 0.05}s` }} className="animate-slideUp">
                <LearningCard
                  entry={entry}
                  onDelete={deleteLearning}
                  onToggleFavorite={toggleFavorite}
                  typeIcons={typeIcons}
                  typeColors={typeColors}
                  typeLabels={typeLabels}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {learning.length === 0 && (
        <div className="empty-state animate-slideUp">
          <div className="empty-icon">📚</div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#2a2520' }}>No learning entries yet</h3>
            <p style={{ color: '#9b8f85' }}>Start documenting your programming learnings.</p>
          </div>
        </div>
      )}

      {/* No Results */}
      {learning.length > 0 && filtered.length === 0 && (
        <div className="empty-state animate-slideUp">
          <div className="empty-icon">🔍</div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#2a2520' }}>No entries found</h3>
            <p style={{ color: '#9b8f85' }}>Try adjusting your search or filters.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function LearningCard({ entry, onDelete, onToggleFavorite, typeIcons, typeColors, typeLabels }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-premium p-4 group space-y-3 hover-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ color: typeColors[entry.type] }}>
              {typeIcons[entry.type]}
            </span>
            <span
              className="text-xs font-semibold px-2 py-1 rounded-lg badge-glow"
              style={{
                backgroundColor: typeColors[entry.type] + '15',
                color: typeColors[entry.type],
              }}
            >
              {typeLabels[entry.type]}
            </span>
            {entry.language && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-lg"
                style={{
                  backgroundColor: '#f0ebe5',
                  color: '#9b8f85',
                }}
              >
                {entry.language}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-base" style={{ color: '#2a2520' }}>
            {entry.title}
          </h3>
          {entry.source && (
            <p className="text-xs" style={{ color: '#9b8f85' }}>
              Source: <span className="font-medium">{entry.source}</span>
            </p>
          )}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onToggleFavorite(entry.id)}
            className="p-2 rounded-lg transition-all hover-lift"
            style={{
              backgroundColor: entry.isFavorite ? '#fbbf24' : '#f0ebe5',
              color: entry.isFavorite ? '#92400e' : '#9b8f85',
            }}
            title={entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={16} fill={entry.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-2 rounded-lg transition-all hover-lift"
            style={{ backgroundColor: '#fecaca', color: '#991b1b' }}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="pt-3 border-t animate-slideDown" style={{ borderColor: '#ede8e3' }}>
          <pre className="text-xs overflow-x-auto p-3 rounded-lg code-block">
            {entry.content}
          </pre>
          {entry.sourceUrl && (
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-3 inline-flex items-center gap-1 hover:underline transition-all hover-lift"
              style={{ color: '#c97a5c' }}
            >
              <Link2 size={14} />
              View resource
            </a>
          )}
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="btn-ghost"
        style={{ color: '#c97a5c' }}
      >
        {expanded ? 'Hide details' : 'View details'}
      </button>

      {entry.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap pt-2">
          {entry.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full tag"
              style={{
                backgroundColor: '#ede8e3',
                color: '#9b8f85',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
