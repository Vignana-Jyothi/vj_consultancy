import { useNavigate } from 'react-router-dom';
import './QuickActionsList.css';

export default function QuickActionsList() {
  const navigate = useNavigate();

  const handleAddNewProject = () => {
    navigate('/add-project');
  };

  const handleViewProjects = () => {
    navigate('/my-projects');
  };

  return (
    <div className="quick-actions-card">
      <div className="quick-actions-header">
        <h3 className="quick-actions-title">Quick Actions</h3>
        <p className="quick-actions-subtitle">Frequently used sourcing options</p>
      </div>
      
      <div className="quick-actions-buttons">
        <button className="quick-action-btn btn-primary" onClick={handleAddNewProject}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-action-icon">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Project
        </button>
        
        <button className="quick-action-btn btn-secondary" onClick={handleViewProjects}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-action-icon">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          View My Projects
        </button>
      </div>
    </div>
  );
}
