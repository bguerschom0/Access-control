// src/examples/DeviceMonitor.jsx
import React from 'react';
import { useHikvision } from '../hooks/useHikvision';

export const DeviceMonitor = () => {
  const { client, error, executeRequest } = useHikvision(
    '10.150.22.240',
    'admin',
    ''
  );

  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await executeRequest(client => client.deviceInfo.getDeviceInfo());
        setDeviceInfo(info);
      } catch (err) {
        console.error('Failed to fetch device info:', err);
      }
    };

    if (client) {
      fetchInfo();
    }
  }, [client]);

  if (error) return <div>Error connecting to device: {error.message}</div>;
  if (!deviceInfo) return <div>Loading...</div>;

  return (
    <div>
      <h2>Device Monitor</h2>
      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>
    </div>
  );
};
