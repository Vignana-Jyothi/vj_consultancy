import "./BrowseProject.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/projects",
          {
            params: {
              search,
              category,
              duration,
              budget,
              paymentType
            },
            withCredentials: true
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchProjects();
  }, [search, category, duration, budget, paymentType]);

  return (
    <div className="student-dashboard-layout">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div className="student-dashboard-main">
        {/* Top Navbar for Mobile/Tablet Viewports */}
        <header className="dashboard-navbar">
          <button className="navbar-toggle-btn" onClick={toggleSidebar} aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="navbar-brand">VJ Consultancy</span>
        </header>

        {/* Match Student Dashboard content wrapper */}
        <div className="dashboard-content-container">
          <div className="browse-projects-container">
            <div className="browse-header">
              <div className="header-text">
                <h1 className="page-title">
                  Browse Projects
                </h1>
                <p className="page-subtitle">
                  Explore available projects and discover opportunities that match your skills.
                </p>
              </div>
            </div>

            <div className="filter-section">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="filters-container">
                <select
                  className="filter-dropdown"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  <option value="Web Development">
                    Web Development
                  </option>
                  <option value="Mobile Development">
                    Mobile Development
                  </option>
                  <option value="UI/UX Design">
                    UI/UX Design
                  </option>
                </select>

                <select
                  className="filter-dropdown"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">Duration</option>
                  <option value="0-4">
                    0-4 Weeks
                  </option>
                  <option value="1-3">
                    1-3 Months
                  </option>
                  <option value="3+">
                    Above 3 Months
                  </option>
                </select>

                <select
                  className="filter-dropdown"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">Budget</option>
                  <option value="under20000">
                    Under ₹20,000
                  </option>
                  <option value="20000-50000">
                    ₹20,000 - ₹50,000
                  </option>
                  <option value="above50000">
                    Above ₹50,000
                  </option>
                </select>

                <select
                  className="filter-dropdown"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option value="">Payment Type</option>
                  <option value="fixed">
                    Fixed
                  </option>
                  <option value="hourly">
                    Hourly
                  </option>
                </select>
              </div>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.project_id}
                  project={project}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProjects;