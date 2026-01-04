import { useTranslation } from 'react-i18next';
import { FileText, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Pagination from './Pagination';

function RequestsTable({
  requests,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onRowClick,
  sortConfig,
  onSort
}) {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = i18n.language === 'en' ? 'en-US' : i18n.language === 'kz' ? 'kk-KZ' : 'ru-RU';
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="sort-icon" />;
    }
    return sortConfig.direction === 'asc'
      ? <ArrowUp size={14} className="sort-icon active" />
      : <ArrowDown size={14} className="sort-icon active" />;
  };

  const columns = [
    { key: 'id', label: t('table.id'), sortable: true },
    { key: 'category', label: t('table.category'), sortable: true },
    { key: 'address', label: t('table.address'), sortable: false },
    { key: 'status', label: t('table.status'), sortable: true },
    { key: 'created_at', label: t('table.date'), sortable: true }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <FileText size={18} />
          {t('table.title')}
        </h2>
      </div>

      <div className="table-container">
        {requests.length > 0 ? (
          <table className="requests-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={col.sortable ? 'sortable' : ''}
                    onClick={() => col.sortable && onSort(col.key)}
                  >
                    <span className="th-content">
                      {col.label}
                      {col.sortable && getSortIcon(col.key)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} onClick={() => onRowClick(request)}>
                  <td>#{request.id}</td>
                  <td>{request.category}</td>
                  <td>{request.address}</td>
                  <td>
                    <StatusBadge status={request.status} />
                  </td>
                  <td>{formatDate(request.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <FileText size={48} />
            <p>{t('table.empty')}</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default RequestsTable;
