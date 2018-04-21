module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    eventName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    image: {
      allowNull: true,
      type: Sequelize.STRING
    },
    startDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
    endDate: {
      allowNull: false,
      type: Sequelize.DATE
    },
    days: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    centerId: {
      allowNull: false,
      onDelete: 'CASCADE',
      type: Sequelize.INTEGER,
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId'
      }
    },
    userId: {
      allowNull: false,
      onDelete: 'CASCADE',
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted', 'cancelled', 'rejected'],
      defaultValue: 'pending'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Events')
};
