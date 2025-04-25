import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/notifications/');
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications. Please try again.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.post('/api/notifications/mark_as_read/', {
        notification_ids: [notificationId]
      });
      
      // Update local state to mark notification as read
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, is_read: true } 
          : notification
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications
        .filter(notification => !notification.is_read)
        .map(notification => notification.id);
      
      if (unreadIds.length === 0) return;
      
      await axios.post('/api/notifications/mark_as_read/', {
        notification_ids: unreadIds
      });
      
      // Update all notifications to read in local state
      setNotifications(notifications.map(notification => ({ 
        ...notification, 
        is_read: true 
      })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.some(n => !n.is_read) && (
          <button 
            onClick={markAllAsRead}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded text-center">
          <p className="text-gray-500">No notifications yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li 
              key={notification.id} 
              className={`p-4 rounded shadow transition ${notification.is_read ? 'bg-gray-100' : 'bg-blue-50 border-l-4 border-blue-500'}`}
            >
              <div className="flex justify-between">
                <h3 className={`text-lg ${notification.is_read ? 'font-normal' : 'font-bold'}`}>
                  {notification.message}
                </h3>
                {!notification.is_read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1">Date: {notification.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;