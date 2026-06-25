import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const sourcerItems = [
    {
      name: 'Project Sourcing Dashboard',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="menu-icon">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      )
    },
    {
      name: 'Add New Project',
      path: '/add-project',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="menu-icon">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )
    },
    {
      name: 'All Projects',
      path: '/my-projects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="menu-icon">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    }
  ];

  const studentItems = [
  {
    name: 'Browse Projects',
    path: '/browse-projects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="menu-icon">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo-text">VJ Consultancy</span>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="sidebar-section-title">SOURCER</div>
          <ul className="sidebar-menu">
            {sourcerItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `sidebar-menu-btn ${isActive ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                  onClick={() => {
                    if (onClose) onClose(); // Close sidebar on mobile item click
                  }}
                >
                  {item.icon}
                  <span className="menu-text">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="sidebar-section-title" style={{ marginTop: '16px' }}>STUDENT</div>
          <ul className="sidebar-menu">
            {studentItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `sidebar-menu-btn ${isActive ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                  onClick={() => {
                    if (onClose) onClose(); // Close sidebar on mobile item click
                  }}
                >
                  {item.icon}
                  <span className="menu-text">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">PS</div>
            <div className="user-info">
              <span className="user-name">Project Sourcer</span>
              <span className="user-role">Sourcer Account</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
