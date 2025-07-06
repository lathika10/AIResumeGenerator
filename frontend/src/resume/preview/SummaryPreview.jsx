import React, { useContext } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';

function SummaryPreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <p
      style={{
        fontSize: '8px',
        lineHeight: '1.5',
        paddingBottom: '4px',
        borderBottom: '2px solid',
        borderBottomColor: resumeInfo?.themeColor,
      }}
    >
      {resumeInfo?.summery}
    </p>
  );
}

export default SummaryPreview;
