import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  // Static data for analytics
  const analyticsData = {
    appointments: 8,
    newMessages: 3,
    enrollments: 5,
  };

  // Static chart data (Client Engagement Overview)
  const engagementData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Client Engagement',
        data: [20, 35, 25, 40, 60, 50, 70],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-blue-600 text-2xl font-bold">MedPortal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Today's Analytics</h1>
            <p className="text-blue-100 max-w-xl">
              Review key metrics for the day including appointments, patient engagement, and more.
            </p>
          </div>
        </div>

        {/* Analytics Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
              <p className="text-gray-600 mb-6">Total appointments today</p>
              <div className="text-2xl font-bold text-blue-500">{analyticsData.appointments}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">New Messages</h2>
              <p className="text-gray-600 mb-6">Unread messages from clients</p>
              <div className="text-2xl font-bold text-green-500">{analyticsData.newMessages}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">Program Enrollments</h2>
              <p className="text-gray-600 mb-6">Clients enrolled in programs today</p>
              <div className="text-2xl font-bold text-yellow-500">{analyticsData.enrollments}</div>
            </div>
          </div>
        </div>

        {/* Client Engagement Chart */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Client Engagement Overview</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-gray-600 mb-4">Client engagement throughout the week. Data reflects user interaction levels.</p>
            <div className="h-64">
              <Line data={engagementData} options={{ responsive: true, maintainAspectRatio: false }} />
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

export default Analytics;
