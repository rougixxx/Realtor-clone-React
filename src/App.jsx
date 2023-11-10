// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIN'
import SignUp from './pages/SignUp'
import ForgetPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'


function App() {

  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/forget-password" element={<ForgetPassword/>}/>
          <Route path="/offers" element={<Offers/>}/>

        </Routes>
      </Router>
    
    </>
  )
}

export default App
