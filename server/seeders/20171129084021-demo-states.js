module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('States', [{
      statName: 'ABAKALIKI',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      statName: 'ENUGU',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('States', null, {});
  }
};
