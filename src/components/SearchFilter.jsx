import { Search } from 'lucide-react';

const STATUSES = [
  { value: '', label: 'Все' },
  { value: 'В работе', label: 'В работе' },
  { value: 'Решено', label: 'Решено' },
  { value: 'Отклонено', label: 'Отклонено' }
];

function SearchFilter({ searchQuery, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="filters-container">
      <div className="search-input">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Поиск по категории или адресу..."
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
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;
