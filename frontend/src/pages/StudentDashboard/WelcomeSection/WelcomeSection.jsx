import React from 'react';
import './WelcomeSection.css';

export default function WelcomeSection({ studentName }) {
  // Extract first name only for a friendlier greeting
  const firstName = studentName ? studentName.split(' ')[0] : '';

  return (
    <div className="welcome-section">
      <div className="welcome-text-block">
        <h1 className="welcome-heading">
          Welcome, {firstName} 👋
        </h1>
        <p className="welcome-subtext">
          Welcome back! Here&rsquo;s a quick overview of your activity.
        </p>
      </div>
    </div>
  );
}
