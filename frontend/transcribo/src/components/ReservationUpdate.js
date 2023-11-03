import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReservationUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    equipment_needed: [], // Default to an empty array
    refreshments: [], // Default to an empty array
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/reservations/${id}/`)
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reservation details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkboxes (equipment_needed and refreshments)
      const updatedItems = checked
        ? [...reservation[name], value]
        : reservation[name].filter((item) => item !== value);

      setReservation((prevReservation) => ({
        ...prevReservation,
        [name]: updatedItems,
      }));
    } else {
      // Handle other input fields
      setReservation((prevReservation) => ({
        ...prevReservation,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/reservations/${id}/update/`, reservation)
      .then((response) => {
        if (response.status === 200) {
          alert('Reservation updated successfully!');
          navigate(`/detail/${id}`);
        } else {
          alert('Failed to update reservation.');
        }
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
        alert('Failed to update reservation.');
      });
  }

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
          onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
                onChange={handleChange}
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
        {/* Equipment Needed */}
        <div className="mb-3">
          <label className="form-label">Equipment Needed</label>
          {reservation.equipment_needed.map((equipment, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`equipment-${index}`}
                name="equipment_needed"
                value={equipment.id}
                onChange={handleChange}
                checked={reservation.equipment_needed.includes(equipment.id)}
              />
              <label className="form-check-label" htmlFor={`equipment-${index}`}>
                {equipment.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="col-md-6">
         {/* Refreshments */}
         <div className="mb-3">
          <label className="form-label">Refreshments</label>
          {reservation.refreshments.map((refreshment, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`refreshment-${index}`}
                name="refreshments"
                value={refreshment.id}
                onChange={handleChange}
                checked={reservation.refreshments.includes(refreshment.id)}
              />
              <label className="form-check-label" htmlFor={`refreshment-${index}`}>
                {refreshment.name}
              </label>
            </div>
          ))}
        </div>
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
              onChange={handleChange}
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

export default ReservationUpdate;
