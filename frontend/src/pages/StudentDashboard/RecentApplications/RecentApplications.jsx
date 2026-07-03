import React from 'react';
import { FileText, Clock } from 'lucide-react';
import './RecentApplications.css';

/**
 * Returns a human-friendly formatted date string.
 * e.g. "2026-07-02T16:22:12.790Z" → "2 Jul 2026"
 */
function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Maps a status value to a CSS modifier class.
 */
function statusClass(status) {
  const map = {
    Applied: 'ra-badge--applied',
    'Under Review': 'ra-badge--review',
    Shortlisted: 'ra-badge--shortlisted',
    'Interview Scheduled': 'ra-badge--interview',
    Selected: 'ra-badge--selected',
    Rejected: 'ra-badge--rejected',
  };
  return map[status] ?? 'ra-badge--applied';
}

export default function RecentApplications({ applications }) {
  return (
    <div className="ra-card">
      {/* Header */}
      <div className="ra-card__header">
        <div className="ra-card__title-row">
          <div className="ra-card__icon-wrap">
            <FileText size={18} strokeWidth={2} />
          </div>
          <h2 className="ra-card__title">Recent Applications</h2>
        </div>
      </div>

      {/* Body */}
      {applications.length === 0 ? (
        <div className="ra-empty">
          <Clock size={36} strokeWidth={1.5} className="ra-empty__icon" />
          <p className="ra-empty__text">No recent applications.</p>
        </div>
      ) : (
        <ul className="ra-list">
          {applications.map((app, index) => (
            <li key={index} className="ra-item">
              <div className="ra-item__left">
                <span className="ra-item__title">{app.title}</span>
                <span className="ra-item__date">
                  Applied on {formatDate(app.applied_at)}
                </span>
              </div>
              <span className={`ra-badge ${statusClass(app.status)}`}>
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
