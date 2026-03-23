import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import OtpSection from './pages/OtpSection';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<OtpSection/>}/>
        
      </Routes>
    </div>
  )
}

export default App
