'use strict';

var bcrypt = require('bcrypt');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'segunmatthews@outlook.com',
      username: 'davitron',
      password: bcrypt.hashSync('minerva', 10),
      isAdmin: true,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'voltron@mailinator.com',
      username: 'voltron',
      password: bcrypt.hashSync('minerva', 10),
      isAdmin: false,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('stats', null, {});
  }
};
//# sourceMappingURL=20180115154537-demo-user.js.map