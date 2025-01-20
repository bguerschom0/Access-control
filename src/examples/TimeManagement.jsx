// src/examples/TimeManagement.jsx
import React, { useState, useEffect } from 'react';
import { HikvisionClient } from '../api/client';

export const TimeManagement = () => {
  const [timeInfo, setTimeInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTimeZone, setNewTimeZone] = useState('');

  const client = new HikvisionClient('10.150.22.240', 'admin', 'Admin@12345');

  useEffect(() => {
    fetchTimeInfo();
  }, []);

  const fetchTimeInfo = async () => {
    try {
      setLoading(true);
      const time = await client.time.getTime();
      setTimeInfo(time);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeZone = async () => {
    try {
      setLoading(true);
      await client.time.setTime({
        ...timeInfo,
        timeZone: newTimeZone
      });
      await fetchTimeInfo();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading time settings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Time Management</h2>
      {timeInfo && (
        <div className="space-y-4">
          <div>
            <p><strong>Time Mode:</strong> {timeInfo.timeMode}</p>
            <p><strong>Local Time:</strong> {timeInfo.localTime}</p>
            <p><strong>Time Zone:</strong> {timeInfo.timeZone}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Update Time Zone</h3>
            <input
              type="text"
              value={newTimeZone}
              onChange={(e) => setNewTimeZone(e.target.value)}
              className="border p-2 mr-2"
              placeholder="e.g., CST-8:00:00"
            />
            <button
              onClick={updateTimeZone}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
