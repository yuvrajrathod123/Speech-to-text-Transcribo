import React from 'react';

const Hero = () => {
    return (
        <main>
            <div className="intro">
                <h1> T R A N S C R I B O </h1>
                <p> A Speech to Text Transcription System </p>
                <button> Get Started </button>
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
                    <button> Book </button>
                </div>
                <img src=" https://images.pexels.com/photos/7511749/pexels-photo-7511749.jpeg?auto=compress&cs=tinysrgb&w=600 " alt="me" />
            </div>
        </main>




    );
};

export default Hero;
