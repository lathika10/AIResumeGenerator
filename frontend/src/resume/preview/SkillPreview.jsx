import React from 'react';
import './SkillPreview.css';

function SkillPreview({ resumeInfo }) {
  return (
    <div
      className="skill-container"
      style={{
        borderBottomColor: resumeInfo?.themeColor,
      }}
    >
      <h5
        className="skill-title"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skill
      </h5>
      <div className="skills-grid">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="skill-entry">
            <p className="skill-name">{skill.name}</p>
            <div className="progress-bar-background">
              <div
                className="progress-bar-fill"
                style={{
                  width: skill?.rating*20+ '%',
                  backgroundColor: resumeInfo?.themeColor,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;
