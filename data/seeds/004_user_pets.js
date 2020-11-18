const user_pets = [
  {
    name: 'Bella',
    breed: 'German Shepherd',
    pet_type: 'dog',
    user_id: '00ulthapbErVUwVJy4x6',
  },
  {
    name: 'Cooper',
    breed: 'Bulldog',
    pet_type: 'dog',
    user_id: '00ulthapbErVUwVJy4x6',
  },
  {
    name: 'Baily',
    breed: 'Poodle',
    pet_type: 'dog',
    user_id: '00ultwew80Onb2vOT4x6',
  },
  {
    name: 'Charlie',
    breed: 'Beagle',
    pet_type: 'dog',
    user_id: '00ultwew80Onb2vOT4x6',
  },
  {
    name: 'Lily',
    breed: 'Persian Cat',
    pet_type: 'cat',
    user_id: '00ultx74kMUmEW8054x6',
  },
  {
    name: 'Zoe',
    breed: 'Maine Coon',
    pet_type: 'cat',
    user_id: '00ultx74kMUmEW8054x6',
  },
  {
    name: 'Nala',
    breed: 'British Shorthair',
    pet_type: 'cat',
    user_id: '00ultx74kMUmEW8054x6',
  },
];

exports.seed = function (knex) {
  return knex('user_pets')
    .del()
    .then(function () {
      return knex('user_pets').insert(user_pets);
    });
};
