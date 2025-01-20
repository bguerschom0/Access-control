// src/pages/Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    deviceIp: '10.150.22.240',
    username: 'admin',
    password: '',
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to localStorage or state management
    localStorage.setItem('hikvisionSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Device IP
            </label>
            <input
              type="text"
              name="deviceIp"
              value={settings.deviceIp}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={settings.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={settings.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
