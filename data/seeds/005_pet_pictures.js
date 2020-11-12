const faker = require('faker');

let i = 1;
const pictures = new Array(20).fill(0).map((_) => {
  if (i == 3) i = 1;
  return {
    user_pets_id: i,
    title: 'dog.png',
    description: 'picture of dog',
    picture: faker.image.animals(),
  };
});
exports.seed = function (knex) {
  return knex('pet_pictures')
    .del()
    .then(function () {
      return knex('pet_pictures').insert(pictures);
    });
};
