import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import './Education1.css';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../service/GlobalApi';
import { toast } from 'react-toastify';

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);

  const getFormattedDate = (value) => {
    if (!value) return '';
    const date = new Date(value + '-01');
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const addNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };
    GlobalApi.updateResumeDetail(params.resumeId, data).then(
      (resp) => {
        setLoading(false);
        toast('Details Updated!');
      },
      (error) => {
        setLoading(false);
        toast('Server error');
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  return (
    <div className="education-container-1">
      <div className="education-header">
        <h5>Education</h5>
        <p>Add your education detail</p>
      </div>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="form-row">
              <div className="form-group">
                <label>University Name</label>
                <input
                  name="universityName"
                  value={item.universityName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Degree</label>
                <input
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="form-group">
                <label>Major</label>
                <input
                  name="major"
                  value={item.major}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  name="startDate"
                  type="month"
                  value={item.startDate}
                  onChange={(e) => handleChange(e, index)}
                />
                <div className="date-display">{getFormattedDate(item.startDate)}</div>
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  name="endDate"
                  type="month"
                  value={item.endDate}
                  onChange={(e) => handleChange(e, index)}
                />
                <div className="date-display">{getFormattedDate(item.endDate)}</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ width: '100%' }}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="education-controls">
          <button className="add-button" onClick={addNewEducation}>
            + Add More Education
          </button>
          {educationalList.length > 1 && (
            <button className="remove-button" onClick={removeEducation}>
              Remove
            </button>
          )}
          <button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Education;
