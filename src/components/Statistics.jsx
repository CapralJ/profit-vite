import { useTranslation } from 'react-i18next';
import { BarChart3, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

function Statistics({ requests }) {
  const { t } = useTranslation();

  const stats = {
    total: requests.length,
    inProgress: requests.filter(r => r.status === 'В работе').length,
    resolved: requests.filter(r => r.status === 'Решено').length,
    rejected: requests.filter(r => r.status === 'Отклонено').length
  };

  const statCards = [
    {
      key: 'total',
      label: t('stats.total'),
      value: stats.total,
      icon: FileText,
      color: 'primary'
    },
    {
      key: 'inProgress',
      label: t('stats.inProgress'),
      value: stats.inProgress,
      icon: Clock,
      color: 'warning'
    },
    {
      key: 'resolved',
      label: t('stats.resolved'),
      value: stats.resolved,
      icon: CheckCircle,
      color: 'success'
    },
    {
      key: 'rejected',
      label: t('stats.rejected'),
      value: stats.rejected,
      icon: XCircle,
      color: 'danger'
    }
  ];

  return (
    <div className="statistics">
      <div className="stats-header">
        <BarChart3 size={18} />
        <h2>{t('stats.title')}</h2>
      </div>
      <div className="stats-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.key} className={`stat-card stat-${stat.color}`}>
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Statistics;
