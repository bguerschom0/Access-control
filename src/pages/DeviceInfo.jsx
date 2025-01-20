// src/pages/DeviceInfo.jsx
import React from 'react';
import { DeviceTest } from '../examples/DeviceTest';

const DeviceInfo = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Device Information</h1>
      <DeviceTest />
    </div>
  );
};

export default DeviceInfo;
