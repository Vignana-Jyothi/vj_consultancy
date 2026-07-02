import React from 'react';
import './ProjectCard.css';
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div className="project-card">
      <div className="project-card-header">
        <span className="badge category-badge">{project.category}</span>
        <span className="badge status-badge">{project.status}</span>
        <span className={`badge payment-type-badge ${project.payment_type || 'fixed'}`}>
          {project.payment_type === 'hourly' ? 'Hourly' : 'Fixed Price'}
        </span>
      </div>
      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="skills-container">
  {project.skills &&
    project.skills.split(",").map((skill, index) => (
      <span key={index} className="skill-pill">
        {skill.trim()}
      </span>
    ))}
</div>
      </div>
      <div className="project-card-info">
        {project.payment_type === 'hourly' ? (
          <>
            <div className="info-item">
              <span className="info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> Est. Budget
              </span>
              <span className="info-value">
                {project.estimated_budget ? `₹${Number(project.estimated_budget).toLocaleString('en-IN')}` : '-'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Est. Duration
              </span>
              <span className="info-value">{project.estimated_duration || '-'}</span>
            </div>
          </>
        ) : (
          <>
            <div className="info-item">
              <span className="info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> Budget
              </span>
              <span className="info-value">
                {project.budget ? `₹${Number(project.budget).toLocaleString('en-IN')}` : '-'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Duration
              </span>
              <span className="info-value">{project.duration || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Deadline
              </span>
              <span className="info-value">
                {project.deadline ? project.deadline.split("T")[0] : "-"}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="project-card-footer">
        <div className="applications-status">
          <span className="app-label">Applications</span>
          <span className="app-count">0 / 0</span>
        </div>
        <button
    className="view-details-btn"
    onClick={() => navigate(`/browse-projects/${project.project_id}`)}>
    View Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
