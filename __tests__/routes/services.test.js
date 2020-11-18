const request = require('supertest');
const express = require('express');
const services = require('../../api/profile/servicesModel');
const servicesRouter = require('../../api/profile/servicesRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/profile/servicesModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => {
    req.profile = {
      id: '00ulthapbErVUwVJy4x6',
    };
    next();
  })
);

describe('services router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/services'], servicesRouter);
    jest.clearAllMocks();
  });

  describe('GET /services', () => {
    it('should return 200', async () => {
      services.getServices.mockResolvedValue([]);
      const res = await request(server).get('/services');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(services.getServices.mock.calls.length).toBe(1);
    });
  });

  describe('POST /services', () => {
    it('should return 200 when service is created', async () => {
      const service = {
        id: 9999,
        service: 'test',
      };
      services.findGroomerServicesByServiceId.mockResolvedValue(undefined);
      services.createService.mockResolvedValue(service);

      const res = await request(server).post('/services').send(service);
      expect(res.status).toBe(200);
      expect(services.createService.mock.calls.length).toBe(1);
    });
  });
});
