import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList } from 'lucide-react';
import SearchFilter from './components/SearchFilter';
import RequestsTable from './components/RequestsTable';
import MapView from './components/MapView';
import RequestModal from './components/RequestModal';
import Statistics from './components/Statistics';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const ITEMS_PER_PAGE = 10;

function App() {
  const { t } = useTranslation();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

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

  const sortedRequests = useMemo(() => {
    const sorted = [...filteredRequests];

    sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortConfig.key === 'status') {
        const statusOrder = { 'В работе': 1, 'Решено': 2, 'Отклонено': 3 };
        aValue = statusOrder[aValue] || 0;
        bValue = statusOrder[bValue] || 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredRequests, sortConfig]);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedRequests, currentPage]);

  const totalPages = Math.ceil(sortedRequests.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

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
            <p>{t('loading')}</p>
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
            <p>{t('error')}: {error}</p>
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
          {t('header.title')}
        </h1>
        <div className="header-controls">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <main className="app-content">
        <Statistics requests={requests} />

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
              totalItems={sortedRequests.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              onRowClick={handleRowClick}
              sortConfig={sortConfig}
              onSort={handleSort}
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
