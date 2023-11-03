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
    equipment_needed: [],
    refreshments: [],
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
      const updatedItems = checked
        ? [...reservation[name], value]
        : reservation[name].filter((item) => item !== value);

      setReservation((prevReservation) => ({
        ...prevReservation,
        [name]: updatedItems,
      }));
    } else {
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
  };

  return (
    <form className="container mt-5" onSubmit={handleSubmit}>
      {/* ... (other fields) */}
      <div className="row">
        <div className="col-md-6">
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
      {/* ... (other fields) */}
      <div className="mb-3">
        <button type="submit" className="btn btn-primary my-4">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReservationUpdate;
