import React, { useEffect, useState } from 'react';
import AddResume from '../components/addresume';
import GlobalApi from '../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from '../components/resumecarditem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  const GetResumeList = () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    GlobalApi.GetUserResume(email)
      .then((resp) => {
        console.log("Resume API Response:", resp);

        // Try multiple paths based on what your API actually returns
        const resumes = resp?.data?.data || resp?.data || [];

        if (Array.isArray(resumes)) {
          setResumeList(resumes);
        } else {
          console.error("Resume data is not an array", resumes);
          setResumeList([]); // prevent crash if structure is wrong
        }
      })
      .catch((err) => {
        console.error("Failed to fetch resume list:", err);
        setResumeList([]);
      });
  };

  return (
    <div style={{ padding: '50px', maxWidth: '1000px', margin: '0 auto' }}>
      <h3>My Resume</h3>
      <p>Start Creating AI resume for your next job role</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '8px',
          marginTop: '20px',
        }}
      >
        <AddResume />
        {resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
