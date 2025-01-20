// src/__tests__/time.test.jsx
import { Time } from '../api/endpoints/time';
import { HikvisionClient } from '../api/client';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('Time Endpoint', () => {
  const server = setupServer();
  let client;
  
  beforeAll(() => {
    server.listen();
    client = new HikvisionClient('10.150.22.240', 'admin', 'Admin@12345');
  });
  
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch time settings successfully', async () => {
    server.use(
      rest.get('*/ISAPI/System/time', (req, res, ctx) => {
        return res(
          ctx.xml(`
            <?xml version="1.0" encoding="UTF-8" ?>
            <Time version="1.0" xmlns="http://www.hikvision.com/ver20/XMLSchema">
              <timeMode>NTP</timeMode>
              <localTime>2025-01-20T10:30:00+00:00</localTime>
              <timeZone>CST-8:00:00</timeZone>
            </Time>
          `)
        );
      })
    );

    const timeInfo = await client.time.getTime();
    expect(timeInfo).toEqual({
      timeMode: 'NTP',
      localTime: '2025-01-20T10:30:00+00:00',
      timeZone: 'CST-8:00:00'
    });
  });

  it('should update time settings successfully', async () => {
    server.use(
      rest.put('*/ISAPI/System/time', (req, res, ctx) => {
        return res(
          ctx.xml(`
            <?xml version="1.0" encoding="UTF-8" ?>
            <ResponseStatus version="1.0">
              <statusCode>1</statusCode>
              <statusString>OK</statusString>
            </ResponseStatus>
          `)
        );
      })
    );

    const response = await client.time.setTime({
      timeMode: 'NTP',
      timeZone: 'CST-8:00:00'
    });

    expect(response.statusCode).toBe(1);
    expect(response.statusString).toBe('OK');
  });
});
