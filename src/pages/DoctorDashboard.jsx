import React from 'react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Client Enrollment Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold">Client Enrollment</h2>
          <p className="mt-2">Enroll new clients into the system.</p>
          <Link to="/client-enroll" className="text-blue-500 mt-4 inline-block">Go to Enrollment</Link>
        </div>

        {/* Health Program Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold">Health Program Management</h2>
          <p className="mt-2">Manage available health programs.</p>
          <Link to="/health-programs" className="text-blue-500 mt-4 inline-block">Manage Programs</Link>
        </div>

        {/* Client List Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold">Client List</h2>
          <p className="mt-2">View and manage existing clients.</p>
          <Link to="/clients" className="text-blue-500 mt-4 inline-block">View Clients</Link>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="mt-2">Check notifications for updates or alerts.</p>
          <Link to="/notifications" className="text-blue-500 mt-4 inline-block">View Notifications</Link>
        </div>

        {/* Profile Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <p className="mt-2">Update your profile information.</p>
          <Link to="/profile-settings" className="text-blue-500 mt-4 inline-block">Go to Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
