// src/examples/DeviceTest.jsx
import React, { useState, useEffect } from 'react';
import { HikvisionClient } from '../api/client';

export const DeviceTest = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const client = new HikvisionClient('10.150.22.240', 'admin', 'Admin@12345');
        const info = await client.deviceInfo.getDeviceInfo();
        setDeviceInfo(info);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceInfo();
  }, []);

  if (loading) return <div>Loading device info...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Device Information</h2>
      {deviceInfo && (
        <div className="space-y-2">
          <p><strong>Device Name:</strong> {deviceInfo.deviceName}</p>
          <p><strong>Model:</strong> {deviceInfo.model}</p>
          <p><strong>Serial Number:</strong> {deviceInfo.serialNumber}</p>
          <p><strong>Firmware Version:</strong> {deviceInfo.firmwareVersion}</p>
          <p><strong>MAC Address:</strong> {deviceInfo.macAddress}</p>
        </div>
      )}
    </div>
  );
};
