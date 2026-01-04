import { Clock, CheckCircle, XCircle } from "lucide-react";

function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status) {
      case "В работе":
        return "in-progress";
      case "Решено":
        return "resolved";
      case "Отклонено":
        return "rejected";
      default:
        return "";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "В работе":
        return <Clock size={12} />;
      case "Решено":
        return <CheckCircle size={12} />;
      case "Отклонено":
        return <XCircle size={12} />;
      default:
        return null;
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {getStatusIcon()}
      {status}
    </span>
  );
}

export default StatusBadge;
