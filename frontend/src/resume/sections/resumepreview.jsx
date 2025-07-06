import React, { useContext } from 'react'
import { ResumeInfoContext } from '../context/ResumeInfoContext'
import PersonalDetail from '../preview/PersonalDetail'
import SummaryPreview from '../preview/SummaryPreview'
import ProfExpPreview from '../preview/ProfExpPreview'
import EducationalPreview from '../preview/EducationalPreview'
import SkillPreview from '../preview/SkillPreview'

function ResumePreview() {

  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    
    <div style={{
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
  height: '100%',
  padding: '1rem', // p-4
  borderTop: '20px solid', // border-r-[20px]
  borderColor:resumeInfo?.themeColor
}}>
      <PersonalDetail resumeInfo={resumeInfo}/>
      <SummaryPreview resumeInfo={resumeInfo}/>
      
      <ProfExpPreview resumeInfo={resumeInfo}/>
      <EducationalPreview resumeInfo={resumeInfo}/>
      <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview