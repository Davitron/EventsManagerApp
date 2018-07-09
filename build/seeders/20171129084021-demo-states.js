'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('States', [{
      stateName: 'Abia',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Adamawa',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Akwa Ibom',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Anambra',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Bauchi',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Bayelsa',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Benue',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Borno',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Cross River',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Delta',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Ebonyi',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Edo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Ekiti',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Enugu',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'FCT',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Gombe',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Imo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Jigawa',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Kaduna',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Kano',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Katsina',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Kebbi',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Kogi',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Kwara',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Lagos',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Nasarawa',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Niger',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Ogun',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Ondo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Osun',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Oyo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Plateau',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Rivers',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Sokoto',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Taraba',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Yobe',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      stateName: 'Zamfara',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('stats', null, {});
  }
};
//# sourceMappingURL=20171129084021-demo-states.js.map