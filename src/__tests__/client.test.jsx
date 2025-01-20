// src/__tests__/client.test.jsx
import { HikvisionClient } from '../api/client';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('HikvisionClient', () => {
  const server = setupServer();
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should handle successful device info request', async () => {
    server.use(
      rest.get('*/ISAPI/System/deviceInfo', (req, res, ctx) => {
        return res(
          ctx.xml(`
            <?xml version="1.0" encoding="UTF-8" ?>
            <DeviceInfo version="1.0" xmlns="http://www.hikvision.com/ver20/XMLSchema">
              <deviceName>Test Device</deviceName>
              <deviceID>test-123</deviceID>
              <model>TEST-MODEL</model>
            </DeviceInfo>
          `)
        );
      })
    );

    const client = new HikvisionClient('localhost', 'user', 'pass');
    const deviceInfo = await client.deviceInfo.getDeviceInfo();

    expect(deviceInfo).toEqual({
      deviceName: 'Test Device',
      deviceID: 'test-123',
      model: 'TEST-MODEL'
    });
  });

  it('should handle auth error', async () => {
    server.use(
      rest.get('*/ISAPI/System/deviceInfo', (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.xml(`
            <?xml version="1.0" encoding="UTF-8" ?>
            <ResponseStatus>
              <statusCode>4</statusCode>
              <statusString>Invalid Credentials</statusString>
            </ResponseStatus>
          `)
        );
      })
    );

    const client = new HikvisionClient('localhost', 'wrong', 'creds');
    await expect(client.deviceInfo.getDeviceInfo()).rejects.toThrow('Invalid Credentials');
  });
});
