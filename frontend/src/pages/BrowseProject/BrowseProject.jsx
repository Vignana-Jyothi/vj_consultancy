
import './BrowseProject.css';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import React, { useState, useEffect } from 'react';
const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {

  async function fetchProjects() {

    try {

      const response = await fetch(
        "http://localhost:8000/api/projects"
      );

      const data = await response.json();

      const publishedProjects = data.filter(
        project => project.status === "Published"
      );

      setProjects(publishedProjects);

    } catch (error) {

      console.error(error);

    }

  }

  fetchProjects();

}, []);
  return (
    <div className="browse-projects-container">
      <div className="browse-header">
        <div className="header-text">
          <h1 className="page-title">Browse Projects</h1>
          <p className="page-subtitle">Explore available projects and discover opportunities that match your skills.</p>
        </div>
      </div>
      
      <div className="filter-section">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search projects..." 
          />
        </div>
        <div className="filters-container">
          <select className="filter-dropdown">
            <option value="">Category</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile App</option>
            <option value="design">Design</option>
          </select>
          <select className="filter-dropdown">
            <option value="">Duration</option>
            <option value="short">0-4 Weeks</option>
            <option value="medium">1-3 Months</option>
            <option value="long">3+ Months</option>
          </select>
          <select className="filter-dropdown">
            <option value="">Budget</option>
            <option value="low">Under ₹20,000</option>
            <option value="mid">₹20,000 - ₹50,000</option>
            <option value="high">Above ₹50,000</option>
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
  );
};

export default BrowseProjects;
