import React, { useContext, useEffect, useState } from 'react'
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import GlobalApi from '../../../service/GlobalApi';

function Skills() {
  const[skillsList,setSkillsList]=useState([{
    name:'',
    rating:0
}])
const [loading,setLoading]=useState(false);
const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
const handleChange=(index,name,value)=>{
 const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
}
const AddNewSkills=()=>{
setSkillsList([...skillsList,{
   name:'',
    rating:0
}])
}
const RemoveSkills=()=>{
setSkillsList(skillsList=>skillsList.slice(0,-1))
}
 const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.updateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again!')
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
  return (
    <div className="education-container-1">
      <div className="education-header">
        <h5>Skills</h5>
        <p>Add your skills</p>
      </div>
      <div>
        {skillsList.map((item,index)=>(
          <div>
            <div>
              <label>Name</label>
              <input onChange={(e)=>handleChange(index,'name',e.target.value)}/>
            </div>
             <Rating style={{ maxWidth: 120 }} value={item.rating} 
                onChange={(v)=>handleChange(index,'rating',v)}/>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
            <div className='flex gap-2'>
            <button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</button>
            <button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</button>

            </div>
            <button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </button>
          </div>
    </div>
  )
    
}

export default Skills