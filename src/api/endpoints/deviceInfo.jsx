// src/api/endpoints/deviceInfo.jsx

export class DeviceInfo {
  constructor(client) {
    this.client = client;
  }

  async getDeviceInfo() {
    const response = await this.client.get('/ISAPI/System/deviceInfo');
    return this._parseDeviceInfo(response);
  }

  async getCapabilities() {
    const response = await this.client.get('/ISAPI/System/deviceInfo/capabilities');
    return this._parseDeviceInfo(response);
  }

  _parseDeviceInfo(xmlDoc) {
    if (!(xmlDoc instanceof XMLDocument)) {
      return xmlDoc; // Handle JSON response
    }

    const getValue = (tag) => xmlDoc.querySelector(tag)?.textContent;
    
    return {
      deviceName: getValue('deviceName'),
      deviceID: getValue('deviceID'),
      model: getValue('model'),
      serialNumber: getValue('serialNumber'),
      macAddress: getValue('macAddress'),
      firmwareVersion: getValue('firmwareVersion'),
      firmwareReleasedDate: getValue('firmwareReleasedDate'),
      deviceType: getValue('deviceType'),
      telecontrolID: getValue('telecontrolID') ? parseInt(getValue('telecontrolID')) : null,
      // Add other fields as needed
    };
  }
}
