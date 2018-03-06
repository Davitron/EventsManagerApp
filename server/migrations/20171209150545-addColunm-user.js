module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'isVerified',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'isVerified');
  }
};
