import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../sections/formsection';
import ResumePreview from '../../sections/resumepreview';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import dummy from '../../../data/dummy';

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  useEffect(() => {
    console.log(params.resumeId);
  }, [params.resumeId]);

  if (!resumeInfo) {
    return <p>Loading resume data...</p>;
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div
        style={{
          display: 'flex',
          gap: '40px', // Increased gap between left and right
          padding: '40px',
          paddingTop: '50px',
        }}
      >
        <div style={{ flex: 1 }}>
          <FormSection />
        </div>
        <div style={{ flex: 1 }}>
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
