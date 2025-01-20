// src/utils/errorHandling.jsx
export class HikvisionError extends Error {
  constructor(message, code, subCode) {
    super(message);
    this.name = 'HikvisionError';
    this.code = code;
    this.subCode = subCode;
  }

  static fromResponse(response) {
    return new HikvisionError(
      response.statusString || 'Unknown error',
      response.statusCode,
      response.subStatusCode
    );
  }

  static fromNetworkError(error) {
    return new HikvisionError(
      `Network error: ${error.message}`,
      'NETWORK_ERROR'
    );
  }
}

export const handleApiError = (error) => {
  if (error instanceof HikvisionError) {
    console.error(`Hikvision API Error: ${error.message} (Code: ${error.code})`);
    return error;
  }
  
  if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
    return HikvisionError.fromNetworkError(error);
  }

  return new HikvisionError('Unknown error occurred', 'UNKNOWN_ERROR');
};
