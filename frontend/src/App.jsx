// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useUser } from '@clerk/clerk-react'
// import Header from './components/header'

// function App() {
//   const [count, setCount] = useState(0)
//   const {user,isLoaded,isSignedIn}=useUser();

//   if(!isSignedIn&&isLoaded)
//   {
//     return <Navigate to={'/pages/signin'}/>
//   }
//   return (
//     <>
//       <Header/>
//       <Outlet/>
//     </>
//   )
// }

// export default App
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../src/toast.css'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/header';
//import { ResumeInfoProvider } from '../src/resume/context/ResumeInfoContext' // ⬅️ Add this line

function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/pages/signin" />;
  }

  return (
    <>
      <Header />
       {/* ✅ Wrap inside here */}
        <Outlet />
     <ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
    </>
  );
}

export default App;
