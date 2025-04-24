import { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New client enrollment: John Smith', date: '2025-04-20' },
    { id: 2, message: 'Health program update: Diabetes care program', date: '2025-04-19' },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>

      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-bold">{notification.message}</h3>
              <p className="text-gray-500 text-sm">Date: {notification.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
