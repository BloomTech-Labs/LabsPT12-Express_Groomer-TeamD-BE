const services = [
  {
    service: 'Trim',
  },
  {
    service: 'Shave Hair',
  },
  {
    service: 'Shave Pad Hair',
  },
  {
    service: 'Sanitary Trim',
  },
  {
    service: 'Nail Trim',
  },
  {
    service: 'Pluck Ear Hair',
  },
  {
    service: 'Brush Teeth',
  },
  {
    service: 'Bath',
  },
  {
    service: 'Face Trim',
  },
  {
    service: 'Clean Ears',
  },
  {
    service: 'Deep Cleaning Shampoo',
  },
  {
    service: 'Cut & Style',
  },
  {
    service: '15 Minute Brush-Out',
  },
  {
    service: 'Gland Extraction',
  },
];
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('services').insert(services);
    });
};
