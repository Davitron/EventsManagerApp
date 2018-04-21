module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'isVerified',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'isVerified')
};
