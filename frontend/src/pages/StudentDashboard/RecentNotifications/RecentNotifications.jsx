import React from 'react';
import { Bell, CalendarDays } from 'lucide-react';
import './RecentNotifications.css';

/**
 * Returns a human-friendly formatted date string.
 * e.g. "2026-07-02T10:00:00Z" → "2 Jul 2026"
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

export default function RecentNotifications({ notifications }) {
  return (
    <div className="rn-card">
      {/* Header */}
      <div className="rn-card__header">
        <div className="rn-card__title-row">
          <div className="rn-card__icon-wrap">
            <Bell size={18} strokeWidth={2} />
          </div>
          <h2 className="rn-card__title">Recent Notifications</h2>
        </div>
      </div>

      {/* Body */}
      {notifications.length === 0 ? (
        <div className="rn-empty">
          <Bell size={36} strokeWidth={1.5} className="rn-empty__icon" />
          <p className="rn-empty__text">No notifications available.</p>
        </div>
      ) : (
        <ul className="rn-list">
          {notifications.map((notification, index) => (
            <li key={index} className="rn-item">
              <div className="rn-item__dot" aria-hidden="true" />
              <div className="rn-item__content">
                <span className="rn-item__title">{notification.title}</span>
                <p className="rn-item__message">{notification.message}</p>
                <div className="rn-item__date-row">
                  <CalendarDays size={12} strokeWidth={2} className="rn-item__cal-icon" />
                  <span className="rn-item__date">
                    {formatDate(notification.created_at)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
