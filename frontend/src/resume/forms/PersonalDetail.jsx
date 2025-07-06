import { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import './PersonalDetail.css';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Sync initial resumeInfo with formData
  useEffect(() => {
    if (resumeInfo) {
      setFormData(prev => ({
        ...prev,
        ...resumeInfo
      }));
    }
  }, [resumeInfo]);

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setResumeInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
const onSave = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    toast.error('Please fix the form errors before saving');
    return;
  }

  setLoading(true);
  
  try {
    let resumeId = params?.resumeId;
    
    // If no resumeId, try to get existing or create new
    if (!resumeId) {
      try {
        resumeId = await GlobalApi.getResumeIdByUserId(currentUser.id);
      } catch (error) {
        console.log('Resume not found, creating new one...');
        resumeId = await GlobalApi.createNewResume(currentUser.id, formData);
        toast.success('New resume created successfully!');
      }
    }

    // Now update the resume (either existing or newly created)
    const response = await GlobalApi.updateResumeDetail(resumeId, formData);
    
    // Update local state and URL params if this was a new resume
    if (!params?.resumeId) {
      navigate(`/edit-resume/${resumeId}`);
    }
    
    setResumeInfo(prev => ({
      ...prev,
      ...formData
    }));
    
    enableNext(true);
    toast.success('Personal details saved successfully!');
    
  } catch (error) {
    console.error('Update failed:', {
      error: error.response?.data || error.message,
      status: error.response?.status
    });
    
    let errorMessage = 'Failed to save personal details';
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.response?.status === 400) {
      errorMessage = 'Invalid data - check all required fields';
    }
    
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="personal-detail-container">
      <h5 className="title">Personal Detail</h5>
      <p className="subtitle">Get Started with the basic information</p>

      <form onSubmit={onSave} className="form">
        {/* Name Group */}
        <div className="name-group">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={formErrors.firstName ? 'error' : ''}
              required
            />
            {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={formErrors.lastName ? 'error' : ''}
              required
            />
            {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
          </div>
        </div>

        {/* Job Title */}
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className={formErrors.jobTitle ? 'error' : ''}
            required
          />
          {formErrors.jobTitle && <span className="error-message">{formErrors.jobTitle}</span>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={formErrors.address ? 'error' : ''}
            required
          />
          {formErrors.address && <span className="error-message">{formErrors.address}</span>}
        </div>

        {/* Contact Group */}
        <div className="contact-group">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={formErrors.phone ? 'error' : ''}
              required
            />
            {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={formErrors.email ? 'error' : ''}
              required
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
        </div>

        {/* Save Button */}
        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
              
              </>
            ) : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;