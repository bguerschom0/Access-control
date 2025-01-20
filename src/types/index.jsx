// src/types/index.jsx

export interface DeviceInfoType {
  deviceName?: string;
  deviceID?: string;
  model?: string;
  serialNumber?: string;
  macAddress?: string;
  firmwareVersion?: string;
  firmwareReleasedDate?: string;
  deviceType?: string;
  telecontrolID?: number;
}

export interface TimeConfigType {
  timeMode?: string;
  localTime?: string;
  timeZone?: string;
  satelliteInterval?: string;
}

export interface ResponseStatusType {
  requestURL?: string;
  statusCode: number;
  statusString?: string;
  subStatusCode?: string;
}

export interface AuthChallengeType {
  realm: string;
  nonce: string;
  opaque: string;
  qop: string;
}

export interface AuthResponseType {
  username: string;
  realm: string;
  nonce: string;
  uri: string;
  qop: string;
  nc: string;
  cnonce: string;
  response: string;
  opaque: string;
}
