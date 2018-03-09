const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    email: 'segunmatthews@outlook.com',
    username: 'davitron',
    password: bcrypt.hashSync('minerva', 10),
    isAdmin: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'voltron@mailinator.com',
    username: 'voltron',
    password: bcrypt.hashSync('minerva', 10),
    isAdmin: false,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('stats', null, {})
};
