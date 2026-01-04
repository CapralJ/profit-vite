import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

function SearchFilter({ searchQuery, onSearchChange, statusFilter, onStatusChange }) {
  const { t } = useTranslation();

  const STATUSES = [
    { value: '', labelKey: 'filters.all' },
    { value: 'В работе', labelKey: 'filters.inProgress' },
    { value: 'Решено', labelKey: 'filters.resolved' },
    { value: 'Отклонено', labelKey: 'filters.rejected' }
  ];

  return (
    <div className="filters-container">
      <div className="search-input">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder={t('search.placeholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="status-filter">
        {STATUSES.map((status) => (
          <button
            key={status.value}
            className={`filter-btn ${statusFilter === status.value ? 'active' : ''}`}
            onClick={() => onStatusChange(status.value)}
          >
            {t(status.labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;
