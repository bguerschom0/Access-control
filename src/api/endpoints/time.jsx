// src/api/endpoints/time.jsx

export class Time {
  constructor(client) {
    this.client = client;
  }

  async getTime() {
    const response = await this.client.get('/ISAPI/System/time');
    return this._parseTimeResponse(response);
  }

  async setTime(timeConfig) {
    const xmlData = {
      rootElement: 'Time',
      '@xmlns': 'http://www.hikvision.com/ver20/XMLSchema',
      '@version': '1.0',
      ...timeConfig
    };

    const response = await this.client.put('/ISAPI/System/time', xmlData);
    return this._parseResponseStatus(response);
  }

  _parseTimeResponse(xmlDoc) {
    if (!(xmlDoc instanceof XMLDocument)) {
      return xmlDoc; // Handle JSON response
    }

    const getValue = (tag) => xmlDoc.querySelector(tag)?.textContent;

    return {
      timeMode: getValue('timeMode'),
      localTime: getValue('localTime'),
      timeZone: getValue('timeZone'),
      satelliteInterval: getValue('satelliteInterval')
    };
  }

  _parseResponseStatus(xmlDoc) {
    if (!(xmlDoc instanceof XMLDocument)) {
      return xmlDoc;
    }

    const getValue = (tag) => xmlDoc.querySelector(tag)?.textContent;

    return {
      requestURL: getValue('requestURL'),
      statusCode: parseInt(getValue('statusCode')),
      statusString: getValue('statusString'),
      subStatusCode: getValue('subStatusCode')
    };
  }
}
