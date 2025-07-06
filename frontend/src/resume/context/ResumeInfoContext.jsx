import React, { createContext, useState, useCallback } from 'react';

export const ResumeInfoContext = createContext();

export function ResumeInfoProvider({ children }) {
  const [resumeInfo, setResumeInfo] = useState(null);

  // Stable update function that prevents unnecessary updates
  const updateResumeInfo = useCallback((newInfo) => {
    setResumeInfo(prev => {
      // Only update if something actually changed
      const hasChanges = !prev || Object.keys(newInfo).some(
        key => prev[key] !== newInfo[key]
      );
      return hasChanges ? { ...prev, ...newInfo } : prev;
    });
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo: updateResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
}