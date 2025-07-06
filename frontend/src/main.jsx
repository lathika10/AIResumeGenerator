// src/main.jsx
import './index.css';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './pages/signin.jsx';
import Home from './pages/home.jsx';
import Dashboard from './pages/dashboard.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import EditResume from './resume/[resumeId]/edit/editresume.jsx';
//import { ResumeInfoProvider } from '../src/resume/context/ResumeInfoContext.jsx'// ✅ Import the provider

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/pages/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/resume/:resumeId/edit',
        element: <EditResume />,
      },
    ],
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pages/signin',
    element: <Signin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
       
        <RouterProvider router={router} />
      
    </ClerkProvider>
  </React.StrictMode>
);
