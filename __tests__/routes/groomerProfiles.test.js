const request = require('supertest');
const express = require('express');
const groomerProfiles = require('../../api/profile/groomerProfileModel');
const groomerProfileRouter = require('../../api/profile/groomerProfileRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/profile/groomerProfileModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => {
    req.profile = {
      id: '00ulthapbErVUwVJy4x6',
    };
    next();
  })
);

describe('groomer profiles router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/groomer_profile', '/groomer_profiles'], groomerProfileRouter);
    jest.clearAllMocks();
  });

  describe('GET /groomer_profile', () => {
    it('should return 200', async () => {
      groomerProfiles.findAllGroomerPros.mockResolvedValue([]);
      const res = await request(server).get('/groomer_profiles');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(groomerProfiles.findAllGroomerPros.mock.calls.length).toBe(1);
    });
  });

  describe('GET /groomer_profile/:profile_id', () => {
    it('should return 200 when profile found', async () => {
      groomerProfiles.findGroomerProByProID.mockResolvedValue({
        id: '01',
        business_name: 'Happy Groomers',
        location_state: 'California',
        location_city: 'San Francisco',
        location_zip: '94112',
        profile_picture: 'jpeg/png',
        document: 'pdf',
        profile_id: 'profile012',
      });
      const res = await request(server).get('/groomer_profiles/01');

      expect(res.status).toBe(200);
      expect(res.body.business_name).toBe('Happy Groomers');
      expect(groomerProfiles.findGroomerProByProID.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      groomerProfiles.findGroomerProByProID.mockResolvedValue();
      const res = await request(server).get('/groomer_profiles/01');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('GroomerProfileNotFound');
    });
  });

  describe('POST /groomer_profile', () => {
    it('should return 200 when profile is created', async () => {
      const groomerProfile = {
        id: 2,
        business_name: 'Less Happy Groomers',
        location_state: 'Texas',
        location_city: 'San Antonio',
        location_zip: '75263',
        profile_picture: 'jpeg/png',
        document: 'pdf',
        profile_id: '00ulthapbErVUwVJy4x6',
      };
      groomerProfiles.findGroomerProByProID.mockResolvedValue(undefined);
      groomerProfiles.createGroomerPro.mockResolvedValue(groomerProfile);

      const res = await request(server)
        .post('/groomer_profile')
        .send(groomerProfile);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('groomer profile created');
      expect(groomerProfiles.createGroomerPro.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /groomer_profile/:profile_id', () => {
    it('should return 200 when profile is updated', async () => {
      const groomerProfile = {
        business_name: 'Happy Groomers',
        location_state: 'California',
        location_city: 'San Francisco',
        location_zip: '94112',
        profile_picture: 'jpeg/png',
        document: 'pdf',
      };
      groomerProfiles.findGroomerProByProID.mockResolvedValue(groomerProfile);
      groomerProfiles.updateGroomerProByProID.mockResolvedValue([
        groomerProfile,
      ]);

      const res = await request(server)
        .put('/groomer_profile/00ulthapbErVUwVJy4x6')
        .send(groomerProfile);
      console.log(res.body);
      expect(res.status).toBe(200);

      // expect(res.body.groomer_profiles.business_name).toBe('Happy Groomers');
      expect(groomerProfiles.updateGroomerProByProID.mock.calls.length).toBe(1);
    });
  });
});


