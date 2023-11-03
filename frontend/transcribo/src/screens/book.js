import React, { useState, useEffect } from 'react';
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
  const [isRoomBooked, setIsRoomBooked] = useState(false); // Added state to track room booking status

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
      // Check if the room is already booked
      const checkAvailabilityResponse = await axios.get(
        'http://127.0.0.1:8000/api/check-availability/', // Adjust the endpoint URL
        {
          params: {
            date: reservation.date,
            start_time: reservation.start_time,
            end_time: reservation.end_time,
            room_name: reservation.room_name,
          },
        }
      );

      if (checkAvailabilityResponse.status === 200) {
        setIsRoomBooked(checkAvailabilityResponse.data.length > 0);
      } else {
        // Handle error response
        console.error('Unexpected response status:', checkAvailabilityResponse.status);
        console.error('Response data:', checkAvailabilityResponse.data);
      }

      if (!isRoomBooked) {
        // If the room is not booked, proceed with reservation
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
      } else {
        // Display a message that the room is already booked
        alert('The room is already booked for the selected time slot.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create reservation. Please check your network connection.');
    }
  };