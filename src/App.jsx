import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DeviceInfo from './pages/DeviceInfo';
import TimeSettings from './pages/TimeSettings';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/device-info" element={<DeviceInfo />} />
          <Route path="/time-settings" element={<TimeSettings />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
