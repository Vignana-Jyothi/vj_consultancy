import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProjectForm.css';
const CATEGORY_OPTIONS = [
  'Web Development',
  'Mobile Development',
  'Data Analysis',
  'UI/UX Design',
  'Other',
];

function AddProjectForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState('');
  const [sourceWebsite, setSourceWebsite] = useState('');

  const [paymentType, setPaymentType] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSkills('');
    setCategory('');
    setBudget('');
    setDuration('');
    setDeadline('');
    setSourceWebsite('');
    setPaymentType('');
    setHourlyRate('');
    setEstimatedHours('');
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    setBudget('');
    setDuration('');
    setDeadline('');
    setHourlyRate('');
    setEstimatedHours('');
  };

  const handleHourlyRateChange = (val) => {
    setHourlyRate(val);
    if (val && estimatedHours) {
      setBudget(String(Number(val) * Number(estimatedHours)));
    } else {
      setBudget('');
    }
  };

  const handleEstimatedHoursChange = (val) => {
    setEstimatedHours(val);
    if (hourlyRate && val) {
      setBudget(String(Number(hourlyRate) * Number(val)));
    } else {
      setBudget('');
    }
  };

  async function handleSubmit(e) {

  e.preventDefault();

  // Validation

  if (title.trim().length < 5) {
    alert("Project title must contain at least 5 characters");
    return;
  }

  if (description.trim().length < 20) {
    alert("Project description must contain at least 20 characters");
    return;
  }

  if (!skills.trim()) {
    alert("Skills field is required");
    return;
  }

  if (!category) {
    alert("Please select a category");
    return;
  }

  if (!paymentType) {
    alert("Please select a payment type");
    return;
  }

  if (paymentType === 'fixed') {
    if (!budget || Number(budget) <= 0) {
      alert("Budget must be a positive number for Fixed Price projects");
      return;
    }
    if (!duration.trim()) {
      alert("Duration is required for Fixed Price projects");
      return;
    }
    if (!deadline) {
      alert("Deadline is required for Fixed Price projects");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (deadline < today) {
      alert("Deadline cannot be in the past");
      return;
    }
  } else if (paymentType === 'hourly') {
    if (!hourlyRate || Number(hourlyRate) <= 0) {
      alert("Hourly rate must be a positive number");
      return;
    }
    if (!estimatedHours || Number(estimatedHours) <= 0) {
      alert("Estimated hours must be a positive number");
      return;
    }
    if (!budget || Number(budget) <= 0) {
      alert("Estimated budget must be a positive number");
      return;
    }
    if (!duration.trim()) {
      alert("Estimated duration is required");
      return;
    }
  }

  setIsSubmitting(true);

  const formData = {
    title,
    description,
    skills,
    category,
    source_website: sourceWebsite,
    payment_type: paymentType,
  };

  if (paymentType === 'fixed') {
    formData.budget = Number(budget);
    formData.duration = duration;
    formData.deadline = deadline;
  } else if (paymentType === 'hourly') {
    formData.hourly_rate = Number(hourlyRate);
    formData.estimated_hours = Number(estimatedHours);
    formData.estimated_budget = Number(budget);
    formData.estimated_duration = duration;
  }

  try {

    const response = await fetch(
      "http://localhost:8000/api/projects",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    console.log(data);

    // Clear form after successful insertion
    resetForm();

    setIsSuccess(true);
    setShowModal(true);

  } catch (error) {

    console.error(error);
    alert(error.message || "Failed to publish project");

  } finally {

    setIsSubmitting(false);

  }
}

  const handleAddAnother = () => {
    setShowModal(false);
    setIsSuccess(false);
    resetForm();
  };

  const handleViewMyProjects = () => {
    setShowModal(false);
    navigate('/my-projects');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="add-project-form__card">
      {isSuccess && !showModal && (
        <div className="add-project-form__success" role="status">
          <span className="add-project-form__success-dot" aria-hidden="true" />
          <span className="add-project-form__success-text">
            Project published — students can now see and apply to it.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* 1. Project Title */}
        <div className="add-project-form__field">
          <label className="add-project-form__label" htmlFor="project-title">
            <span className="add-project-form__label-dot" aria-hidden="true" />
            Project title
          </label>
          <input
            id="project-title"
            className="add-project-form__input"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 2. Project Description */}
        <div className="add-project-form__field">
          <label className="add-project-form__label" htmlFor="project-description">
            <span className="add-project-form__label-dot" aria-hidden="true" />
            Project description
          </label>
          <textarea
            id="project-description"
            className="add-project-form__textarea"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 3. Required Skills */}
        <div className="add-project-form__field">
          <label className="add-project-form__label" htmlFor="project-skills">
            <span className="add-project-form__label-dot" aria-hidden="true" />
            Required skills
          </label>
          <input
            id="project-skills"
            className="add-project-form__input"
            type="text"
            required
            placeholder="React, Node.js, MongoDB"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* 4. Category / Domain */}
        <div className="add-project-form__field">
          <label className="add-project-form__label" htmlFor="project-category">
            <span className="add-project-form__label-dot" aria-hidden="true" />
            Category / Domain
          </label>
          <select
            id="project-category"
            className="add-project-form__select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Type */}
        <div className="add-project-form__field">
          <label className="add-project-form__label">
            <span className="add-project-form__label-dot" aria-hidden="true" />
            Payment Type <span className="add-project-form__required-star">*</span>
          </label>
          <div className="add-project-form__payment-type-group">
            <label className={`add-project-form__radio-card ${paymentType === 'fixed' ? 'add-project-form__radio-card--active' : ''}`}>
              <input
                type="radio"
                name="paymentType"
                value="fixed"
                checked={paymentType === 'fixed'}
                onChange={() => handlePaymentTypeChange('fixed')}
                className="add-project-form__radio-input"
              />
              <span className="add-project-form__radio-custom" />
              <span className="add-project-form__radio-label">Fixed Price</span>
            </label>
            <label className={`add-project-form__radio-card ${paymentType === 'hourly' ? 'add-project-form__radio-card--active' : ''}`}>
              <input
                type="radio"
                name="paymentType"
                value="hourly"
                checked={paymentType === 'hourly'}
                onChange={() => handlePaymentTypeChange('hourly')}
                className="add-project-form__radio-input"
              />
              <span className="add-project-form__radio-custom" />
              <span className="add-project-form__radio-label">Hourly</span>
            </label>
          </div>
        </div>

        {paymentType === 'fixed' && (
          /* 5-7. Budget / Duration / Deadline (inline row) */
          <div className="add-project-form__row">
            <div className="add-project-form__field">
              <label className="add-project-form__label" htmlFor="project-budget">
                <span className="add-project-form__label-dot" aria-hidden="true" />
                Budget (₹)
              </label>
              <input
                id="project-budget"
                className="add-project-form__input"
                type="number"
                placeholder="25000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="add-project-form__field">
              <label className="add-project-form__label" htmlFor="project-duration">
                <span className="add-project-form__label-dot" aria-hidden="true" />
                Duration
              </label>
              <input
                id="project-duration"
                className="add-project-form__input"
                type="text"
                placeholder="4 weeks"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="add-project-form__field">
              <label className="add-project-form__label" htmlFor="project-deadline">
                <span className="add-project-form__label-dot" aria-hidden="true" />
                Deadline
              </label>
              <input
                id="project-deadline"
                className="add-project-form__input"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>
        )}

        {paymentType === 'hourly' && (
          /* Hourly Fields: Hourly Rate, Estimated Hours, Estimated Budget, Estimated Duration */
          <>
            <div className="add-project-form__hourly-row">
              <div className="add-project-form__field">
                <label className="add-project-form__label" htmlFor="project-hourly-rate">
                  <span className="add-project-form__label-dot" aria-hidden="true" />
                  Hourly Rate (₹/hour)
                </label>
                <input
                  id="project-hourly-rate"
                  className="add-project-form__input"
                  type="number"
                  placeholder="e.g. 800"
                  value={hourlyRate}
                  onChange={(e) => handleHourlyRateChange(e.target.value)}
                />
              </div>

              <div className="add-project-form__field">
                <label className="add-project-form__label" htmlFor="project-estimated-hours">
                  <span className="add-project-form__label-dot" aria-hidden="true" />
                  Estimated Hours
                </label>
                <input
                  id="project-estimated-hours"
                  className="add-project-form__input"
                  type="number"
                  placeholder="e.g. 40"
                  value={estimatedHours}
                  onChange={(e) => handleEstimatedHoursChange(e.target.value)}
                />
              </div>

              <div className="add-project-form__field">
                <label className="add-project-form__label" htmlFor="project-estimated-budget">
                  <span className="add-project-form__label-dot" aria-hidden="true" />
                  Estimated Budget
                </label>
                <input
                  id="project-estimated-budget"
                  className="add-project-form__input"
                  type="number"
                  placeholder="e.g. 32000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="add-project-form__field">
                <label className="add-project-form__label" htmlFor="project-estimated-duration">
                  <span className="add-project-form__label-dot" aria-hidden="true" />
                  Estimated Duration
                </label>
                <input
                  id="project-estimated-duration"
                  className="add-project-form__input"
                  type="text"
                  placeholder="e.g. 25 Weeks"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            {/* Hourly Project Notice */}
            <div className="add-project-form__notice">
              <div className="add-project-form__notice-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div className="add-project-form__notice-content">
                <h4 className="add-project-form__notice-title">Hourly Project Notice</h4>
                <p className="add-project-form__notice-text">
                  This is an hourly project. Estimated Budget shown above is only an approximation. Final payment depends on the total approved working hours and may be lower or higher than the estimated budget.
                </p>
              </div>
            </div>
          </>
        )}

        {/* 8. Source Website */}
        <div className="add-project-form__field">
          <label className="add-project-form__label" htmlFor="project-source">
            <span className="add-project-form__label-dot" aria-hidden="true" />
            Source website
          </label>
          <input
            id="project-source"
            className="add-project-form__input"
            type="text"
            placeholder="Upwork, direct referral, etc."
            value={sourceWebsite}
            onChange={(e) => setSourceWebsite(e.target.value)}
          />
        </div>

        {/* 9-10. Submit */}
        <div className="add-project-form__actions">
          <button
            type="submit"
            className="add-project-form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing…' : 'Publish project'}
          </button>
          <span className="add-project-form__helper">
            This project becomes visible to students immediately on publish.
          </span>
        </div>
      </form>

      {/* ── Publish Success Modal ── */}
      {showModal && (
        <div className="publish-modal__overlay" onClick={handleCloseModal}>
          <div
            className="publish-modal__content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="publish-modal-title"
          >
            {/* Close button */}
            <button
              className="publish-modal__close"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Success icon */}
            <div className="publish-modal__icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="publish-modal__icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            {/* Modal text */}
            <h2 id="publish-modal-title" className="publish-modal__title">
              Project Published Successfully
            </h2>
            <p className="publish-modal__message">
              The project is now visible to students and available for applications.
            </p>

            {/* Modal actions */}
            <div className="publish-modal__actions">
              <button
                className="publish-modal__btn publish-modal__btn--primary"
                onClick={handleAddAnother}
              >
                Add Another Project
              </button>
              <button
                className="publish-modal__btn publish-modal__btn--secondary"
                onClick={handleViewMyProjects}
              >
                View My Projects
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProjectForm;

