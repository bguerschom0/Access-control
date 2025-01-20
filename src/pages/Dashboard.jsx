// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useHikvision } from '../hooks/useHikvision';

const Dashboard = () => {
  const [deviceStatus, setDeviceStatus] = useState(null);
  const { client, error, executeRequest } = useHikvision(
    '10.150.22.240',
    'admin',
    ''
  );

  useEffect(() => {
    const fetchDeviceStatus = async () => {
      try {
        const info = await executeRequest(client => client.deviceInfo.getDeviceInfo());
        setDeviceStatus(info);
      } catch (err) {
        console.error('Failed to fetch device status:', err);
      }
    };

    if (client) {
      fetchDeviceStatus();
    }
  }, [client]);

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      Error connecting to device: {error.message}
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Device Status</h2>
          {deviceStatus ? (
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {deviceStatus.deviceName}</p>
              <p><span className="font-medium">Model:</span> {deviceStatus.model}</p>
              <p><span className="font-medium">Status:</span> 
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </p>
            </div>
          ) : (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
