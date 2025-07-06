import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import GlobalApi from '../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import './Summery.css';
import { AIChatSession } from '../../../service/AIModal';

const prompt = "Job title: {jobTitle}, Depends on job title give me list of summary for 3 experience levels, Mid Level and Fresher level in 3-4 lines in array format, With summery and experience_level Field in JSON Format";

function Summery({ enableNext }) {
  const [summery, setSummery] = useState('');
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // Initialize summery from resumeInfo (runs only once on mount)
  useEffect(() => {
    if (resumeInfo?.summery) {
      setSummery(resumeInfo.summery);
    }
  }, []);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    try {
      const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
      const result = await AIChatSession.sendMessage(PROMPT);
      const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        setSummery(text);

        // ✅ Sync to resumeInfo context (for live preview)
        setResumeInfo((prev) => ({
          ...prev,
          summery: text,
        }));

        toast.success("AI summary generated successfully");
      } else {
        toast.error("No valid response from AI");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error("Failed to generate summary from AI");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (!summery.trim()) {
      toast.warning('Please enter a summary');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        data: {
          summery: summery, // Match Strapi's field name
        }
      };

      // Save to backend
      await GlobalApi.updateResumeDetail(params?.resumeId, payload);

      // Update context
      setResumeInfo(prev => ({
        ...prev,
        summery: summery
      }));

      enableNext(true);
      toast.success("Summary saved successfully!");
    } catch (error) {
      let errorMessage = "Failed to save summary";
      if (error.response?.data?.error?.details?.errors) {
        const firstError = error.response.data.error.details.errors[0];
        errorMessage = `Validation error: ${firstError.message}`;
      } else if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-detail-container">
      <h5 className="title">Summary</h5>
      <p className="subtitle">Add Summary for your job title</p>

      <form className="summary-input-container" onSubmit={onSave}>
        <div className="summary-header">
          <button
            type="button"
            className="generate-btn"
            onClick={GenerateSummaryFromAI}
            disabled={loading}
          >
            <Brain className="brain-icon" />
            {loading ? 'Generating...' : 'Generate from AI'}
          </button>
        </div>

        <textarea
          className="summary-textarea"
          value={summery}
          onChange={(e) => {
            const value = e.target.value;
            setSummery(value);

            // ✅ Update the resumeInfo context too
            setResumeInfo((prev) => ({
              ...prev,
              summery: value,
            }));
          }}
          required
          rows={6}
          placeholder="Enter your professional summary"
          disabled={loading}
        />

        <div>
          <button
            type='submit'
            className="save-btn"
            disabled={loading || !summery.trim()}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Summery;
