import { useState, useEffect } from "react";
import "./EditProjectModal.css";

export default function EditProjectModal({
  project,
  isOpen,
  onClose,
  onUpdate
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="edit-modal-header">
          <div>
            <h2 className="edit-modal-title">Edit Project</h2>
            <p className="edit-modal-subtitle">Update project details and save changes.</p>
          </div>
          <button type="button" className="edit-modal-close" onClick={onClose} aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-modal-form">
          <div className="edit-modal-field full-width">
            <label className="edit-modal-label">Project Title</label>
            <input
              className="edit-modal-input"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-modal-field full-width">
            <label className="edit-modal-label">Description</label>
            <textarea
              className="edit-modal-textarea"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="edit-modal-row">
            <div className="edit-modal-field">
              <label className="edit-modal-label">Budget</label>
              <div className="edit-modal-input-wrapper">
                <span className="edit-modal-currency-icon">₹</span>
                <input
                  className="edit-modal-input with-icon"
                  name="budget"
                  type="number"
                  value={formData.budget || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="edit-modal-field">
              <label className="edit-modal-label">Deadline</label>
              <input
                className="edit-modal-input"
                type="date"
                name="deadline"
                value={
                  formData.deadline
                    ? formData.deadline.split("T")[0]
                    : ""
                }
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="edit-modal-actions">
            <button
              type="button"
              className="edit-modal-btn edit-modal-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="edit-modal-btn edit-modal-btn-primary">
              Update Project
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}