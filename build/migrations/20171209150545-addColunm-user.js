'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'isVerified');
  }
};
//# sourceMappingURL=20171209150545-addColunm-user.js.map