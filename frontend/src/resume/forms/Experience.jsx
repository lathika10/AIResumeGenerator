import React, { useContext, useEffect, useState, useRef } from 'react';
import RichTextEditor from '../../components/RichTextEditor';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import './Experience.css';
import { LoaderCircle, Brain } from 'lucide-react';
import GlobalApi from '../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AIChatSession } from '../../../service/AIModal';

const getFormattedDate = (value) => {
  if (!value) return '';
  const date = new Date(value + '-01');
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

const toInputMonthValue = (dateStr) => {
  if (typeof dateStr !== 'string') return '';
  const [monthShort, year] = dateStr.split(' ');
  if (!monthShort || !year) return '';
  const monthIndex = new Date(`${monthShort} 1, 2000`).getMonth() + 1;
  return `${year}-${monthIndex.toString().padStart(2, '0')}`;
};

const fromInputMonthValue = (value) => {
  if (typeof value !== 'string' || !value.includes('-')) return '';
  const [year, month] = value.split('-');
  const monthIndex = parseInt(month, 10) - 1;
  if (isNaN(monthIndex)) return '';
  const monthShort = new Date(year, monthIndex).toLocaleString('en-US', { month: 'short' });
  return `${monthShort} ${year}`;
};

const initialFormField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
};

function Experience() {
  const [experienceList, setExperienceList] = useState([{ ...initialFormField }]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loadingIndex, setLoadingIndex] = useState(null);
  const debounceRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (resumeInfo?.experience?.length && isInitialLoad) {
      setExperienceList(resumeInfo.experience);
      setIsInitialLoad(false);
    }
  }, [resumeInfo, isInitialLoad]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setResumeInfo(prev => ({
        ...prev,
        experience: experienceList,
      }));
    }, 300);
  }, [experienceList, setResumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...experienceList];
    updated[index][name] = (name === 'startDate' || name === 'endDate')
      ? fromInputMonthValue(value)
      : value;
    setExperienceList(updated);
  };

  const handleRichTextEditor = (value, name, index) => {
    const updated = [...experienceList];
    updated[index][name] = typeof value === 'string' ? value : '';
    setExperienceList(updated);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, { ...initialFormField }]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(prev => prev.slice(0, -1));
    }
  };

  const onSave = async () => {
    const payload = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    try {
      await GlobalApi.updateResumeDetail(params?.resumeId, payload);
      toast.success('Experience details saved successfully!');
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    }
  };

  const generateWorkSummaryAI = async (index) => {
    const entry = experienceList[index];
    if (!entry.title || !entry.companyName) {
      toast.warning('Please enter position title and company name first');
      return;
    }

    const prompt = `Job Title: ${entry.title}, Company: ${entry.companyName}. Generate a professional 3-4 line work summary in plain text.`;

    try {
      setLoadingIndex(index);
      const result = await AIChatSession.sendMessage(prompt);
      const aiText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) {
        const updated = [...experienceList];
        updated[index].workSummery = aiText;
        setExperienceList(updated);
        toast.success('Work summary generated');
      } else {
        toast.error('No valid response from AI');
      }
    } catch (error) {
      console.error('AI generation error:', error);
      toast.error('AI generation failed');
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="experience-container-1">
      <div className="experience-header">
        <h5>Professional Experience</h5>
        <p>Add your previous job experience</p>
      </div>

      <div className="experience-list">
        {experienceList.map((item, index) => (
          <div key={index} className="experience-item">
            <div className="form-row">
              <div className="form-group">
                <label>Position Title</label>
                <input
                  name="title"
                  value={item.title}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Enter position title"
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  name="companyName"
                  value={item.companyName}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Enter company name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  value={item.city}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Enter city"
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  name="state"
                  value={item.state}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Enter state"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="month"
                  name="startDate"
                  value={toInputMonthValue(item.startDate)}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="month"
                  name="endDate"
                  value={toInputMonthValue(item.endDate)}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>

            <div className="work-summary-group">
              <label>Work Summary</label>
               <div className="work-summary-actions">
                <button
                  type="button"
                  className="generate-btn"
                  onClick={() => generateWorkSummaryAI(index)}
                  disabled={loadingIndex === index}
                >
                  {loadingIndex === index ? (
                    <>
                      <LoaderCircle className="animate-spin" size={18} /> Generating...
                    </>
                  ) : (
                    <>
                      <Brain size={18} /> Generate from AI
                    </>
                  )}
                </button>
              </div>
              <RichTextEditor
                index={index}
                value={item.workSummery || ''}
                onRichTextEditorChange={(value) =>
                  handleRichTextEditor(value, 'workSummery', index)
                }
              />
             
            </div>
          </div>
        ))}
      </div>

      <div className="experience-controls">
        <button className="add-button" type="button" onClick={addNewExperience}>
          + Add More Experience
        </button>
        {experienceList.length > 1 && (
          <button className="remove-button" type="button" onClick={removeExperience}>
            Remove
          </button>
        )}
        <button
          type="button"
          disabled={loadingIndex !== null}
          onClick={onSave}
          className="save-btn"
        >
          {loadingIndex !== null ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Experience;