import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import OtpSection from './pages/OtpSection';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './pages/MainLayout';
import NewSplit from './pages/NewSplit/NewSplit';
import ChoosePeoples from './pages/NewSplit/ChoosePeoples';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<OtpSection/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route element={<MainLayout/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/split' element={<NewSplit/>}/>
          <Route path='/choose' element={<ChoosePeoples/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
