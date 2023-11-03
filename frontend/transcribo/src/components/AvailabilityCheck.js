import React, { useState } from 'react';
import axios from 'axios';

function RoomAvailabilityCheck() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  const handleCheckAvailability = async () => {
    try {
      const response = await axios.get('/api/get-available-rooms/', {
        params: {
          date,
          start_time: startTime,
          end_time: endTime,
        },
      });
      setAvailableRooms(response.data.available_rooms);
    } catch (error) {
      console.error('Error checking room availability:', error);
    }
  };

  return (
    <div>
      <h2>Check Room Availability</h2>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button onClick={handleCheckAvailability}>Check Availability</button>
      {availableRooms.length > 0 ? (
        <div>
          <h3>Available Rooms:</h3>
          <ul>
            {availableRooms.map((room) => (
              <li key={room.id}>{room.name}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default RoomAvailabilityCheck;
