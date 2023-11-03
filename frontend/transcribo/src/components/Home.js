import React from 'react'
import '../css/home.css'
import { Link, useNavigate } from "react-router-dom";

const Home = ({ isAuthenticated}) => {

    const navigate = useNavigate(); // Initialize navigate

    const handleGetStartedClick = (isAuthenticated) => {
      if (isAuthenticated) {
        navigate('/reservation-form'); // Use navigate for redirection
      } else {
        navigate('/login');
      }
    };
    // const handleBookClick = (isAuthenticated) => {
    //   if (isAuthenticated) {
    //     navigate('/reservation-form'); // Use navigate for redirection
    //   } else {
    //     navigate('/login');
    //   }
    // };

  return (
    <div>
      <div>
            <div className="intro">
                <h1> T R A N S C R I B O </h1>
                <p> "Streamline Board Room Management and Automate Transcription" </p>
                <button
                    className=" btn btn-primary"
                    onClick={() => handleGetStartedClick(isAuthenticated)}
                >
                 Get started
                </button>
                
            </div>
            <div className="achievements">
                <div className="work">
                    <i className="fas fa-atom" />
                    <p className="work-heading"> MOM </p>
                    <p className="work-text"> Analyzes the audio of speaker and curates transcription of Minutes of Meeting for the user. </p>
                </div>
                <div className="work">
                    <i className="fas fa-skiing" />
                    <p className="work-heading"> Live Transcription </p>
                    <p className="work-text"> Audio is transcribed live during the meeting and user can see the text on the screen. </p>
                </div>
                <div className="work">
                    <i className="fas fa-ethernet" />
                    <p className="work-heading"> Saves Time </p>
                    <p className="work-text"> Optimizes time management for user and also discards the effort to manually note minutes of meeting. </p>
                </div>
            </div>
            <div className="about-me">
                <div className="about-me-text">
                    <h2>Book a Boardroom</h2>
                    <p>Check availability of boardroom and book it accordingly, filter using date, month and much more.</p>
                    <button onClick={() => handleGetStartedClick(isAuthenticated)}> Book </button>
                </div>
                <div>
                    <img src=" https://images.pexels.com/photos/7511749/pexels-photo-7511749.jpeg?auto=compress&cs=tinysrgb&w=600 " alt="me" />
                </div>
            </div>
        </div>
        <div>
            <footer className="footer">
                <div className="copy">© All rights reserved </div>
                <div className="bottom-links">
                    <div className="links">
                        <span>More Info</span>
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className="links">
                        <span>  </span>
                        <a href="#"><i className="fab fa-facebook" /></a>
                        <a href="#"><i className="fab fa-twitter" /></a>
                        <a href="#"><i className="fab fa-instagram" /></a>
                    </div>
                </div>
            </footer>

        </div>
    </div>
  )
}

export default Home
