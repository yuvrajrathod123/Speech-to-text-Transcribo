import React, { useState } from 'react';
import axios from 'axios';

function ReservationForm() {
    const [equipmentNeeded, setEquipmentNeeded] = useState([]);
    const [refreshments, setRefreshments] = useState([]);
    const [reservation, setReservation] = useState({
      meeting_title: '',
      date: '',
      start_time: '',
      end_time: '',
      name: '',
      department: '',
      email: '',
      phone: '',
      room_name: '',
      description: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setReservation({
        ...reservation,
        [name]: value,
      });
    };

    const handleEquipmentChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setEquipmentNeeded([...equipmentNeeded, value]);
      } else {
        setEquipmentNeeded(equipmentNeeded.filter((item) => item !== value));
      }
    };

    const handleRefreshmentsChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setRefreshments([...refreshments, value]);
      } else {
        setRefreshments(refreshments.filter((item) => item !== value));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/reservations/create/', {
          meeting_title: reservation.meeting_title,
          date: reservation.date,
          start_time: reservation.start_time,
          end_time: reservation.end_time,
          name: reservation.name,
          department: reservation.department,
          email: reservation.email,
          phone: reservation.phone,
          room_name: reservation.room_name,
          description: reservation.description,
          equipment_needed: equipmentNeeded.map(item => ({ name: item })), // Convert to an array of objects
          refreshments: refreshments.map(item => ({ name: item })), // Convert to an array of objects
        });

        if (response.status === 201) {
          // Successfully created reservation, reset the form fields
          setReservation({
            meeting_title: '',
            date: '',
            start_time: '',
            end_time: '', 
            name: '',
            department: '',
            email: '',
            phone: '',
            room_name: '',
            description: '',
          });
          setEquipmentNeeded([]);
          setRefreshments([]);
          // Successfully created reservation, you can redirect or display a success message here.
          alert('Reservation created successfully!');
        } else {
          // Handle error response
          console.error('Unexpected response status:', response.status);
          console.error('Response data:', response.data);
          alert('Failed to create reservation.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`Failed to create reservation. Please check your network connection. ${error}`);
      }
    };


return (



  <form className="container mt-5" onSubmit={handleSubmit}>
      <div className="reservation-info">
        <h2>Reservation Info</h2>
        <div className="mb-3">
          <label htmlFor="meeting_title" className="form-label text-start">Meeting Title</label>
          <input
            type="text"
            className="form-control"
            id="meeting_title"
            name="meeting_title"
            placeholder="Meeting Title"
            value={reservation.meeting_title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={reservation.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="start_time" className="form-label">Start Time</label>
            <input
              type="time"
              className="form-control"
              id="start_time"
              name="start_time"
              value={reservation.start_time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="end_time" className="form-label">End Time</label>
            <input
              type="time"
              className="form-control"
              id="end_time"
              name="end_time"
              value={reservation.end_time}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              value={reservation.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              placeholder="Department"
              value={reservation.department}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={reservation.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label ml-0">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={reservation.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* <p>Meeting Room</p> */}
            <div className="meeting-room">
              <div className="select">
                <label htmlFor="room_name" className="form-label">Select Board Room</label>
                <select
                  className="form-select"
                  id="room_name"
                  name="room_name"
                  value={reservation.room_name}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Board Room</option>
                  <option value="Board room1">Board room1</option>
                  <option value="Board room2">Board room2</option>
                  <option value="Board room3">Board room3</option>
                  <option value="Board room4">Board room4</option>
                </select>
              </div>
            </div>

          </div>
        </div>
       
            


     <br />
      
      <div className="row">
        <div className="col-md-6">
          <h3>Equipment Needed</h3>
          <label>
            <input
              type="checkbox"
              value="Projector"
              checked={equipmentNeeded.includes('Projector')}
              onChange={handleEquipmentChange}
            />
            Projector
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Whiteboard"
              checked={equipmentNeeded.includes('Whiteboard')}
              onChange={handleEquipmentChange}
            />
            Whiteboard
          </label>
          {/* Add more equipment checkboxes here */}
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Additional equipment..."
            id='extra_equipment'
            name='extra_equipment'
            value={equipmentNeeded.extra_equipment}
            onChange={handleEquipmentChange}
          />
        </div>
        
        <div className="col-md-6">
          <h3>Refreshments</h3>
          <label>
            <input
              type="checkbox"
              value="Coffee"
              checked={refreshments.includes('Coffee')}
              onChange={handleRefreshmentsChange}
            />
            Coffee
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Snacks"
              checked={refreshments.includes('Snacks')}
              onChange={handleRefreshmentsChange}
            />
            Snacks
          </label>
          {/* Add more refreshment checkboxes here */}
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Additional refreshments..."
            id="extra_refreshments"
            name="extra_refreshments"
            value={refreshments.extra_refreshments}
            onChange={handleRefreshmentsChange}
          />
        </div>
      </div>
      <div className="row">
            <div className="col-md-6">
              <p className='mt-4'>Meeting Agenda</p>
              <textarea
                rows="4" // You can adjust the number of rows as needed
                className="form-control" // Bootstrap class for styling
                name='description'
                id='description'
                value={reservation.description}
                onChange={handleInputChange}
                placeholder="Enter meeting agenda description here..."
              />
              {/* <div>
                <strong>Meeting Agenda Description:</strong>
                <p>{agendaDescription}</p>
              </div> */}
            </div>
          </div>

      {/* You can display the selected equipment and refreshments here */}
      {/* <div>
        <h3>Selected Equipment</h3>
        <ul>
          {equipmentNeeded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div> */}
      
      {/* <div>
        <h3>Selected Refreshments</h3>
        <ul>
          {refreshments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div> */}



   
      </div>




        <div className="mb-3">
          <button type="submit" className="btn btn-primary my-4">
            Submit
          </button>
        </div>
  
  </form>

  );
}

export default ReservationForm;