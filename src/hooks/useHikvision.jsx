// src/hooks/useHikvision.jsx
import { useState, useEffect } from 'react';
import { HikvisionClient } from '../api/client';
import { handleApiError } from '../utils/errorHandling';

export const useHikvision = (host, username, password) => {
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const newClient = new HikvisionClient(host, username, password);
      setClient(newClient);
    } catch (err) {
      setError(handleApiError(err));
    }
  }, [host, username, password]);

  const executeRequest = async (requestFn) => {
    try {
      if (!client) throw new Error('Client not initialized');
      return await requestFn(client);
    } catch (err) {
      throw handleApiError(err);
    }
  };

  return {
    client,
    error,
    executeRequest
  };
};
