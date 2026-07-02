import React from 'react';
import * as Icons from 'lucide-react';
import './ApplicationRow.css';

export default function ApplicationRow({ application, onViewDetails }) {
const {
  title,
  category,
  status,
  applied_at,
  payment_type,
  budget,
  estimated_budget
} = application;
  // Resolve Lucide Icon
const IconComponent = Icons.Briefcase;
  const getStatusClass = (statusStr) => {
    switch (statusStr.toLowerCase()) {
      case 'applied':
        return 'badge-applied';
      case 'under review':
        return 'badge-review';
      case 'shortlisted':
        return 'badge-shortlisted';
      case 'interview scheduled':
      case 'interview':
        return 'badge-interview';
      case 'selected':
        return 'badge-selected';
      case 'rejected':
        return 'badge-rejected';
      default:
        return '';
    }
  };
  const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};
  const handleClick = (e) => {
    onViewDetails(application);
  };

  return (
    <tr className="application-row" onClick={handleClick}>
      {/* Project info column */}
      <td className="cell-project-app">
        <div className="project-app-wrapper">
          <div
  className={`project-app-icon status-bg-${(status || "")
    .toLowerCase()
    .replace(" ", "-")}`}
>
            <IconComponent size={18} />
          </div>
          <div className="project-app-details">
            <span className="project-app-name">{title}</span>
            <span className="project-app-desc">{category || payment_type}</span>
          </div>
        </div>
      </td>

      {/* Payment */}
<td className="cell-payment-app">
  {payment_type || "-"}
</td>

{/* Budget */}
<td className="cell-budget-app">
  ₹ {budget || estimated_budget || "-"}
</td>

{/* Applied On */}
<td className="cell-applied-app">
  {formatDate(applied_at)}
</td>

{/* Status */}
<td className="cell-status-app">
  <span className={`status-badge-app ${getStatusClass(status || "")}`}>
    <span className="status-badge-dot"></span>
    {status}
  </span>
</td>

{/* Action */}
<td className="cell-action-app">
  <button
    className="track-progress-btn"
    onClick={(e) => {
      e.stopPropagation();
      onViewDetails(application);
    }}
    type="button"
  >
    Track Progress
  </button>
</td>
</tr>
  );
}
