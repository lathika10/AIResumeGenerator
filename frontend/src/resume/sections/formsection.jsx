import React, { useState } from 'react';
import PersonalDetail from '../forms/PersonalDetail';
import { ArrowLeft, ArrowRight, Layout } from 'lucide-react';
import './FormSection.css'; // Import the CSS file
import Summery from '../forms/Summery';
import Experience from '../forms/Experience';
import Education from '../forms/Education';
import Skills from '../forms/Skills';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext]=useState(false)
  return (
    <div className="form-container">
      <div className="button-group">
        {/* Theme Button */}
        <button className="theme-button">
          <Layout className="icon-left" />
          Theme
        </button>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          {activeFormIndex > 1 && (
            <button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className="nav-button prev"
            >
              <ArrowLeft className="icon-left" />
              Prev
            </button>
          )}
          <button
          disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            className="nav-button next"
          >
            Next
            <ArrowRight className="icon-right" />
          </button>
        </div>
      </div>

      {/* Conditional Form Rendering */}
      {activeFormIndex === 1 ? (
  <PersonalDetail enableNext={(v) => setEnableNext(v)} />
) : activeFormIndex === 2 ? (
  <Summery enableNext={(v) => setEnableNext(v)} />
) : activeFormIndex === 3 ?(
 <Experience enableNext={(v)=> setEnableNext(v)}/>
):activeFormIndex === 4 ?(
 <Education enableNext={(v)=> setEnableNext(v)}/>
):activeFormIndex === 5?(
 <Skills enableNext={(v)=> setEnableNext(v)}/>
):
null}

    </div>
  );
}

export default FormSection;
