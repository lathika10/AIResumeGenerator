import React from 'react';
import './EducationalPreview.css';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value + '-01');
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function EducationalPreview({ resumeInfo }) {
  return (
    <div
      className="education-container"
      style={{
        borderBottomColor: resumeInfo?.themeColor,
      }}
    >
      <h5
        className="education-title"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h5>

      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className="education-entry">
          <div className="education-text">
            <h4 className="education-university">{education?.universityName}</h4>
            <h4 className="education-degree">
              {education?.degree} in {education?.major}
            </h4>
            <p className="education-desc">{education?.description}</p>
          </div>
          <span className="education-dates">
            {formatDate(education?.startDate)} - {formatDate(education?.endDate)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
