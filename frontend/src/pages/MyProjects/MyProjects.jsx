import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProjectsTable from '../../components/ProjectsTable/ProjectsTable';
import './MyProjects.css';
import ViewProjectModal from '../../components/ViewProjectModal/ViewProjectModal';
import EditProjectModal from '../../components/EditProjectModal/EditProjectModal';
import axios from "axios";
export default function MyProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
 const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const handleUpdateProject = async (updatedProject) => {

  try {

    await axios.put(
      `http://localhost:8000/api/projects/${updatedProject.project_id}`,
      updatedProject,
      {
        withCredentials: true,
      }
    );

    setIsEditModalOpen(false);

    window.location.reload();

  } catch (error) {

    console.error("Update Project Error:", error);

  }

};
  // Sidebar toggle handlers (for mobile views)
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Filter projects by Title and Status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      project.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = async (id) => {

  try {

    const response = await axios.get(
      `http://localhost:8000/api/projects/${id}`,
      {
        withCredentials: true,
      }
    );

    setSelectedProject(response.data);

    setIsViewModalOpen(true);

  } catch (error) {

    console.error("View Project Error:", error);

  }

};

 const handleEditProject = async (id) => {

  try {

    const response = await axios.get(
      `http://localhost:8000/api/projects/${id}`,
      {
        withCredentials: true,
      }
    );

    setEditProject(response.data);

    setIsEditModalOpen(true);

  } catch (error) {

    console.error("Edit Project Error:", error);

  }

};

  const handleAddNewProjectClick = () => {
    navigate('/add-project');
  };
  useEffect(() => {

  async function fetchProjects() {

    try {

      const response = await axios.get(
        "http://localhost:8000/api/projects",
        {
          withCredentials: true,
        }
      );

      const formattedProjects = response.data.map((project) => ({
        id: project.project_id,
        title: project.title,
        budget: project.budget !== null ? Number(project.budget) : null,
        status: project.status,
        addedOn: project.created_at,
        deadline: project.deadline,
        payment_type: project.payment_type || "fixed",
        hourly_rate:
          project.hourly_rate !== null
            ? Number(project.hourly_rate)
            : null,
        estimated_hours:
          project.estimated_hours !== null
            ? Number(project.estimated_hours)
            : null,
        estimated_budget:
          project.estimated_budget !== null
            ? Number(project.estimated_budget)
            : null,
        estimated_duration: project.estimated_duration,
        duration: project.duration,
      }));

      setProjects(formattedProjects);

    } catch (error) {

      console.error("Fetch Projects Error:", error);

    }

  }

  fetchProjects();

}, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div className="dashboard-main">
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

        {/* Page Header */}
        <div className="dashboard-header-section">
          <h1 className="dashboard-title">All Projects</h1>
          <p className="dashboard-subtitle">
            View and manage all the projects you have added. You can edit project details even after a project becomes active.
          </p>
        </div>

        {/* Content Section: White Card layout */}
        <section className="projects-container-card">
          {/* Top Section: Search, Filters, Add Button */}
          <div className="projects-toolbar">
            <div className="toolbar-search-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="project-search-input"
                type="text"
                className="search-input"
                placeholder="Search by project title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects by title"
              />
            </div>

            <div className="toolbar-filters-group">
              <div className="filter-dropdown-wrapper">
                <select
                  id="project-status-filter"
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter projects by status"
                >
                  <option value="All">All Statuses</option>
                  <option value="Published">Published</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                id="add-project-btn"
                className="add-new-btn"
                onClick={handleAddNewProjectClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="add-icon"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add New Project</span>
              </button>
            </div>
          </div>

          {/* Table Component */}
          <ProjectsTable
            projects={filteredProjects}
            onViewDetails={handleViewDetails}
            onEditProject={handleEditProject}
          />

          {/* Bottom Section: Total Projects count */}
          <div className="projects-summary-footer">
            <span className="total-projects-text">
              Total Projects: <strong id="total-projects-count">{filteredProjects.length}</strong>
            </span>
          </div>
        </section>
      </div>
      <ViewProjectModal
  project={selectedProject}
  isOpen={isViewModalOpen}
  onClose={() => setIsViewModalOpen(false)}
/>
<EditProjectModal
  project={editProject}
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  onUpdate={handleUpdateProject}
/>
    </div>
  );
}
