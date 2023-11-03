import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';

function ReservationDetail() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    // Fetch reservation details using the id from URL parameter
    axios
      .get(`http://127.0.0.1:8000/api/reservations/${id}/`)
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reservation details:', error);
      });
  }, [id]);

  if (!reservation) {
    // Display loading or error message while fetching data
    return <div>Loading...</div>; // You can customize this part
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Reservation Details</h1>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title"><b>{reservation.meeting_title}</b></h5>
          <p className="card-text">Date: {reservation.date}</p>
          <p className="card-text">Start Time: {reservation.start_time}</p>
          <p className="card-text">End Time: {reservation.end_time}</p>
          <p className="card-text">Name: {reservation.name}</p>
          <p className="card-text">Department: {reservation.department}</p>
          <p className="card-text">Email: {reservation.email}</p>
          <p className="card-text">Phone: {reservation.phone}</p>
          <p className="card-text">Room: {reservation.room_name}</p>
          <p className="card-text">Description: {reservation.description}</p>
          <div>
            <h6 className="card-subtitle mb-2 text-muted">Equipment Needed:</h6>
            <ul className="list-unstyled">
              {reservation.equipment_needed.map(equipment => (
                <li key={equipment.id}>{equipment.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="card-subtitle mb-2 text-muted">Refreshments:</h6>
            <ul className="list-unstyled">
              {reservation.refreshments.map(refreshment => (
                <li key={refreshment.id}>{refreshment.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            {/* Add the "Update" button here */}
            <Link to={`/update/${id}`} className="btn btn-success me-2">
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetail;
