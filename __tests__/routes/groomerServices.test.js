const request = require('supertest');
const express = require('express');
const groomerServices = require('../../api/profile/servicesModel');
const groomerServicesRouter = require('../../api/profile/groomerServiceRouter');
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

describe('Groomer Services router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/groomer_services'], groomerServicesRouter);
    jest.clearAllMocks();
  });

  describe('GET /groomer_services', () => {
    it('should return 200', async () => {
      groomerServices.getGroomerServices.mockResolvedValue([]);
      const res = await request(server).get('/groomer_services');

      expect(res.status).toBe(200);
      expect(groomerServices.getGroomerServices.mock.calls.length).toBe(1);
    });
  });

  describe('POST /groomer_services', () => {
    it('should return 200 when service is created', async () => {
      const service = {
        id: 7777,
        groomer_profile_id: '00ulthapbErVUwVJy4x6',
        service_id: 1717,
      };
      groomerServices.findGroomerServicesByServiceId.mockResolvedValue(2);
      groomerServices.createGroomerService.mockResolvedValue(service);

      const res = await request(server).post('/groomer_services').send(service);
      expect(res.status).toBe(200);
      expect(groomerServices.createGroomerService.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /groomer_services', () => {
    it('should return 200 when service is updated', async () => {
      const service = {
        id: 390,
        groomer_profile_id: '00ulthapbErVUwVJy4x6',
        service_id: 171717,
        price: 9999.99,
      };
      groomerServices.findGroomerServicesById.mockResolvedValue(390);
      groomerServices.updateGroomerServiceById.mockResolvedValue(service);

      const res = await request(server)
        .put('/groomer_services/390')
        .send(service);
      expect(res.status).toBe(200);
      expect(groomerServices.createGroomerService.mock.calls.length).toBe(1);
    });
  });
});
