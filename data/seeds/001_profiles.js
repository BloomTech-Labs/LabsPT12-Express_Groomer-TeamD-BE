// const faker = require('faker');

const profiles = [
  {
    id: '00ulthapbErVUwVJy4x6',
    email: 'llama001@maildrop.cc',
    first_name: 'Test001',
    last_name: 'User',
    is_groomer: true,
  },
  {
    id: '00ultwew80Onb2vOT4x6',
    email: 'llama002@maildrop.cc',
    first_name: 'Test002',
    last_name: 'User',
    is_groomer: true,
  },
  {
    id: '00ultx74kMUmEW8054x6',
    email: 'llama003@maildrop.cc',
    first_name: 'Test003',
    last_name: 'User',
    is_groomer: true,
  },
  {
    id: '00ultwqjtqt4VCcS24x6',
    email: 'llama004@maildrop.cc',
    first_name: 'Test004',
    last_name: 'User',
    is_groomer: true,
  },
  {
    id: '00ultwz1n9ORpNFc04x6',
    email: 'llama005@maildrop.cc',
    first_name: 'Test005',
    last_name: 'User',
    is_groomer: true,
  },
  {
    id: '00u13omswyZM1xVya4x7',
    email: 'llama006@maildrop.cc',
    first_name: 'Test006',
    last_name: 'User',
    is_groomer: false,
  },
  {
    id: '00u13ol5x1kmKxVJU4x7',
    email: 'llama007@maildrop.cc',
    first_name: 'Test007',
    last_name: 'User',
    is_groomer: false,
  },
  {
    id: '00u13oned0U8XP8Mb4x7',
    email: 'llama001@maildrop.cc',
    first_name: 'Test008',
    last_name: 'User',
    is_groomer: false,
  },
];
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
