import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('access');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Fetch user data from the Djoser me endpoint
        const response = await axios.get('/auth/users/me/', {
          headers: {
            'Authorization': `JWT ${token}`
          }
        });
        
        console.log('User data response:', response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Dashboard card data
  const dashboardCards = [
    {
      title: "Client Enrollment",
      description: "Register and enroll new clients into the system",
      icon: "📝",
      link: "/client-enroll",
      buttonText: "Enroll Clients",
      color: "bg-blue-500"
    },
    {
      title: "Health Program Management",
      description: "Create and manage available health programs",
      icon: "🏥",
      link: "/health-programs",
      buttonText: "Manage Programs",
      color: "bg-green-500"
    },
    {
      title: "Client List",
      description: "View, search and manage your existing clients",
      icon: "👥",
      link: "/clients",
      buttonText: "View Clients",
      color: "bg-indigo-500"
    },
    {
      title: "Notifications",
      description: "Check important updates, alerts and reminders",
      icon: "🔔",
      link: "/notifications",
      buttonText: "View Notifications",
      color: "bg-amber-500"
    },
    {
      title: "Profile Settings",
      description: "Update your profile information and preferences",
      icon: "⚙️",
      link: "/profile-settings",
      buttonText: "Edit Profile",
      color: "bg-purple-500"
    },
    {
      title: "Analytics",
      description: "Review key metrics and performance data",
      icon: "📊",
      link: "/analytics",
      buttonText: "View Analytics",
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-blue-600 text-2xl font-bold">MedPortal</span>
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm text-gray-500">Logged in as</span>
                  <span className="font-medium">{user.username || "Doctor"}</span>
                </div>
                <div className="bg-blue-100 text-blue-800 font-medium rounded-full h-10 w-10 flex items-center justify-center">
                  {user.username ? user.username.charAt(0).toUpperCase() : "D"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="md:flex justify-between items-center">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {user ? (user.first_name || user.username || "Doctor") : "Doctor"}!
              </h1>
              <p className="text-blue-100 max-w-xl">
                Access all your medical practice tools and client information from this dashboard. 
                Have a productive day!
              </p>
            </div>
            <div className="hidden md:block p-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-white mb-1">Today's Overview</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-3 rounded">
                    <div className="text-sm text-blue-100">Appointments</div>
                    <div className="text-xl font-bold text-white">8</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <div className="text-sm text-blue-100">New Messages</div>
                    <div className="text-xl font-bold text-white">3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{card.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
                </div>
                <p className="text-gray-600 mb-6">{card.description}</p>
                <Link 
                  to={card.link} 
                  className={`${card.color} text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity duration-300 inline-flex items-center`}
                >
                  {card.buttonText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap gap-3">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                <span className="mr-2">➕</span> New Appointment
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                <span className="mr-2">📋</span> Create Prescription
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                <span className="mr-2">📊</span> Generate Report
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                <span className="mr-2">💬</span> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-center sm:text-left text-sm text-gray-500">
            © 2025 MedPortal Health Systems. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;