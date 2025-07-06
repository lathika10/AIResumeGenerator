import React from 'react';
import './PersonalDetail.css';

function PersonalDetail({ resumeInfo }) {
  return (
    <div
      className="personal-detail"
      style={{
        borderBottomColor: resumeInfo?.themeColor,
      }}
    >
      <h4
  className="personal-name"
  style={{
    color: resumeInfo?.themeColor, // ✅ Correct usage
  }}
>
  {resumeInfo?.firstName} {resumeInfo?.lastName}
</h4>

      <p className="job-title">{resumeInfo?.jobTitle}</p>

      <p className="address">{resumeInfo?.address}</p>

      <div className="contact">
        <p>{resumeInfo?.phone}</p>
        <p>{resumeInfo?.email}</p>
      </div>
    </div>
  );
}

export default PersonalDetail;
