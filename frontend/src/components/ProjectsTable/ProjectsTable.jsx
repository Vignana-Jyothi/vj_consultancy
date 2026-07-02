import React from 'react';
import { Eye, Edit2 } from 'lucide-react';
import './ProjectsTable.css';

export default function ProjectsTable({ projects, onViewDetails, onEditProject }) {
  // Utility function to format Indian Rupee budget
  const formatBudget = (amount) => {
    if (typeof amount !== 'number') return amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Utility function to format dates to a readable DD MMM YYYY style
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Map status values to CSS class modifiers
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'status-published';
      case 'active':
        return 'status-active';
      case 'completed':
        return 'status-completed';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  return (
    <div className="table-responsive-wrapper">
      <table className="projects-table">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Type</th>
            <th>Budget</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Added On</th>
            <th>Deadline</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="8" className="table-empty-state">
                No projects found matching the criteria.
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id}>
                <td className="project-title-cell">
                  <div className="project-title-text" title={project.title}>
                    {project.title}
                  </div>
                </td>
                <td>
                  <span className={`payment-type-badge ${project.payment_type || 'fixed'}`}>
                    {project.payment_type === 'hourly' ? 'Hourly' : 'Fixed Price'}
                  </span>
                </td>
                <td className="project-budget-cell">
                  {project.payment_type === 'hourly'
                    ? formatBudget(project.estimated_budget)
                    : formatBudget(project.budget)
                  }
                </td>
                <td className="project-duration-cell">
                  {project.payment_type === 'hourly'
                    ? project.estimated_duration || '—'
                    : project.duration || '—'
                  }
                </td>
                <td>
                  <span className={`status-badge ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="project-date-cell">
                  {formatDate(project.addedOn)}
                </td>
                <td className="project-date-cell">
                  {project.payment_type === 'hourly'
                    ? '—'
                    : formatDate(project.deadline)
                  }
                </td>
                <td className="project-actions-cell">
                  <button
                    className="action-btn view-btn"
                    onClick={() => onViewDetails(project.id)}
                    aria-label={`View details of project ${project.title}`}
                    title="View Details"
                  >
                    <Eye
    size={18}
    strokeWidth={2.3}
    color="#2563eb"
/>
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEditProject(project.id)}
                    aria-label={`Edit project ${project.title}`}
                    title="Edit Project"
                  >
                    <Edit2
    size={18}
    strokeWidth={2.3}
    color="#16a34a"
/>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

