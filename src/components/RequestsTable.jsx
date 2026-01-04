import { FileText } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Pagination from './Pagination';

function RequestsTable({ requests, currentPage, totalPages, totalItems, itemsPerPage, onPageChange, onRowClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <FileText size={18} />
          Обращения граждан
        </h2>
      </div>

      <div className="table-container">
        {requests.length > 0 ? (
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Категория</th>
                <th>Адрес</th>
                <th>Статус</th>
                <th>Дата регистрации</th>
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
            <p>Обращения не найдены</p>
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
