import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './ApplicationDetailsDrawer.css';

export default function ApplicationDetailsDrawer({ application, isOpen, onClose }) {
  if (!application) return null;

  const {
  title,
  category,
 status,
  applied_at,
  payment_type,
  budget,
  estimated_budget,
  resume_url,
  cover_note,
  additional_comments
} = application;  
  const [isCoverLetterExpanded, setIsCoverLetterExpanded] = useState(false);
  const ProjectIcon = Icons.Briefcase;
  const stagesOrder = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'];
  
  const getStageStatus = (stageName) => {
    const statusMap = {
      'applied': 0,
      'under review': 1,
      'shortlisted': 2,
      'interview scheduled': 3,
      'interview': 3,
      'selected': 4,
      'rejected': -1
    };
    const currentIndex = statusMap[(status || "").toLowerCase()] ?? 0;
    
    if ((status || "").toLowerCase() === 'rejected') {
      if (stageName === 'Applied') return 'completed';
      if (stageName === 'Under Review') return 'rejected';
      return 'upcoming';
    }

    const stageIndex = stagesOrder.indexOf(stageName);
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };
     const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};
  return (
    <div className={`drawer-overlay ${isOpen ? 'drawer-open' : ''}`} onClick={onClose}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-left">
            <div className="drawer-project-icon-box">
              <ProjectIcon size={20} />
            </div>
            <div className="drawer-header-title-wrapper">
              <h2 className="drawer-project-name">{title}</h2>
              <span className="drawer-applied-date">
                Applied on {formatDate(applied_at)}
              </span>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close drawer" type="button">
            <Icons.X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {/* Status Alert Badge */}
          <div className="drawer-section status-section-drawer">
            <h4 className="drawer-section-title">Current Status</h4>
            <div className={`drawer-status-banner status-bg-banner-${(status || "").toLowerCase().replace(' ', '-')}`}>
              <span className="status-banner-text">{status}</span>
            </div>
          </div>

          {/* Timeline Journey */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Application Journey</h4>
            <div className="vertical-timeline">
  {stagesOrder.map((stage, index) => {

    const stageStatus = getStageStatus(stage);

    return (
      <div
        key={stage}
        className={`timeline-node-item ${stageStatus}`}
      >
        <div className="timeline-marker">
          <div className="timeline-dot">
            {stageStatus === "completed" && (
              <Icons.Check size={10} className="check-svg" />
            )}

            {stageStatus === "rejected" && (
              <Icons.X size={10} className="check-svg" />
            )}
          </div>

          {index < stagesOrder.length - 1 && (
            <div className="timeline-line"></div>
          )}
        </div>

        <div className="timeline-content">
          <div className="timeline-content-header">
            <span className="timeline-stage-name">
              {stage}
            </span>
          </div>
        </div>
      </div>
    );

  })}
</div>
              
            </div>
          </div>

          {/* Resume section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Submitted Resume</h4>
            <div className="resume-download-card">
              <div className="resume-card-left">
                <Icons.FileText size={20} className="resume-icon-file" />
                <span className="resume-filename">{resume_url}</span>
              </div>
              <button className="resume-download-btn" title="Download Resume" type="button">
                <Icons.Download size={16} />
              </button>
            </div>
          </div>

          {/* Cover Letter Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Cover Letter</h4>
            <div className="cover-letter-card">
              <p className={`cover-letter-text ${isCoverLetterExpanded ? 'expanded' : ''}`}>
                {cover_note}
              </p>
              <button
                className="cover-letter-toggle-btn"
                onClick={() => setIsCoverLetterExpanded(!isCoverLetterExpanded)}
                type="button"
              >
                <span>{isCoverLetterExpanded ? 'Read Less' : 'Read More'}</span>
                {isCoverLetterExpanded ? <Icons.ChevronUp size={14} /> : <Icons.ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {/* Coordinator Remarks */}
          {additional_comments && (
            <div className="drawer-section">
              <h4 className="drawer-section-title">Remarks from Coordinator</h4>
              <div className="remarks-box">
                <Icons.MessageSquare size={16} className="remarks-icon" />
                <p className="remarks-text">{additional_comments}</p>
              </div>
            </div>
          )}
      </div>
      </div>
          );
}
