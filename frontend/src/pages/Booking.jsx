import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Booking.css';

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/');
            return;
        }
        setUser(JSON.parse(userData));

        if (!location.state || !location.state.trip) {
            navigate('/dashboard');
            return;
        }
        setTrip(location.state.trip);
    }, [location, navigate]);

    if (!user || !trip) return null;

    const renderSeats = (seats, floor) => {
        const rows = Math.ceil(seats / 4);
        const seatElements = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                const seatNum = i * 4 + j + 1;
                if (seatNum > seats) break;

                if (j === 2) {
                    row.push(<div key={`gap-${seatNum}`} className="aisle" />);
                }

                row.push(
                    <div key={`seat-${floor}-${seatNum}`} className="seat">
                        {floor}-{seatNum}
                    </div>
                );
            }
            seatElements.push(
                <div key={`row-${i}`} className="seat-row">
                    {row}
                </div>
            );
        }
        return seatElements;
    };

    const floorCount = trip.seats === 48 ? 2 : 1;
    const seatsPerFloor = trip.seats / floorCount;

    const handleBooking = () => {
        alert('Bạn đã đặt vé thành công!');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <img src={logo} alt="Logo" className="dashboard-logo" />
                <div className="user-info">
                    <span className="username">{user.name}</span>
                    <img
                        src={user.picture}
                        alt="Avatar"
                        className="avatar"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </header>

            <main className="booking-body">
                <h2 className="booking-title">Đặt ghế cho chuyến: {trip.from} → {trip.to}</h2>
                {Array.from({ length: floorCount }, (_, index) => (
                    <div key={`floor-${index + 1}`} className="floor-section">
                        <h3 className="floor-title">Tầng {index + 1}</h3>
                        <div className="seat-map">
                            {renderSeats(seatsPerFloor, index + 1)}
                        </div>
                    </div>
                ))}
                <div className="booking-actions">
                    <button className="book-button" onClick={handleBooking}>Đặt vé</button>
                </div>
            </main>
        </div>
    );
};

export default Booking;
