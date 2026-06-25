import "./ViewProjectModal.css";

export default function ViewProjectModal({
  project,
  isOpen,
  onClose
}) {

  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-header">
          <h2>Project Details</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-content">

          <p><strong>Title:</strong> {project.title}</p>

          <p>
            <strong>Description:</strong>
            {project.description}
          </p>

          <p><strong>Skills:</strong> {project.skills}</p>

          <p><strong>Category:</strong> {project.category}</p>

          <p><strong>Payment Type:</strong> {project.payment_type === 'hourly' ? 'Hourly' : 'Fixed Price'}</p>

          {project.payment_type === 'hourly' ? (
            <>
              <p><strong>Estimated Budget:</strong> ₹{project.estimated_budget ? Number(project.estimated_budget).toLocaleString() : '—'}</p>
              <p><strong>Estimated Duration:</strong> {project.estimated_duration || '—'}</p>
            </>
          ) : (
            <>
              <p><strong>Budget:</strong> ₹{project.budget ? Number(project.budget).toLocaleString() : '—'}</p>
              <p><strong>Duration:</strong> {project.duration || '—'}</p>
              <p><strong>Deadline:</strong> {project.deadline ? new Date(project.deadline).toLocaleDateString('en-IN') : '—'}</p>
            </>
          )}

          <p><strong>Status:</strong> {project.status}</p>

          <p>
            <strong>Source Website:</strong>
            {project.source_website}
          </p>

        </div>

      </div>

    </div>
  );
}