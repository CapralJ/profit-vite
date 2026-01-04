import { useState, useEffect, useMemo } from 'react';
import { ClipboardList } from 'lucide-react';
import SearchFilter from './components/SearchFilter';
import RequestsTable from './components/RequestsTable';
import MapView from './components/MapView';
import RequestModal from './components/RequestModal';
import './App.css';

const ITEMS_PER_PAGE = 10;

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        searchQuery === '' ||
        request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === '' || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, statusFilter]);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, currentPage]);

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };

  const handleMarkerClick = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="app-content">
          <div className="empty-state">
            <p>Загрузка данных...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="app-content">
          <div className="empty-state">
            <p>Ошибка загрузки: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <ClipboardList size={28} />
          Обращения граждан г. Астана
        </h1>
      </header>

      <main className="app-content">
        <div className="main-layout">
          <div className="left-panel">
            <div className="card">
              <div className="card-content">
                <SearchFilter
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  statusFilter={statusFilter}
                  onStatusChange={setStatusFilter}
                />
              </div>
            </div>

            <RequestsTable
              requests={paginatedRequests}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredRequests.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              onRowClick={handleRowClick}
            />
          </div>

          <div className="right-panel">
            <MapView
              requests={filteredRequests}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      </main>

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
