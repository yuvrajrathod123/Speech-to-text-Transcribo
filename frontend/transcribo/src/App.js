
import './App.css';
import Navbar from './components/Navbar';
import Meet from './screens/Meet'
import MyBooking from './screens/MyBooking'
import ReservationDetail from './components/ReservationDetail';
import ReservationUpdate from './components/ReservationUpdate';
import ParticipantEmailForm from './components/ParticipantEmailForm';
import { useState } from 'react';
import Home from './components/Home';

import {

  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
  // Link
} from "react-router-dom";
import AvailabilityCheck from './components/AvailabilityCheck';
import Signup from './components/SignUp';
import Login from './components/Login';
import About from './screens/About';
import STT from './screens/STT';
import Profile from './screens/Profile';
import ContactUs from './screens/Contact';
import Profile1 from './screens/Profile1';
import Profile2 from './screens/Profile2';
// import NavbarStart from './components/NavbarStart';




function App() {


    // State to track user authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to toggle authentication status
    const toggleAuthentication = () => {
      setIsAuthenticated(!isAuthenticated);
    };

  return (
    <Router>
            {/* <NavbarStart/> */}
            <Navbar isAuthenticated={isAuthenticated} toggleAuthentication={toggleAuthentication}/>
            <Routes>
                {/* Define routes */}
                <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
                <Route path="/reservation-form" element={<Meet />} />
                <Route path="/mybooking" element={<MyBooking />} />
                <Route path="/detail/:id" element={<ReservationDetail/>} />
                <Route path="/update/:id" element={<ReservationUpdate/>} />
                <Route path="/email" element={<ParticipantEmailForm/>} />
                <Route path="/check" element={<AvailabilityCheck/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login  toggleAuthentication={toggleAuthentication}/>}/>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/conversion/:id" element={<STT />} />
                <Route path="/yuvraj" element={<Profile/>} />
                <Route path="/siddesh" element={<Profile2 />} />
                <Route path="/prasad" element={<Profile1/>} />

                {/* Add more routes as needed */}
            </Routes>
        </Router>
  );
}

export default App;
