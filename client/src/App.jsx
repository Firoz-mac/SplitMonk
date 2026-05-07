import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import SignUp from './pages/SignUp'
import OtpSection from './pages/OtpSection';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './pages/MainLayout';
import NewExpenses from './pages/NewExpenses';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import TotalExpList from './pages/TotalExpList';
import { useAppContext } from './context/AppContext';
import Search from './pages/Search';
import ActivityLog from './pages/ActivityLog';
import AddLimit from './pages/AddLimit';
import LandingNew from './pages/LandingNew';
import Split from './pages/Split';
import SplitBox from './pages/SplitBox';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={ <LandingNew/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otp' element={<OtpSection/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route element={<MainLayout/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/split' element={<Split/>}/>
          <Route path='/addExpense' element={<NewExpenses/>}/>
          <Route path='/splitBox' element={<SplitBox/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='/expense-list' element={<TotalExpList/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/log' element={<ActivityLog/>}/>
          <Route path='/add-limit' element={<AddLimit/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
