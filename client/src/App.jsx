import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import OtpSection from './pages/OtpSection';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<OtpSection/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
