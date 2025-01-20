import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">Welcome to Hikvision Device Manager</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-blue-600">Device Status</p>
              <p className="text-2xl font-bold">Online</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-green-600">Last Updated</p>
              <p className="text-2xl font-bold">{new Date().toLocaleTimeString()}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <p className="text-purple-600">API Status</p>
              <p className="text-2xl font-bold">Connected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
