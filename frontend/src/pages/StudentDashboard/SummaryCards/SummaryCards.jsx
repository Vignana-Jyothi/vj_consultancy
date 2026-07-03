import React from 'react';
import {
  ClipboardList,
  Briefcase,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';
import './SummaryCards.css';

export default function SummaryCards({ summary }) {
  const {
    activeApplications = 0,
    assignedProjects = 0,
    completedProjects = 0,
    receivedPayments = 0,
    pendingPayments = 0,
  } = summary;

  return (
    <div className="summary-cards-grid">
      {/* Card 1 – Active Applications */}
      <div className="summary-card summary-card--blue">
        <div className="summary-card__icon-wrap summary-card__icon-wrap--blue">
          <ClipboardList size={22} strokeWidth={2} />
        </div>
        <div className="summary-card__body">
          <span className="summary-card__label">Active Applications</span>
          <span className="summary-card__value">{activeApplications}</span>
        </div>
      </div>

      {/* Card 2 – Assigned Projects */}
      <div className="summary-card summary-card--green">
        <div className="summary-card__icon-wrap summary-card__icon-wrap--green">
          <Briefcase size={22} strokeWidth={2} />
        </div>
        <div className="summary-card__body">
          <span className="summary-card__label">Assigned Projects</span>
          <span className="summary-card__value">{assignedProjects}</span>
        </div>
      </div>

      {/* Card 3 – Completed Projects */}
      <div className="summary-card summary-card--purple">
        <div className="summary-card__icon-wrap summary-card__icon-wrap--purple">
          <CheckCircle2 size={22} strokeWidth={2} />
        </div>
        <div className="summary-card__body">
          <span className="summary-card__label">Completed Projects</span>
          <span className="summary-card__value">{completedProjects}</span>
        </div>
      </div>

      {/* Card 4 – Payment Overview */}
      <div className="summary-card summary-card--orange summary-card--payment">
        <div className="summary-card__icon-wrap summary-card__icon-wrap--orange">
          <CreditCard size={22} strokeWidth={2} />
        </div>
        <div className="summary-card__body">
          <span className="summary-card__label">Payment Overview</span>
          <div className="payment-overview-row">
            <div className="payment-col">
              <span className="payment-col__title">Received</span>
              <span className="payment-col__amount payment-col__amount--green">
                ₹{receivedPayments.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="payment-divider" />
            <div className="payment-col">
              <span className="payment-col__title">Pending</span>
              <span className="payment-col__amount payment-col__amount--orange">
                ₹{pendingPayments.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
