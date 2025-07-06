import React, { useState } from 'react';
import { Loader2, PlusSquare } from 'lucide-react';
import './addresume.css';
import {v4 as uuidv4} from 'uuid';
import GlobalApi from '../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {
  const [showDialog, setShowDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const {user} =useUser();
  const [loading,setLoading]=useState(false);
  const navigation=useNavigate();

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  const handleCreate = () => {
    alert(`Resume Created: ${resumeTitle}`);
    setResumeTitle('');
    handleClose();
  };
//  const onCreate=()=>{
//   setLoading(true);
//   const uuid=uuidv4();
//   // console.log(resumeTitle,uuid);

//   const data={
//     data:{
//       title:resumeTitle,
//       resumeId:uuid,
//       userEmail:user?.primaryEmailAddress?.emailAddress,
//       userName:user?.fullName
//     }
//   } 
//   console.log("Data sent to Strapi:", data);
//   GlobalApi.CreateNewResume(data).then(resp=>{
//     console.log(resp.data.data.documentId);
//     if(resp)
//     {
//       setLoading(false);
//       navigation('/resume/'+resp.data.data.documentId+"/edit");
//     }
//   },
//   (error)=>{
//     setLoading(false);
//   })
//  }
const onCreate = () => {
  setLoading(true);
  const uuid = uuidv4();

  const formData = {
    title: resumeTitle,
    resumeId: uuid,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    userName: user?.fullName
  };

  console.log("Data sent to Strapi:", formData);

  GlobalApi.CreateNewResume(formData).then(
    (resp) => {
      console.log(resp);
      if (resp) {
        setLoading(false);
        navigation('/resume/' + resp.data.documentId + "/edit");
      }
    },
    (error) => {
      setLoading(false);
    }
  );
};

  return (
    <div>
      <div className="resume-box" onClick={handleOpen}>
        <PlusSquare />
      </div>

      {showDialog && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Resume</h2>
              <button className="close-btn" onClick={handleClose} aria-label="Close">
                ×
              </button>
            </div>
            <p className="modal-subtitle">Add a title for your new resume</p>
            <input
              type="text"
              placeholder="Ex. Full Stack resume"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn-add create-btn"
                onClick={() => {
                     handleCreate();
                      onCreate();
                  }}
                disabled={!resumeTitle.trim()||loading}>
                {loading?
                  <Loader2 className='animate-spin'/>
                  :
                  'Create'
                }
              
               
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddResume;
