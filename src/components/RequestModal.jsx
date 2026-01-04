import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, MapPin, Calendar, Tag, Hash } from 'lucide-react';
import StatusBadge from './StatusBadge';

function RequestModal({ request, onClose }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = i18n.language === 'en' ? 'en-US' : i18n.language === 'kz' ? 'kk-KZ' : 'ru-RU';
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!request) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t('modal.request')} #{request.id}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {request.photo && (
            <img
              src={request.photo}
              alt={request.category}
              className="modal-photo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          <div className="modal-info">
            <div className="modal-info-row">
              <span className="modal-info-label">
                <Hash size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                ID
              </span>
              <span className="modal-info-value">#{request.id}</span>
            </div>

            <div className="modal-info-row">
              <span className="modal-info-label">
                <Tag size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {t('modal.category')}
              </span>
              <span className="modal-info-value">{request.category}</span>
            </div>

            <div className="modal-info-row">
              <span className="modal-info-label">
                <MapPin size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {t('modal.address')}
              </span>
              <span className="modal-info-value">{request.address}</span>
            </div>

            <div className="modal-info-row">
              <span className="modal-info-label">{t('modal.status')}</span>
              <span className="modal-info-value">
                <StatusBadge status={request.status} />
              </span>
            </div>

            <div className="modal-info-row">
              <span className="modal-info-label">
                <Calendar size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {t('modal.date')}
              </span>
              <span className="modal-info-value">{formatDate(request.created_at)}</span>
            </div>

            <div className="modal-info-row">
              <span className="modal-info-label">{t('modal.coordinates')}</span>
              <span className="modal-info-value">
                {request.latitude.toFixed(4)}, {request.longitude.toFixed(4)}
              </span>
            </div>
          </div>

          <div className="modal-description">
            <h4>{t('modal.description')}</h4>
            <p>{request.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestModal;
