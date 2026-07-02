import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import ActivityList from '../../components/ActivityList/ActivityList';
import QuickActionsList from '../../components/QuickActionsList/QuickActionsList';
import './Dashboard.css';

export default function Dashboard() {

  const [stats, setStats] = useState({
    published: 0,
    active: 0,
    completed: 0,
    delivered: 0
  });

  const [activities, setActivities] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {

    async function fetchDashboardData() {

      try {

        // Fetch Dashboard Statistics
        const statsResponse = await axios.get(
          "http://localhost:8000/api/dashboard/stats",
          {
            withCredentials: true,
          }
        );

        setStats(statsResponse.data);

        // Fetch Recent Activities
        const activitiesResponse = await axios.get(
          "http://localhost:8000/api/dashboard/activities",
          {
            withCredentials: true,
          }
        );

        const formattedActivities = activitiesResponse.data.map((activity) => ({
          id: activity.activity_id,
          title: activity.message,
          time: new Date(activity.created_at).toLocaleString(),
        }));

        setActivities(formattedActivities);

      } catch (error) {

        console.error("Dashboard Error:", error);

      }

    }

    fetchDashboardData();

  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="dashboard-main">

        <header className="dashboard-navbar">
          <button
            className="navbar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Open menu"
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

        <div className="dashboard-header-section">
          <h1 className="dashboard-title">
            Project Sourcing Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Overview of all projects you have added,
            grouped by their current status.
          </p>
        </div>

        <section
          className="summary-grid"
          aria-label="Project Statistics"
        >
          <SummaryCard
            title="Published Projects"
            count={stats.published}
            icon="published"
            description="Visible to students and accepting applications."
          />

          <SummaryCard
            title="Active Projects"
            count={stats.active}
            icon="active"
            description="Currently assigned and under development."
          />

          <SummaryCard
            title="Completed Projects"
            count={stats.completed}
            icon="completed"
            description="Submitted by student and awaiting delivery."
          />

          <SummaryCard
            title="Delivered Projects"
            count={stats.delivered}
            icon="delivered"
            description="Successfully delivered to the client."
          />
        </section>

        <div className="details-grid">

          <section
            className="details-activities"
            aria-label="Recent Activities Log"
          >
            <ActivityList activities={activities} />
          </section>

          <section
            className="details-actions"
            aria-label="Quick Sourcing Actions"
          >
            <QuickActionsList />
          </section>

        </div>

      </div>
    </div>
  );
}