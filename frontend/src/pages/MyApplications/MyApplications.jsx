import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ApplicationsHeader from '../../components/MyApplications/ApplicationsHeader/ApplicationsHeader';
import StatusSummary from '../../components/MyApplications/StatusSummary/StatusSummary';
import StatusChips from '../../components/MyApplications/StatusChips/StatusChips';
import ApplicationsTable from '../../components/MyApplications/ApplicationsTable/ApplicationsTable';
import EmptyApplications from '../../components/MyApplications/EmptyApplications/EmptyApplications';
import ApplicationDetailsDrawer from '../../components/MyApplications/ApplicationDetailsDrawer/ApplicationDetailsDrawer';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './MyApplications.css';
import axios from "axios";
console.log("MyApplications Rendered");

export default function MyApplications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  useEffect(() => {

    async function fetchApplications() {

        try {

    const response = await axios.get(
        "http://localhost:8000/api/applications/my",
        {
            withCredentials: true,
        }
    );
   console.log("API Response:", response.data);
    setApplications(response.data);

}
catch(error){

    console.error(error);

}
finally{

    setLoading(false);

}

    }

    fetchApplications();

}, []);
  // Calculate status summary metrics based on ALL mock data
  const counts = {
    total: applications.length,

    applied: applications.filter(
        a => a.status === "Applied"
    ).length,

    underReview: applications.filter(
        a => a.status === "Under Review"
    ).length,

    shortlisted: applications.filter(
        a => a.status === "Shortlisted"
    ).length,

    interview: applications.filter(
        a => a.status === "Interview Scheduled"
    ).length,

    selected: applications.filter(
        a => a.status === "Selected"
    ).length,

    rejected: applications.filter(
        a => a.status === "Rejected"
    ).length,
};
  // Filter application list based on search and active chip tab
  const filteredApps = applications.filter((app) => {
  const matchesSearch = (app.title || "")
  .toLowerCase()
  .includes(searchQuery.toLowerCase());    
    let matchesStatus = true;
    if (activeFilter !== 'All') {
      if (activeFilter === 'Interview') {
        matchesStatus = app.status === 'Interview Scheduled';
      } else {
        matchesStatus = app.status === activeFilter;
      }
    }

    return matchesSearch && matchesStatus;
  });

  // Reset page pagination if search/filter results change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  // Drawer handlers
  const handleViewDetails = (application) => {
    setSelectedApp(application);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApps = filteredApps.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  if (loading) {

    return (
        <div className="loading-page">
            Loading Applications...
        </div>
    );

}

  return (
    <div className="my-applications-layout">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="my-applications-main">
        {/* Mobile Navbar */}
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

        {/* Page Header */}
        <ApplicationsHeader />

        {/* Summary Card Grid */}
        <StatusSummary counts={counts} />

        {/* Search, Status Chips & Table Wrapper */}
        <section className="applications-container-card">
          <div className="applications-toolbar-row">
            {/* Search Input Box */}
            <div className="search-bar-wrapper">
              <Search className="search-icon-app" size={18} />
              <input
                type="text"
                className="search-input-app"
                placeholder="Search applications by project title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search applications"
              />
            </div>
          </div>

          {/* Filter Chips list */}
          <StatusChips
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          {/* Table list or Empty results state */}
                    {/* Table list or Empty results state */}
          {applications.length === 0 ? (
            <EmptyApplications />
          ) : (
            <>
              <ApplicationsTable
                applications={paginatedApps}
                onViewDetails={handleViewDetails}
              />

              {/* Pagination Controls Footer */}
              {totalPages > 1 && (
                <div className="pagination-footer-row">
                  <span className="pagination-info-text">
                    Showing{" "}
                    <strong className="font-medium">
                      {startIndex + 1}
                    </strong>{" "}
                    to{" "}
                    <strong className="font-medium">
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredApps.length
                      )}
                    </strong>{" "}
                    of{" "}
                    <strong className="font-medium">
                      {filteredApps.length}
                    </strong>{" "}
                    applications
                  </span>

                  <div className="pagination-btn-group">
                    <button
                      className="pagination-arrow-btn"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      type="button"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`pagination-num-btn ${
                          currentPage === pageNum ? "active" : ""
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                        type="button"
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      className="pagination-arrow-btn"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      type="button"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
        </div>

      {/* Sliding Details Drawer overlay */}
      <ApplicationDetailsDrawer
        application={selectedApp}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
