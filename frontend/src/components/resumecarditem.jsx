import { Notebook } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import './resumecarditem.css';

function ResumeCardItem({ resume }) {
  return (
    <Link to={'/resume/'+resume.documentId+"/edit"} className="resume-link">
    <div className="resume-card">
      <div className="resume-card-inner">
        <div className="icon-container">
          <Notebook />
        </div>
        <p className="resume-title">{resume.title}</p>
      </div>
    </div>
    </Link>
    
  );
}

export default ResumeCardItem;
