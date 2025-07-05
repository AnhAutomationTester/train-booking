import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import logo from '../assets/logo.png';
import bus16 from '../assets/bus_16_cho.png';
import bus24 from '../assets/bus_24_cho.png';
import bus48 from '../assets/bus_2_tang.png';

const trips = [
    {
        id: 1,
        seats: 16,
        from: 'Hà Nội',
        to: 'Ninh Bình',
        date: '2025-07-10',
        time: '08:00',
    },
    {
        id: 2,
        seats: 24,
        from: 'Hà Nội',
        to: 'Sapa',
        date: '2025-07-11',
        time: '06:30',
    },
    {
        id: 3,
        seats: 48,
        from: 'Hà Nội',
        to: 'Đà Nẵng',
        date: '2025-07-12',
        time: '19:00',
    },
];

const getBusImage = (seats) => {
    if (seats === 16) return bus16;
    if (seats === 24) return bus24;
    return bus48;
};

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            window.location.href = '/';
            return;
        }
        setUser(JSON.parse(userData));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const handleViewHistory = () => {
        alert('👉 Tính năng xem lịch sử đặt vé đang được phát triển!');
    };

    if (!user) return null;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <img src={logo} alt="Logo" className="dashboard-logo" />
                <div className="user-info">
                    <span className="username">{user.name}</span>
                    <div className="avatar-wrapper" onClick={() => setShowMenu(!showMenu)}>
                        <img
                            src={user.picture}
                            alt="Avatar"
                            className="avatar"
                            referrerPolicy="no-referrer"
                        />
                        {showMenu && (
                            <div className="user-menu">
                                <button onClick={handleViewHistory}>📄 Lịch sử đặt vé</button>
                                <button onClick={handleLogout}>🚪 Đăng xuất</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="trip-list">
                <h2>Danh sách chuyến xe</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Xe</th>
                            <th>Số chỗ</th>
                            <th>Điểm đi</th>
                            <th>Điểm đến</th>
                            <th>Ngày</th>
                            <th>Giờ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip) => (
                            <tr key={trip.id}>
                                <td>
                                    <img
                                        src={getBusImage(trip.seats)}
                                        alt={`Bus ${trip.seats} chỗ`}
                                        className="bus-icon"
                                    />
                                </td>
                                <td>{trip.seats}</td>
                                <td>{trip.from}</td>
                                <td>{trip.to}</td>
                                <td>{trip.date}</td>
                                <td>{trip.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Dashboard;
