import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faBuilding,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import '../mybooking.css';

function BookingPage() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    boardRoom: '',
    startDate: '',
    endDate: '',
    department: '',
    month: '', // Add month filter
  });

  useEffect(() => {
    // Make a GET request to fetch reservations from the Django API
    axios
      .get('http://127.0.0.1:8000/api/reservations/')
      .then((response) => {
        setReservations(response.data);
        setFilteredReservations(response.data); // Initially, set filteredReservations to all reservations
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Make a DELETE request to delete the reservation by id
    axios
      .delete(`http://127.0.0.1:8000/api/reservations/${id}/delete/`)
      .then((response) => {
        if (response.status === 204) {
          // Successfully deleted the reservation, remove it from the state
          setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== id)
          );
          setFilteredReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== id)
          );
          alert('Reservation cancelled successfully!');
        } else {
          alert('Failed to delete reservation.');
        }
      })
      .catch((error) => {
        console.error('Error deleting reservation:', error);
        alert('Failed to delete reservation.');
      });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    // Filter reservations based on filter criteria
    const filteredReservations = reservations.filter((reservation) => {
      const { boardRoom, startDate, endDate, department, month } = filterCriteria;

      // Check if each filter criterion matches the reservation data
      const boardRoomMatch =
        boardRoom === '' || reservation.room_name.includes(boardRoom);
      const startDateMatch = startDate === '' || reservation.date >= startDate;
      const endDateMatch = endDate === '' || reservation.date <= endDate;
      const departmentMatch =
        department === '' || reservation.department.includes(department);

      // Extract the month name from the reservation date
      const reservationMonthName = new Date(reservation.date).toLocaleString('en-US', { month: 'long' });

      // Check if the month name filter matches
      const monthMatch = month === '' || reservationMonthName.toLowerCase().includes(month.toLowerCase());

      // Return true if all criteria match
      return boardRoomMatch && startDateMatch && endDateMatch && departmentMatch && monthMatch;
    });

    setFilteredReservations(filteredReservations);
  };

  // Array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Booking Page</h1>

      {/* Filter Form */}
      <form className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <label htmlFor="boardRoom" className="form-label">
              Select Board Room
            </label>
            <select
              id="boardRoom"
              className="form-select"
              value={filterCriteria.boardRoom}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  boardRoom: e.target.value,
                })
              }
            >
              <option value="">Select Board Room</option>
              <option value="Board room1">Board room1</option>
              <option value="Board room2">Board room2</option>
              <option value="Board room3">Board room3</option>
              <option value="Board room4">Board room4</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="month" className="form-label">
              Select Month
            </label>
            <select
              id="month"
              className="form-select"
              value={filterCriteria.month}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  month: e.target.value,
                })
              }
            >
              <option value="">Select Month</option>
              {monthNames.map((monthName) => (
                <option key={monthName} value={monthName}>
                  {monthName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={filterCriteria.startDate}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  startDate: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={filterCriteria.endDate}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  endDate: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <input
              type="text"
              id="department"
              className="form-control"
              placeholder="Department"
              value={filterCriteria.department}
              onChange={(e) =>
                setFilterCriteria({
                  ...filterCriteria,
                  department: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-1 d-flex align-items-end">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleFilter(e)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </form>

      {/* Reservation Cards */}
      <div className="row">
        {/* Render filtered reservations based on filterCriteria */}
        {filteredReservations.map((reservation) => (
          <div className="col-md-4 mb-4" key={reservation.id}>
            <div className="card-container shadow">
              <div className="card">
                <img
                  src="https://www.ceeco.in/img/gallery/boardroom1.jpg"
                  className="card-img-top"
                  alt={reservation.meeting_title}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>{reservation.meeting_title}</b>
                  </h5>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faCalendar} className="me-2" />
                    Date: {reservation.date}
                  </p>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    Start Time: {reservation.start_time}
                  </p>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    End Time: {reservation.end_time}
                  </p>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faBuilding} className="me-2" />
                    Department: {reservation.department}
                  </p>
                  <p className="card-text">
                    <FontAwesomeIcon icon={faBed} className="me-2" />
                    Room: {reservation.room_name}
                  </p>

                  <div className="card-button">
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Cancel
                    </button>
                    <Link
                      to={{
                        pathname: `/detail/${reservation.id}`,
                        state: { reservation },
                      }}
                      className="btn btn-primary"
                    >
                      Details
                    </Link>
                    <Link
                      to={{
                        pathname: `/conversion/${reservation.id}`,
                        state: { reservation },
                      }}
                      className="btn btn-primary ms-2"
                    >
                      start meeting
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingPage;
