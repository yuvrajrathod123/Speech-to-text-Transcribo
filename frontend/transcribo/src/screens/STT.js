
import '../SpeechToText.css'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const STT = () => {
  const { id } = useParams(); // Get the reservation ID from the URL parameter
  const [meetingDetails, setMeetingDetails] = useState({});
  const [isListening, setIsListening] = useState(false);

  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    // Fetch the meeting details using the reservation ID
    
    axios
      .get(`http://127.0.0.1:8000/api/reservations/${id}/`)
      .then((response) => {
        setMeetingDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching meeting details:", error);
      });
  }, [id]);

//   const handleSaveTranscription = () => {
//     // Create a string that includes the meeting details and the transcript
//     const metadata = `Meeting Title: ${meetingDetails.meeting_title}\nDate: ${meetingDetails.date}\nStart Time: ${meetingDetails.start_time}\nEnd Time: ${meetingDetails.end_time}\nDepartment: ${meetingDetails.department}\nRoom: ${meetingDetails.room_name}\n\n`;
//     const fullTranscript = metadata + transcript;
  
//     // Save the transcription to a text file
//     const blob = new Blob([fullTranscript], { type: "text/plain" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.style.display = "none";
//     a.href = url;
//     a.download = "transcription.txt";
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };


const handleSaveTranscription = () => {
  const metadata = `Meeting Title: ${meetingDetails.meeting_title}\nDate: ${meetingDetails.date}\nStart Time: ${meetingDetails.start_time}\nEnd Time: ${meetingDetails.end_time}\nDepartment: ${meetingDetails.department}\nRoom: ${meetingDetails.room_name}\n\n`;
  const fullTranscript = transcript;

  axios
    .post(`http://127.0.0.1:8000/api/save_transcript/${meetingDetails.room_name}/`, {
      transcript: fullTranscript,
      meetingDetails: meetingDetails,
      metadata: metadata,
    })
    .then((response) => {
      alert("Transcript saved successfully.");
    })
    .catch((error) => {
      console.error("Error saving transcript:", error);
    });
};

  

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Meeting Details</h2>
      <div className="meeting-details">
        <p><strong>Title:</strong> {meetingDetails.meeting_title}</p>
        <p><strong>Date:</strong> {meetingDetails.date}</p>
        <p><strong>Start Time:</strong> {meetingDetails.start_time}</p>
        <p><strong>End Time:</strong> {meetingDetails.end_time}</p>
        <p><strong>Department:</strong> {meetingDetails.department}</p>
        <p><strong>Room:</strong> {meetingDetails.room_name}</p>
        <p><strong>Agenda:</strong> {meetingDetails.description}</p>
      </div>

      <div className="btn-group d-flex justify-content-center mt-4">
        <button
          className={`custom-btn ${isListening ? "listening" : ""}`}
          onClick={isListening ? handleStopListening : handleStartListening}
        >
          {isListening ? "Pause" : "Start Listening"}
        </button>
        <button className="custom-btn" onClick={handleSaveTranscription}>Save</button>
      </div>
      <div className="main-content mt-4">
        {transcript}
      </div>
    </div>
  );
};

export default STT;

