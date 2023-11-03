import React, { Component } from 'react';
import axios from 'axios';

class ParticipantInputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numParticipants: 0,
      participants: [], // Initialize as an empty array
    };
  }

  handleInputChange = (e, index, field) => {
    const updatedParticipants = [...this.state.participants];
    if (!updatedParticipants[index]) {
      updatedParticipants[index] = {}; // Initialize the participant object if it doesn't exist
    }
    updatedParticipants[index][field] = e.target.value;
    this.setState({ participants: updatedParticipants });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data in the expected format (array of participant objects).
      const dataToSend = this.state.participants.map((participant) => ({
        email: participant.email,
        name: participant.name,
        position: participant.position,
      }));

      const response = await axios.post('http://127.0.0.1:8000/api/participants/create/', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        if(this.numParticipants===0){
            alert("No participants")

        }else{

            // Handle a successful response, such as showing a success message or redirecting.
            alert('Participants added successfully!');
        }
      } else {
        // Handle errors, such as displaying an error message.
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that occur during the API request.
    }
  };

  render() {
    const { numParticipants, participants } = this.state;

    // Generate input fields for email, name, and position based on the number of participants.
    const participantInputs = [];
    for (let i = 0; i < numParticipants; i += 2) {
      // Create a row for every two participants
      const rowInputs = [];
      for (let j = i; j < Math.min(i + 2, numParticipants); j++) {
        rowInputs.push(
          <div key={j} className="col-md-6">
            <h3>Participant {j + 1}:</h3>
            <div className="mb-3">
              <label htmlFor={`email-${j}`} className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id={`email-${j}`}
                value={participants[j]?.email || ''}
                onChange={(e) => this.handleInputChange(e, j, 'email')}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`name-${j}`} className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id={`name-${j}`}
                value={participants[j]?.name || ''}
                onChange={(e) => this.handleInputChange(e, j, 'name')}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`position-${j}`} className="form-label">Position:</label>
              <input
                type="text"
                className="form-control"
                id={`position-${j}`}
                value={participants[j]?.position || ''}
                onChange={(e) => this.handleInputChange(e, j, 'position')}
                required
              />
            </div>
          </div>
        );
      }
      participantInputs.push(
        <div key={i} className="row">
          {rowInputs}
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <h2 className="mb-4">Participant Information</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="numParticipants" className="form-label">Number of Participants:</label>
            <input
              type="number"
              min="0"
              className="form-control"
              id="numParticipants"
              value={numParticipants}
              onChange={(e) => this.setState({ numParticipants: parseInt(e.target.value) })}
              required
            />
          </div>
          {participantInputs}
          <button type="submit" className="btn btn-primary">Submit</button>
          
        </form>
          <button type="submit" className="btn btn-primary my-3">Next</button>
      </div>
    );
  }
}

export default ParticipantInputPage;
