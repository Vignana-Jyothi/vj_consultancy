import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import WelcomeSection from './WelcomeSection/WelcomeSection';
import SummaryCards from './SummaryCards/SummaryCards';
import RecentApplications from './RecentApplications/RecentApplications';
import RecentNotifications from './RecentNotifications/RecentNotifications';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/student/dashboard',
          { withCredentials: true }
        );
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="sd-loading-screen">
        <div className="sd-loading-spinner" />
        <span className="sd-loading-text">Loading Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="student-dashboard-layout">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="student-dashboard-main">
        {/* Mobile / Tablet Navbar */}
        <header className="dashboard-navbar">
          <button
            className="navbar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Open menu"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="navbar-brand">VJ Consultancy</span>
        </header>

        {/* Main Content */}
        <div className="dashboard-content-container">
          {/* 1. Welcome Section */}
          <WelcomeSection studentName={dashboardData?.studentName ?? ''} />

          {/* 2. Summary Cards */}
          <SummaryCards summary={dashboardData?.summary ?? {}} />

          {/* 3. Bottom Grid: Recent Applications & Recent Notifications */}
          <div className="sd-bottom-grid">
            <RecentApplications
              applications={dashboardData?.recentApplications ?? []}
            />
            <RecentNotifications
              notifications={dashboardData?.recentNotifications ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
