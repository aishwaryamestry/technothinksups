
import './App.css';
import ForgotPass from './Components/ForgotPass';
import SignIn from './Components/SignIn';
import SignUpForm from './Components/SignUpForm';
import {Routes,Route} from "react-router-dom";
import VerifyOtp from './Components/VerifyOtp';
import ChangePassword from './Components/ChangePassword';
import MyProfile from './Components/MyProfile';
import Navigation from './Components/Navigation';

function App() {
  return (
    <>
    <Navigation/>
 <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUpForm/>}/>
      <Route path="/forgot-password" element={<ForgotPass/>}/>
      <Route path="/verifyOtp" element={<VerifyOtp/>}/> 
      <Route path="/changepass" element={<ChangePassword/>}/> 
      <Route path="/profile" element={<MyProfile/>}/>     
    </Routes>
    </>
   
  );
}

export default App;
