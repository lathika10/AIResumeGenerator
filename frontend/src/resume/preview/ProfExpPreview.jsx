import React from 'react';
import './ProfExpPreview.css';

function ProfExpPreview({ resumeInfo }) {
  return (
    <div className="experience-container"
    style={{
        borderBottomColor: resumeInfo?.themeColor,
      }}>
      
      <h5 className="experience-heading" style={{ color: resumeInfo?.themeColor }}>
        Experience
      </h5>

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="experience-block">
          <div className="title-date-row">
            <p className="job-title">{experience?.title}</p>
            <p className="date-range">
            {experience?.startDate} - {experience?.endDate || (experience?.currentlyWorking ? 'Present' : '')}

            </p>
          </div>

          <p className="company-location">
            {experience?.companyName}, {experience?.city}, {experience?.state}
          </p>

          {experience?.workSummery && (
            // <p className="description-text">{experience?.workSummery}</p>
            <div className="description-text" dangerouslySetInnerHTML={{__html:experience?.workSummery}}/>
            
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfExpPreview;
