// src/api/client.jsx

const CONTENT_TYPES = {
  XML: 'application/xml; charset="UTF-8"',
  JSON: 'application/json; charset="UTF-8"'
};

class APIError extends Error {
  constructor(message, statusCode, subStatusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.subStatusCode = subStatusCode;
  }
}

export class HikvisionClient {
  constructor(host, username, password) {
    this.baseURL = `http://${host}`;
    this.auth = { username, password };
  }

  async processResponse(response) {
    const contentType = response.headers.get('Content-Type');
    const responseData = await response.text();

    if (!response.ok) {
      let errorData;
      try {
        if (contentType.includes('application/xml')) {
          // Parse XML error response
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(responseData, 'text/xml');
          errorData = {
            statusCode: Number(xmlDoc.querySelector('statusCode')?.textContent),
            statusString: xmlDoc.querySelector('statusString')?.textContent,
            subStatusCode: xmlDoc.querySelector('subStatusCode')?.textContent
          };
        } else if (contentType.includes('application/json')) {
          errorData = JSON.parse(responseData);
        }
        
        throw new APIError(
          errorData.statusString || 'Unknown error',
          errorData.statusCode,
          errorData.subStatusCode
        );
      } catch (e) {
        throw new APIError('Failed to parse error response', response.status);
      }
    }

    // Handle successful response
    try {
      if (contentType.includes('application/xml')) {
        const parser = new DOMParser();
        return parser.parseFromString(responseData, 'text/xml');
      } else if (contentType.includes('application/json')) {
        return JSON.parse(responseData);
      }
      throw new Error('Unhandled content type');
    } catch (error) {
      throw new Error('Failed to parse response');
    }
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/xml, application/json',
        ...this._getAuthHeaders('GET', endpoint)
      }
    });
    return this.processResponse(response);
  }

  async put(endpoint, data, contentType = CONTENT_TYPES.XML) {
    const body = contentType === CONTENT_TYPES.XML 
      ? this._convertToXML(data)
      : JSON.stringify(data);

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Accept': 'application/xml, application/json',
        ...this._getAuthHeaders('PUT', endpoint)
      },
      body
    });
    return this.processResponse(response);
  }

  _convertToXML(data) {
    // Helper function to convert JSON to XML
    const xmlDoc = document.implementation.createDocument(null, data.rootElement || 'root');
    const convertToXMLNode = (obj, parent) => {
      for (const [key, value] of Object.entries(obj)) {
        if (key === 'rootElement') continue;
        
        const element = xmlDoc.createElement(key);
        if (typeof value === 'object' && value !== null) {
          convertToXMLNode(value, element);
        } else {
          element.textContent = value;
        }
        parent.appendChild(element);
      }
    };
    
    convertToXMLNode(data, xmlDoc.documentElement);
    return new XMLSerializer().serializeToString(xmlDoc);
  }

  _getAuthHeaders(method, endpoint) {
    // This will be implemented in auth.jsx
    // For now, return basic auth
    const credentials = btoa(`${this.auth.username}:${this.auth.password}`);
    return {
      'Authorization': `Basic ${credentials}`
    };
  }
}

export const createClient = (host, username, password) => {
  return new HikvisionClient(host, username, password);
};
